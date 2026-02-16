import {
  MessagingConnection,
  MessageConsumer,
  MessageEnvelope,
  ProductDeletedPayload,
  EXCHANGES,
  ROUTING_KEYS,
  QUEUES,
} from '@ecommerce/shared';
import prisma from '../config/db';

let consumer: MessageConsumer | null = null;

export async function setupProductEventConsumer(
  connection: MessagingConnection,
  logger: any
): Promise<void> {
  consumer = new MessageConsumer(connection, logger);

  // Assert queue and bind to product events exchange
  await consumer.assertQueue(QUEUES.SHOP_PAGE_PRODUCT_EVENTS, {
    exchange: EXCHANGES.PRODUCT_EVENTS,
    routingKeys: [
      ROUTING_KEYS.PRODUCT_DELETED,
      ROUTING_KEYS.PRODUCT_UPDATED,
    ],
  });

  // Subscribe to product events
  await consumer.subscribe(QUEUES.SHOP_PAGE_PRODUCT_EVENTS, async (envelope: MessageEnvelope) => {
    switch (envelope.type) {
      case ROUTING_KEYS.PRODUCT_DELETED: {
        const payload = envelope.payload as ProductDeletedPayload;
        logger.info({ productId: payload.id }, 'Product deleted event received, removing from shop pages');

        await prisma.shopPageProduct.deleteMany({
          where: { productId: payload.id },
        });
        break;
      }

      case ROUTING_KEYS.PRODUCT_UPDATED: {
        // Log for visibility; no local cache to update currently
        logger.info({ payload: envelope.payload }, 'Product updated event received');
        break;
      }

      default:
        logger.warn({ type: envelope.type }, 'Unknown event type received');
    }
  });

  logger.info('Product event consumer setup complete');
}
