import {
  MessagingConnection,
  MessageConsumer,
  ProductValidationRequest,
  ProductValidationResponse,
  QUEUES,
} from '@ecommerce/shared';
import productRepository from '../repositories/product.repository';

export async function setupProductValidationResponder(
  connection: MessagingConnection,
  logger: any
): Promise<void> {
  const consumer = new MessageConsumer(connection, logger);

  await consumer.respondTo<ProductValidationRequest, ProductValidationResponse>(
    QUEUES.PRODUCT_VALIDATE,
    async (request) => {
      const { productIds } = request;
      const products: ProductValidationResponse['products'] = [];
      const invalidIds: string[] = [];

      for (const id of productIds) {
        const product = await productRepository.findById(id);
        if (product) {
          products.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            images: product.images || [],
          });
        } else {
          invalidIds.push(id);
        }
      }

      return {
        valid: invalidIds.length === 0,
        products,
        invalidIds,
      };
    },
    { prefetch: 5 }
  );

  logger.info('Product validation RPC responder registered');
}
