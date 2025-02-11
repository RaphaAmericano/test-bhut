const mockChannel = {
    assertQueue: jest.fn(),
    sendToQueue: jest.fn(),
    consume: jest.fn((queue, callback) => (
        callback({ content: Buffer.from('Hello, Test RabbiMQ!') })
    )),
    ack: jest.fn(),
    deleteQueue: jest.fn(),
    close: jest.fn()
}

const mockConnection = {
    createChannel: jest.fn(() => Promise.resolve(mockChannel)),
    close: jest.fn()
}

export const connect = jest.fn((url?: string) => Promise.resolve(mockConnection))