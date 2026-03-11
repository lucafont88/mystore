import {
  MessagingConnection,
  MessagePublisher,
  EXCHANGES,
  ROUTING_KEYS,
  UserDeletedPayload,
} from '@ecommerce/shared';

let publisher: MessagePublisher | null = null;

export async function initUserDeletedPublisher(
  connection: MessagingConnection,
  logger: any
): Promise<void> {
  publisher = new MessagePublisher(connection, 'auth-service', logger);
  await publisher.assertExchange(EXCHANGES.USER_EVENTS, 'topic');
  logger.info('User deleted publisher initialized');
}

export async function publishUserDeleted(userId: string, role: string): Promise<void> {
  if (!publisher) return;
  const payload: UserDeletedPayload = { userId, role };
  await publisher.publish(EXCHANGES.USER_EVENTS, ROUTING_KEYS.USER_DELETED, payload);
}
