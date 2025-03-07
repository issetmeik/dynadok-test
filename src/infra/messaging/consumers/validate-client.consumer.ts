import { RabbitMQService } from '../rabbitmq.messaging';
import { validateClient } from '../../../services/client.service';

export async function validateClientConsumer() {
  const rabbitMQ = await RabbitMQService.getInstance();

  await rabbitMQ.consume('validate-client-queue', async (message) => {
    await validateClient(message.clientId);
  });
}
