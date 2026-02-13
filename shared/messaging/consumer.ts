import { MessagingConnection } from './connection';
import { MessageEnvelope, MessageHandler, RpcHandler, ConsumeOptions } from './types';

/**
 * Consumes messages from RabbitMQ queues.
 */
export class MessageConsumer {
  private connection: MessagingConnection;
  private logger: { info: Function; error: Function; warn: Function };

  constructor(connection: MessagingConnection, logger?: any) {
    this.connection = connection;
    this.logger = logger || console;
  }

  /**
   * Assert a queue exists and optionally bind it to an exchange.
   */
  async assertQueue(
    queue: string,
    options?: { exchange?: string; routingKeys?: string[]; durable?: boolean }
  ): Promise<void> {
    const channel = await this.connection.getChannel();
    await channel.assertQueue(queue, { durable: options?.durable !== false });

    if (options?.exchange && options?.routingKeys) {
      for (const key of options.routingKeys) {
        await channel.bindQueue(queue, options.exchange, key);
      }
    }
  }

  /**
   * Subscribe to a queue and process messages.
   */
  async subscribe<T>(
    queue: string,
    handler: MessageHandler<T>,
    options: ConsumeOptions = {}
  ): Promise<void> {
    const channel = await this.connection.getChannel();

    if (options.prefetch) {
      await channel.prefetch(options.prefetch);
    }

    await channel.consume(queue, async (msg: any) => {
      if (!msg) return;

      try {
        const envelope = JSON.parse(msg.content.toString()) as MessageEnvelope<T>;
        await handler(envelope, msg);

        if (!options.noAck) {
          channel.ack(msg);
        }
      } catch (err) {
        this.logger.error({ err, queue }, 'Error processing message');
        if (!options.noAck) {
          // Nack without requeue to avoid infinite loops; message goes to DLQ if configured
          channel.nack(msg, false, false);
        }
      }
    }, { noAck: options.noAck || false });

    this.logger.info({ queue }, 'Subscribed to queue');
  }

  /**
   * Setup an RPC responder on a queue.
   */
  async respondTo<TReq, TRes>(
    queue: string,
    handler: RpcHandler<TReq, TRes>,
    options: { prefetch?: number } = {}
  ): Promise<void> {
    const channel = await this.connection.getChannel();

    await channel.assertQueue(queue, { durable: true });

    if (options.prefetch) {
      await channel.prefetch(options.prefetch);
    }

    await channel.consume(queue, async (msg: any) => {
      if (!msg) return;

      try {
        const envelope = JSON.parse(msg.content.toString()) as MessageEnvelope<TReq>;
        const response = await handler(envelope.payload, envelope);

        if (msg.properties.replyTo) {
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(response)),
            {
              correlationId: msg.properties.correlationId,
              contentType: 'application/json',
            }
          );
        }

        channel.ack(msg);
      } catch (err) {
        this.logger.error({ err, queue }, 'Error handling RPC request');
        channel.nack(msg, false, false);
      }
    });

    this.logger.info({ queue }, 'RPC responder registered');
  }
}
