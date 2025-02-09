import RabbitMQServer from "./rabbitmq.server"
const rbmq_url = process.env.RABBITMQ_URL!
async function publishMessage(queue: string, message: string){
    const server = new RabbitMQServer(rbmq_url)
    await server.start()
    await server.publish(queue, message)
}

async function createPublishQueue(queue: string){
    const server = new RabbitMQServer(rbmq_url)
    await server.start()
    await server.createQueue(queue)
}

async function checkQueueExists(queue: string): Promise<boolean> {
    const server = new RabbitMQServer(rbmq_url)
    await server.start()
    try {
        const exists = await server.checkQueueExists(queue)
        return exists
    } catch (error) {
        console.error(error)
        return false
    } 
    
}


export { publishMessage, createPublishQueue, checkQueueExists }