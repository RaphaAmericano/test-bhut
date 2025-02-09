import server from "./src/server";
import { publish } from "./src/publisher"
const port = process.env.PORT || 3000;

server.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  const car_queue = await publish.checkQueueExists('car')
  if(!car_queue){
    await publish.createPublishQueue('car')
  } 
});