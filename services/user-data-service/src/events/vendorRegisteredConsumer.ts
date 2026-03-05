import {
  MessagingConnection,
  MessageConsumer,
  EXCHANGES,
  ROUTING_KEYS,
  QUEUES,
  VendorRegisteredPayload,
} from '@ecommerce/shared';
import vendorProfileService from '../services/vendorProfile.service';

export async function setupVendorRegisteredConsumer(
  connection: MessagingConnection,
  logger: any
): Promise<void> {
  const consumer = new MessageConsumer(connection, logger);

  await consumer.assertQueue(QUEUES.USER_DATA_VENDOR_REGISTERED, {
    exchange: EXCHANGES.USER_EVENTS,
    routingKeys: [ROUTING_KEYS.VENDOR_REGISTERED],
    durable: true,
  });

  await consumer.subscribe<VendorRegisteredPayload>(
    QUEUES.USER_DATA_VENDOR_REGISTERED,
    async (envelope) => {
      const { userId } = envelope.payload;
      await vendorProfileService.createPendingProfile(userId);
      logger.info({ userId }, 'Pending vendor profile created');
    }
  );

  logger.info('Vendor registered consumer initialized');
}
