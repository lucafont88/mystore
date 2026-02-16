import amqplib from 'amqplib';
import { MessagingConfig } from './types';

const DEFAULT_RECONNECT = {
  maxRetries: 10,
  initialDelayMs: 1000,
  maxDelayMs: 30000,
};

/**
 * Manages a single RabbitMQ connection with auto-reconnect.
 */
export class MessagingConnection {
  private connection: any = null;
  private channel: any = null;
  private config: MessagingConfig;
  private reconnectAttempts = 0;
  private closing = false;
  private logger: { info: Function; error: Function; warn: Function };

  constructor(config: MessagingConfig, logger?: any) {
    this.config = config;
    this.logger = logger || console;
  }

  /** Connect to RabbitMQ and create a channel */
  async connect(): Promise<any> {
    const reconnect = { ...DEFAULT_RECONNECT, ...this.config.reconnect };

    while (this.reconnectAttempts <= reconnect.maxRetries) {
      try {
        this.connection = await amqplib.connect(this.config.url);
        this.channel = await this.connection.createChannel();

        this.connection.on('error', (err: any) => {
          this.logger.error({ err }, 'RabbitMQ connection error');
          if (!this.closing) this.reconnect();
        });

        this.connection.on('close', () => {
          if (!this.closing) {
            this.logger.warn('RabbitMQ connection closed, reconnecting...');
            this.reconnect();
          }
        });

        this.reconnectAttempts = 0;
        this.logger.info('Connected to RabbitMQ');
        return this.channel;
      } catch (err) {
        this.reconnectAttempts++;
        if (this.reconnectAttempts > reconnect.maxRetries) {
          this.logger.error({ err }, `Failed to connect to RabbitMQ after ${reconnect.maxRetries} attempts`);
          throw err;
        }

        const delay = Math.min(
          reconnect.initialDelayMs * Math.pow(2, this.reconnectAttempts - 1),
          reconnect.maxDelayMs
        );
        this.logger.warn(`RabbitMQ connect attempt ${this.reconnectAttempts} failed, retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw new Error('Failed to connect to RabbitMQ');
  }

  /** Get the current channel, connecting if needed */
  async getChannel(): Promise<any> {
    if (this.channel) return this.channel;
    return this.connect();
  }

  /** Get the raw connection */
  getConnection(): any {
    return this.connection;
  }

  private async reconnect(): Promise<void> {
    this.channel = null;
    this.connection = null;
    try {
      await this.connect();
    } catch (err) {
      this.logger.error({ err }, 'Reconnection failed');
    }
  }

  /** Gracefully close connection */
  async close(): Promise<void> {
    this.closing = true;
    try {
      if (this.channel) await this.channel.close();
      if (this.connection) await this.connection.close();
      this.logger.info('RabbitMQ connection closed');
    } catch (err) {
      this.logger.error({ err }, 'Error closing RabbitMQ connection');
    } finally {
      this.channel = null;
      this.connection = null;
    }
  }
}
