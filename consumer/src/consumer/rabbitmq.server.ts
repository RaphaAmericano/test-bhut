import { Channel, Connection, Message, connect } from "amqplib";

export default class RabbitMQServer {

    private connection: Connection | undefined 
    private channel: Channel | undefined

    constructor(private uri: string ){}

    async start(): Promise<void> {
        this.connection = await connect(this.uri)
        this.channel = await this.connection.createChannel()
    }

    async finish(): Promise<void>{
        this.channel!.close()
        this.connection!.close()
    }

    async checkQueueExists(queue: string): Promise<boolean>{
        try {
            const connection = await connect(this.uri);
            const channel = await connection.createChannel();
            
            await channel.checkQueue(queue);
            
            await channel.close();
            await connection.close();
            return true;
        } catch (error: any) {
            if (error.code === 404) {
                console.log(`Fila '${queue}' não existe.`);
                return false;
            }
            console.error("Erro inesperado:", error);
            return false;
        }
    }
      
    

    async consume(queue: string, callback: (message: Message) => void ){
        return this.channel?.consume(queue, (message) => {
            callback(message!);
            this.channel?.ack(message!)
        })
    }
}