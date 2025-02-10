import server from "./src/server";
import { database_connection } from "./src/database"
import RabbitMQServer from "./src/consumer/rabbitmq.server";

import { consumeMessages } from "./src/consumer/consume";
import { LogsService } from "./src/service";
const port = process.env.PORT || 3000;
const rbmq_url = process.env.RABBITMQ_URL!
server.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  await database_connection.connect()
  const rbmq = new RabbitMQServer(rbmq_url)
  await rbmq.start()
  await consumeMessages(rbmq, 'logs-queues')

  console.log(`[server]: Server is connected to RabbitMQ at ${rbmq_url}`);
});