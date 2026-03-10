import {
  MessagingConnection,
  MessageConsumer,
  EXCHANGES,
  ROUTING_KEYS,
  QUEUES,
  VendorIdentityVerifiedPayload,
} from '@ecommerce/shared';
import prisma from '../config/db';

export async function setupIdentityVerifiedConsumer(
  connection: MessagingConnection,
  logger: any
): Promise<void> {
  const consumer = new MessageConsumer(connection, logger);

  await consumer.assertQueue(QUEUES.AUTH_IDENTITY_VERIFIED, {
    exchange: EXCHANGES.VENDOR_EVENTS,
    routingKeys: [ROUTING_KEYS.IDENTITY_VERIFIED],
    durable: true,
  });

  await consumer.subscribe<VendorIdentityVerifiedPayload>(
    QUEUES.AUTH_IDENTITY_VERIFIED,
    async (envelope) => {
      const { userId } = envelope.payload;

      await prisma.user.update({
        where: { id: userId },
        data: { profileStatus: 'COMPLETE' },
      });

      logger.info({ userId }, 'User profileStatus updated to COMPLETE after identity verification');
    }
  );

  logger.info('Identity verified consumer initialized');
}
