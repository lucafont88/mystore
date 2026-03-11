import {
  MessagingConnection,
  MessageConsumer,
  EXCHANGES,
  ROUTING_KEYS,
  QUEUES,
  UserDeletedPayload,
} from '@ecommerce/shared';
import prisma from '../config/db';

export async function setupUserDeletedConsumer(
  connection: MessagingConnection,
  logger: any
): Promise<void> {
  const consumer = new MessageConsumer(connection, logger);

  await consumer.assertQueue(QUEUES.USER_DATA_USER_DELETED, {
    exchange: EXCHANGES.USER_EVENTS,
    routingKeys: [ROUTING_KEYS.USER_DELETED],
    durable: true,
  });

  await consumer.subscribe<UserDeletedPayload>(
    QUEUES.USER_DATA_USER_DELETED,
    async (envelope) => {
      const { userId } = envelope.payload;

      await prisma.vendorProfile.deleteMany({ where: { userId } });

      logger.info({ userId }, 'VendorProfile deleted after user.deleted event');
    }
  );

  logger.info('User deleted consumer (user-data-service) initialized');
}
