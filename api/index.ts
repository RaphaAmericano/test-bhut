import server from "./src/server";
import { publish } from "./src/publisher"
import { database_connection } from "./src/database"
import RabbitMQServer from "./src/publisher/rabbitmq.server";
const port = process.env.PORT || 3000;
const rbmq_url = process.env.RABBITMQ_URL!
server.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  await database_connection.connect()
  const rbmq = new RabbitMQServer(rbmq_url)
  await rbmq.start()
  console.log(`[server]: Server is connected to RabbitMQ at ${rbmq_url}`);
});