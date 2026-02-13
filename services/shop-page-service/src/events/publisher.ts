import {
  MessagingConnection,
  MessagePublisher,
  ProductValidationRequest,
  ProductValidationResponse,
  QUEUES,
} from '@ecommerce/shared';

let publisher: MessagePublisher | null = null;

export function initPublisher(connection: MessagingConnection, serviceName: string, logger: any): void {
  publisher = new MessagePublisher(connection, serviceName, logger);
}

/** Validate product IDs by sending an RPC request to product-service */
export async function validateProducts(productIds: string[]): Promise<ProductValidationResponse> {
  if (!publisher) {
    throw new Error('Publisher not initialized');
  }

  return publisher.rpcRequest<ProductValidationRequest, ProductValidationResponse>(
    QUEUES.PRODUCT_VALIDATE,
    { productIds },
    15000 // 15s timeout
  );
}
