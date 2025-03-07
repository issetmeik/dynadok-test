import 'reflect-metadata';
import { setup } from './app';
import { validateClientConsumer } from './infra/messaging/consumers/validate-client.consumer';

console.clear();

async function bootstrap() {
  const app = setup();

  app.listen(process.env.APP_PORT, () => {
    console.log(
      `Server is running on port http://localhost:${process.env.APP_PORT}`
    );
  });

  await validateClientConsumer();
  console.log('🐰 RabbitMQ Consumer started!');
}

bootstrap();
