import RabbitMQServer from "./rabbitmq.server"

async function consumeMessages(queue:string){

    const server = new RabbitMQServer(process.env.RABBITMQ_URL!)
    await server.start()
    const queueExists = await server.checkQueueExists(queue)
    console.log(queueExists)
    if(queueExists){
        await server.consume('car', (message) => console.log(message.content.toString()))
    } 
    throw new Error(`Queue ${queue} does not exists`)
}

export { consumeMessages }


