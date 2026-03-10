import { getStripe } from '../config/stripe';
import prisma from '../config/db';
import { publishIdentityVerified } from '../events/identityVerifiedPublisher';

export async function createVerificationSession(userId: string): Promise<string> {
  const stripe = getStripe();

  const flowId = process.env.STRIPE_IDENTITY_FLUX_ID;
  const sessionParams: any = {
    type: 'document',
    options: {
      document: {
        allowed_types: ['driving_license', 'id_card', 'passport'],
        require_id_number: false,
        require_live_capture: true,
        require_matching_selfie: true,
      },
    },
  };

  // Se è configurato un verification flow pre-esistente, lo usiamo
  if (flowId) {
    sessionParams.verification_flow = flowId;
    delete sessionParams.type;
    delete sessionParams.options;
  }

  const session = await stripe.identity.verificationSessions.create(sessionParams);

  await prisma.vendorProfile.update({
    where: { userId },
    data: {
      identityStatus: 'PROCESSING',
      stripeVerificationSessionId: session.id,
    },
  });

  return session.client_secret!;
}

export async function pollVerificationStatus(userId: string, logger: any): Promise<string> {
  const profile = await prisma.vendorProfile.findUnique({ where: { userId } });

  if (!profile?.stripeVerificationSessionId) {
    return profile?.identityStatus ?? 'PENDING';
  }

  // Se già verificato, non serve interrogare Stripe
  if (profile.identityStatus === 'VERIFIED') {
    return 'VERIFIED';
  }

  const stripe = getStripe();
  const session = await stripe.identity.verificationSessions.retrieve(
    profile.stripeVerificationSessionId
  );

  logger.info({ sessionId: session.id, status: session.status }, 'Polled Stripe session status');

  if (session.status === 'verified') {
    await prisma.vendorProfile.update({
      where: { userId },
      data: { identityStatus: 'VERIFIED' },
    });
    await publishIdentityVerified(userId);
    logger.info({ userId }, 'Identity verified via poll — event published');
    return 'VERIFIED';
  }

  if (session.status === 'requires_input') {
    await prisma.vendorProfile.update({
      where: { userId },
      data: { identityStatus: 'FAILED' },
    });
    logger.warn({ userId }, 'Identity verification failed via poll');
    return 'FAILED';
  }

  return profile.identityStatus;
}

export async function handleWebhookEvent(
  rawBody: Buffer,
  signature: string,
  logger: any
): Promise<void> {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: any;

  if (webhookSecret) {
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err: any) {
      logger.error({ err }, 'Stripe webhook signature verification failed');
      throw new Error(`Webhook signature invalid: ${err.message}`);
    }
  } else {
    // Dev mode: nessun secret configurato, parsiamo il body direttamente
    logger.warn('STRIPE_WEBHOOK_SECRET not set — skipping signature verification (dev mode)');
    try {
      event = JSON.parse(rawBody.toString('utf8'));
    } catch (err: any) {
      logger.error({ err }, 'Failed to parse webhook body as JSON');
      throw new Error('Invalid webhook body');
    }
  }

  logger.info({ type: event.type }, 'Stripe webhook received');

  if (event.type === 'identity.verification_session.verified') {
    const session = event.data.object;
    const sessionId: string = session.id;

    const profile = await prisma.vendorProfile.findFirst({
      where: { stripeVerificationSessionId: sessionId },
    });

    if (!profile) {
      logger.warn({ sessionId }, 'No vendor profile found for verification session');
      return;
    }

    await prisma.vendorProfile.update({
      where: { id: profile.id },
      data: { identityStatus: 'VERIFIED' },
    });

    await publishIdentityVerified(profile.userId);
    logger.info({ userId: profile.userId }, 'Identity verified — event published');
  } else if (event.type === 'identity.verification_session.requires_input') {
    const session = event.data.object;
    const sessionId: string = session.id;

    await prisma.vendorProfile.updateMany({
      where: { stripeVerificationSessionId: sessionId },
      data: { identityStatus: 'FAILED' },
    });

    logger.warn({ sessionId }, 'Identity verification failed — status set to FAILED');
  }
}
