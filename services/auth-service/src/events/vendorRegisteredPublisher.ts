import {
  MessagingConnection,
  MessagePublisher,
  EXCHANGES,
  ROUTING_KEYS,
  VendorRegisteredPayload,
} from '@ecommerce/shared';

let publisher: MessagePublisher | null = null;

export async function initVendorRegisteredPublisher(
  connection: MessagingConnection,
  logger: any
): Promise<void> {
  publisher = new MessagePublisher(connection, 'auth-service', logger);
  await publisher.assertExchange(EXCHANGES.USER_EVENTS, 'topic');
  logger.info('Vendor registered publisher initialized');
}

export async function publishVendorRegistered(
  userId: string,
  email: string
): Promise<void> {
  if (!publisher) return;
  const payload: VendorRegisteredPayload = { userId, email };
  await publisher.publish(EXCHANGES.USER_EVENTS, ROUTING_KEYS.VENDOR_REGISTERED, payload);
}
