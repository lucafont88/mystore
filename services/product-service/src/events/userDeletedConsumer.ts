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

  await consumer.assertQueue(QUEUES.PRODUCT_USER_DELETED, {
    exchange: EXCHANGES.USER_EVENTS,
    routingKeys: [ROUTING_KEYS.USER_DELETED],
    durable: true,
  });

  await consumer.subscribe<UserDeletedPayload>(
    QUEUES.PRODUCT_USER_DELETED,
    async (envelope) => {
      const { userId } = envelope.payload;

      // Cancella prodotti fisici, digitali e bundle del vendor
      const deleted = await prisma.product.deleteMany({ where: { vendorId: userId } });

      logger.info({ userId, count: deleted.count }, 'Products deleted after user.deleted event');
    }
  );

  logger.info('User deleted consumer (product-service) initialized');
}
