import server from "./src/server";

import { consumeMessages } from "./src/consumer/consume";
const port = process.env.PORT || 3000;
const rbmq_url = process.env.RABBITMQ_URL
server.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  await consumeMessages('car')
  console.log(`[server]: Server is connected to RabbitMQ at ${rbmq_url}`);
});