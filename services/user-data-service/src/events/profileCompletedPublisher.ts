import {
  MessagingConnection,
  MessagePublisher,
  EXCHANGES,
  ROUTING_KEYS,
  VendorProfileCompletedPayload,
} from '@ecommerce/shared';

let publisher: MessagePublisher | null = null;

export async function initProfileCompletedPublisher(
  connection: MessagingConnection,
  logger: any
): Promise<void> {
  publisher = new MessagePublisher(connection, 'user-data-service', logger);
  await publisher.assertExchange(EXCHANGES.VENDOR_EVENTS, 'topic');
  logger.info('Profile completed publisher initialized');
}

export async function publishProfileCompleted(userId: string): Promise<void> {
  if (!publisher) return;
  const payload: VendorProfileCompletedPayload = { userId };
  await publisher.publish(EXCHANGES.VENDOR_EVENTS, ROUTING_KEYS.PROFILE_COMPLETED, payload);
}
