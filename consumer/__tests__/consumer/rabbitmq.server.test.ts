import RabbitMQServer from "../../src/consumer/rabbitmq.server"
import { connect } from "../../__mocks__/consumer/consumer.mock"

const rabbitmq_url = process.env.RABBITMQ_URL!
jest.mock('amqplib')

describe('Test Rabbit', ()  => {
    let rabbitMQServer: RabbitMQServer

    beforeEach(async () => {
        rabbitMQServer = new RabbitMQServer(rabbitmq_url)
        await rabbitMQServer.start()
        jest.clearAllMocks()
    })

    it.skip('should initialize connection', async () => {
        expect(connect).toHaveBeenCalledWith(rabbitmq_url)
        const mockConnection = await connect(rabbitmq_url)
        expect(mockConnection.createChannel).toHaveBeenCalled()  
    })

})