import {
  MessagingConnection,
  MessagePublisher,
  EXCHANGES,
  ROUTING_KEYS,
  VendorIdentityVerifiedPayload,
} from '@ecommerce/shared';

let publisher: MessagePublisher | null = null;

export async function initIdentityVerifiedPublisher(
  connection: MessagingConnection,
  logger: any
): Promise<void> {
  publisher = new MessagePublisher(connection, 'user-data-service', logger);
  await publisher.assertExchange(EXCHANGES.VENDOR_EVENTS, 'topic');
  logger.info('Identity verified publisher initialized');
}

export async function publishIdentityVerified(userId: string): Promise<void> {
  if (!publisher) return;
  const payload: VendorIdentityVerifiedPayload = { userId };
  await publisher.publish(EXCHANGES.VENDOR_EVENTS, ROUTING_KEYS.IDENTITY_VERIFIED, payload);
}
