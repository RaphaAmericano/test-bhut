import { Channel, Connection, connect } from "amqplib";

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
    
    async createQueue(queue: string){
        return this.channel?.assertQueue(queue)
    }

   
    async publish(queue:string, message:string){
        return this.channel?.sendToQueue(queue, Buffer.from(message) )
    }

    async publishExchange(exchange:string, routing_key: string, message:string):Promise<boolean> {
        return this.channel!.publish(exchange,routing_key, Buffer.from(message))
    }
}