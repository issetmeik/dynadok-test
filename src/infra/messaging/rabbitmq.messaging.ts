import amqp, { Channel, ChannelModel } from 'amqplib';
import { injectable } from 'inversify';

@injectable()
export class RabbitMQService {
  private static instance: RabbitMQService;
  private connection!: ChannelModel;
  private channel!: Channel;
  private readonly url: string;

  constructor() {
    this.url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@rabbitmq:${process.env.RABBITMQ_AMQP_PORT}`;
    console.log('Connecting to RabbitMQ:', this.url);
  }

  static async getInstance(): Promise<RabbitMQService> {
    if (!this.instance) {
      this.instance = new RabbitMQService();
      await this.instance.connect();
    }
    return this.instance;
  }

  private async connect() {
    if (this.connection) return;

    try {
      this.connection = await amqp.connect(this.url);
      this.channel = await this.connection.createChannel();
    } catch (error) {
      console.error('❌ Error connecting to RabbitMQ:', error);
      throw error;
    }
  }

  async sendMessage(queue: string, message: any) {
    try {
      await this.channel.assertQueue(queue, { durable: true });
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
        persistent: true,
      });
      console.log(`📩 Message sent to ${queue}:`, message);
    } catch (error) {
      console.error('❌ Error sending message to RabbitMQ:', error);
    }
  }

  async consume(queue: string, callback: (msg: any) => Promise<void>) {
    try {
      await this.channel.assertQueue(queue, { durable: true });

      console.log(`[*] Waiting for messages in queue ${queue}...`);

      this.channel.consume(queue, async (msg: any) => {
        if (msg) {
          const content = JSON.parse(msg.content.toString());
          console.log('📥 Message received:', content);

          await callback(content);

          this.channel.ack(msg);
          console.log('✅ Message processed and removed from queue.');
        }
      });
    } catch (error) {
      console.error('❌ Error consuming messages from RabbitMQ:', error);
    }
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
    console.log('🔌 Connection to RabbitMQ closed.');
  }
}
