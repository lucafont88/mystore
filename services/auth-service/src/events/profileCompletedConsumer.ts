import {
  MessagingConnection,
  MessageConsumer,
  EXCHANGES,
  ROUTING_KEYS,
  QUEUES,
  VendorProfileCompletedPayload,
} from '@ecommerce/shared';
import prisma from '../config/db';

export async function setupProfileCompletedConsumer(
  connection: MessagingConnection,
  logger: any
): Promise<void> {
  const consumer = new MessageConsumer(connection, logger);

  await consumer.assertQueue(QUEUES.AUTH_PROFILE_COMPLETED, {
    exchange: EXCHANGES.VENDOR_EVENTS,
    routingKeys: [ROUTING_KEYS.PROFILE_COMPLETED],
    durable: true,
  });

  await consumer.subscribe<VendorProfileCompletedPayload>(
    QUEUES.AUTH_PROFILE_COMPLETED,
    async (envelope) => {
      const { userId } = envelope.payload;

      await prisma.user.update({
        where: { id: userId },
        data: { profileStatus: 'COMPLETE' },
      });

      logger.info({ userId }, 'User profileStatus updated to COMPLETE');
    }
  );

  logger.info('Profile completed consumer initialized');
}
