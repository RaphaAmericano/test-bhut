import { connect } from "../../__mocks__/publisher/publisher.mock";
import RabbitMQServer from "../../src/publisher/rabbitmq.server";


jest.mock('amqplib')

describe('RabbitMQServer - publish', () => {
    let rabbitMQServer: RabbitMQServer
    const rabbitmq_url = process.env.RABBITMQ_URL!
    const queue_name = 'logs-queue'
    const test_message = 'test message'

    beforeEach(async () => {
      rabbitMQServer = new RabbitMQServer(rabbitmq_url)  
      await rabbitMQServer.start()
      jest.clearAllMocks()
    })

    it.skip('should publish a message to the queue', async () => {
        await rabbitMQServer.publish(queue_name, test_message)
        const mockChannel = await (await connect()).createChannel()
        expect(mockChannel.assertQueue).toHaveBeenCalledWith(queue_name, { durable: false })

        expect(mockChannel.sendToQueue).toHaveBeenCalledWith(
            queue_name,
            Buffer.from(test_message)
        )

    })


})