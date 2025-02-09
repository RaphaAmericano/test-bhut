import server from "./src/server";
import { publish } from "./src/publisher"
import { database_connection } from "./src/database"
import RabbitMQServer from "./src/publisher/rabbitmq.server";
const port = process.env.PORT || 3000;
const rbmq_url = process.env.RABBITMQ_URL!
server.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  
  // const database = await database_connection.connect()
  const rbmq = new RabbitMQServer(rbmq_url)
  try {
    await rbmq.start()
    const exists_logs_queue = await rbmq.checkQueueExists('logs')
    if(!exists_logs_queue){
      await rbmq.createQueue('logs')
      console.log('Fila criada')
    } else {
      console.log('Fila logs já existe')
    }
  } catch (error) {
    console.log("Error ao lidar com RabbitMQ:", error)
  }

  console.log(`[server]: Server is connected to RabbitMQ at ${rbmq_url}`);
});