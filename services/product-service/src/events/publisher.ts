import {
  MessagingConnection,
  MessagePublisher,
  ProductCreatedPayload,
  ProductUpdatedPayload,
  ProductDeletedPayload,
  EXCHANGES,
  ROUTING_KEYS,
} from '@ecommerce/shared';

let publisher: MessagePublisher | null = null;

export async function initProductPublisher(
  connection: MessagingConnection,
  logger: any
): Promise<void> {
  publisher = new MessagePublisher(connection, 'product-service', logger);
  await publisher.assertExchange(EXCHANGES.PRODUCT_EVENTS, 'topic');
  logger.info('Product event publisher initialized');
}

export async function publishProductCreated(product: any): Promise<void> {
  if (!publisher) return;
  const payload: ProductCreatedPayload = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: Number(product.price),
    vendorId: product.vendorId,
    categoryId: product.categoryId,
    images: product.images || [],
  };
  await publisher.publish(EXCHANGES.PRODUCT_EVENTS, ROUTING_KEYS.PRODUCT_CREATED, payload);
}

export async function publishProductUpdated(product: any): Promise<void> {
  if (!publisher) return;
  const payload: ProductUpdatedPayload = {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    images: product.images || [],
  };
  await publisher.publish(EXCHANGES.PRODUCT_EVENTS, ROUTING_KEYS.PRODUCT_UPDATED, payload);
}

export async function publishProductDeleted(productId: string): Promise<void> {
  if (!publisher) return;
  const payload: ProductDeletedPayload = { id: productId };
  await publisher.publish(EXCHANGES.PRODUCT_EVENTS, ROUTING_KEYS.PRODUCT_DELETED, payload);
}
