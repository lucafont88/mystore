/**
 * Messaging module types for RabbitMQ integration.
 */

/** Configuration for connecting to RabbitMQ */
export interface MessagingConfig {
  url: string;
  /** Reconnection settings */
  reconnect?: {
    maxRetries?: number;       // default: 10
    initialDelayMs?: number;   // default: 1000
    maxDelayMs?: number;       // default: 30000
  };
}

/** Wrapper envelope for all messages */
export interface MessageEnvelope<T = unknown> {
  type: string;
  payload: T;
  correlationId: string;
  timestamp: string;
  source: string;
}

/** Options for publishing a message */
export interface PublishOptions {
  correlationId?: string;
  replyTo?: string;
  expiration?: string;
  persistent?: boolean;
}

/** Options for consuming messages */
export interface ConsumeOptions {
  prefetch?: number;
  noAck?: boolean;
}

/** Handler for incoming messages */
export type MessageHandler<T = unknown> = (
  envelope: MessageEnvelope<T>,
  rawMessage: any
) => Promise<void>;

/** RPC handler that returns a response */
export type RpcHandler<TReq = unknown, TRes = unknown> = (
  request: TReq,
  envelope: MessageEnvelope<TReq>
) => Promise<TRes>;

// ── Product Event Types ──

export interface ProductCreatedPayload {
  id: string;
  name: string;
  slug: string;
  price: number;
  vendorId: string;
  categoryId: string;
  images: string[];
}

export interface ProductUpdatedPayload {
  id: string;
  [key: string]: unknown;
}

export interface ProductDeletedPayload {
  id: string;
}

export interface ProductValidationRequest {
  productIds: string[];
}

export interface ProductValidationResponse {
  valid: boolean;
  products: Array<{
    id: string;
    name: string;
    price: number;
    images: string[];
  }>;
  invalidIds: string[];
}

// ── Constants ──

export const EXCHANGES = {
  PRODUCT_EVENTS: 'product.events',
} as const;

export const ROUTING_KEYS = {
  PRODUCT_CREATED: 'product.created',
  PRODUCT_UPDATED: 'product.updated',
  PRODUCT_DELETED: 'product.deleted',
} as const;

export const QUEUES = {
  SHOP_PAGE_PRODUCT_EVENTS: 'shop-page.product-events',
  PRODUCT_VALIDATE: 'product.validate',
} as const;
