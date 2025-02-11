import server from "./src/server";
import { database_connection } from "./src/database"
import RabbitMQServer from "./src/consumer/rabbitmq.server";

import { consume, rabbitmq_connection } from "./src/consumer";
const port = process.env.PORT || 3000;
const rbmq_url = process.env.RABBITMQ_URL!
server.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  await database_connection.connect()

  try {
    await rabbitmq_connection.connectWithRetry(async () => {
      const rbmq = new RabbitMQServer(rbmq_url)
      await rbmq.start()
      await consume.consumeMessages(rbmq, 'logs-queues')
      
    }, 5, 5000)
  } catch (error) {
    console.error('Erro ao conectar ao RabbitMQ:', error);
    process.exit(1); // Encerra o servidor se não conseguir conectar
  }
  console.log(`[server]: Server is connected to RabbitMQ at ${rbmq_url}`);
});