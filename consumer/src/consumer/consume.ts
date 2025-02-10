import RabbitMQServer from "./rabbitmq.server"
import { database_connection } from "../database"
import { LogsService } from "../service"

async function consumeMessages(server:RabbitMQServer, queue:string){
    await server.consume('logs-queue', async (message) => {
        const parse_message = message.content.toString()
        console.log("parse_message: ",parse_message)
        await database_connection.connect()
        const result = await LogsService.createLog({ car_id: "0e8352d9-467a-4cb8-aabf-cc6436df41ea"})
        console.log("result: ", result)
        }
    )
}

export { consumeMessages }


