import { v4 as uuidv4 } from 'uuid';
import { MessagingConnection } from './connection';
import { MessageEnvelope, PublishOptions } from './types';

/**
 * Publishes messages to RabbitMQ exchanges.
 */
export class MessagePublisher {
  private connection: MessagingConnection;
  private serviceName: string;
  private logger: { info: Function; error: Function };

  constructor(connection: MessagingConnection, serviceName: string, logger?: any) {
    this.connection = connection;
    this.serviceName = serviceName;
    this.logger = logger || console;
  }

  /**
   * Ensure an exchange exists (topic type by default).
   */
  async assertExchange(exchange: string, type: string = 'topic'): Promise<void> {
    const channel = await this.connection.getChannel();
    await channel.assertExchange(exchange, type, { durable: true });
  }

  /**
   * Publish a message to an exchange with a routing key.
   */
  async publish<T>(
    exchange: string,
    routingKey: string,
    payload: T,
    options: PublishOptions = {}
  ): Promise<void> {
    const channel = await this.connection.getChannel();

    const envelope: MessageEnvelope<T> = {
      type: routingKey,
      payload,
      correlationId: options.correlationId || uuidv4(),
      timestamp: new Date().toISOString(),
      source: this.serviceName,
    };

    const buffer = Buffer.from(JSON.stringify(envelope));

    channel.publish(exchange, routingKey, buffer, {
      persistent: options.persistent !== false,
      correlationId: envelope.correlationId,
      replyTo: options.replyTo,
      expiration: options.expiration,
      contentType: 'application/json',
    });

    this.logger.info({ exchange, routingKey, correlationId: envelope.correlationId }, 'Message published');
  }

  /**
   * Send an RPC request and wait for response.
   */
  async rpcRequest<TReq, TRes>(
    queue: string,
    request: TReq,
    timeoutMs: number = 10000
  ): Promise<TRes> {
    const channel = await this.connection.getChannel();
    const correlationId = uuidv4();

    // Create exclusive reply queue
    const { queue: replyQueue } = await channel.assertQueue('', { exclusive: true, autoDelete: true });

    return new Promise<TRes>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`RPC timeout after ${timeoutMs}ms for queue ${queue}`));
      }, timeoutMs);

      channel.consume(replyQueue, (msg: any) => {
        if (!msg) return;
        if (msg.properties.correlationId === correlationId) {
          clearTimeout(timeout);
          channel.ack(msg);
          const response = JSON.parse(msg.content.toString()) as TRes;
          resolve(response);
        }
      });

      const envelope: MessageEnvelope<TReq> = {
        type: 'rpc.request',
        payload: request,
        correlationId,
        timestamp: new Date().toISOString(),
        source: this.serviceName,
      };

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(envelope)), {
        correlationId,
        replyTo: replyQueue,
        contentType: 'application/json',
      });

      this.logger.info({ queue, correlationId }, 'RPC request sent');
    });
  }
}
