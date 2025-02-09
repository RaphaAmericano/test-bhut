import RabbitMQServer from "./rabbitmq.server"

async function publishMessage(queue: string, message: string){
    const server = new RabbitMQServer('amqp://admin:admin@rabbitmq:5672')
    await server.start()
    await server.publish(queue, message)
}

async function createPublishQueue(queue: string){
    const server = new RabbitMQServer('amqp://admin:admin@rabbitmq:5672')
    await server.start()
    await server.createQueue(queue)
    await server.finish()
}

async function checkQueueExists(queue: string): Promise<boolean> {
    const server = new RabbitMQServer('amqp://admin:admin@rabbitmq:5672')
    await server.start()
    try {
        const exists = await server.checkQueueExists(queue)
        return exists
    } catch (error) {
        console.error(error)
        return false
    } finally{
        await server.finish()
    }
    
}


export { publishMessage, createPublishQueue, checkQueueExists }