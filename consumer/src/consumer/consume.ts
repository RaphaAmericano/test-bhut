import RabbitMQServer from "./rabbitmq.server"
import { database_connection } from "../database"
import { LogsService } from "../service"
import { logsWebhook } from "../webhook"

async function consumeMessages(server:RabbitMQServer, queue:string){
    await server.consume('logs-queue', async (message) => {
        const to_string_message = message.content.toString()
        const parse_message = JSON.parse(to_string_message)
        await database_connection.connect()
        const result = await LogsService.createLog(parse_message)
        parse_message.data_hora_criacao = new Date(parse_message.data_hora_criacao ).toISOString()
        const webhook = await logsWebhook.sendLogNotification(parse_message)
        console.log("Webhook success: ", webhook.success)
        }
    )
}

export { consumeMessages }


