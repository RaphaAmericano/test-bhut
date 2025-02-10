import { Channel, Connection, connect } from "amqplib";

export default class RabbitMQServer {

    private connection: Connection | undefined 
    private channel: Channel | undefined

    constructor(private uri: string ){}

    async start(): Promise<void> {

        
        this.connection = await connect(this.uri)
        this.channel = await this.connection.createChannel()
        // TODO: Ajustar uma retentativa
        console.log("Conectado ao RabbitMQ")

        const queueName = 'logs-queue'
        const queueExists = await this.checkQueueExists(queueName)

        if(!queueExists){
            console.log(`Fila '${queueName}' não encontrada. Criando...`);
            await this.createQueue(queueName)
        } else {
            console.log(`Fila '${queueName}' já existe.`);
        }

    }

    async finish(): Promise<void>{
        this.channel!.close()
        this.connection!.close()
    }

    async checkQueueExists(queue: string): Promise<boolean>{
        if(!this.channel){
            throw new Error('Channel not initialized')
        }
        try {
            await this.channel.checkQueue(queue);
            return true;
        } catch (error: any) {
            if (error.message.includes('NOT_FOUND')) {
                return false; // Fila não encontrada
            } else {
                console.error("Erro ao verificar a fila:", error);
                throw error; // Rejeita outros erros
            }
        }
    }
    
    async createQueue(queue: string){
        if (!this.channel) {
            throw new Error("Canal RabbitMQ não inicializado. Chame start() primeiro.");
        }
        try {
            await this.channel.assertQueue(queue, { durable: false });
            console.log(`Fila '${queue}' criada ou já existente.`);
        } catch (error) {
            console.error("Erro ao criar a fila:", error);
            throw error; // Rejeita o erro para que o chamador possa lidar com ele
        }
    }

   
    async publish(queue:string, message:string){
        if (!this.channel) {
            throw new Error("Canal RabbitMQ não inicializado. Chame start() primeiro.");
        }
        try {
            this.channel.sendToQueue(queue, Buffer.from(message));
            // this.channel.publish('main_exchange', 'routing_key_1', Buffer.from(message));
            return true;
        } catch (error) {
            console.error("Erro ao publicar mensagem:", error);
            return false;
        }
    }

}