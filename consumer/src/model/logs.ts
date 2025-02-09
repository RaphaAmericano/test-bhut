import { Date, Document, Double, Schema, model } from "mongoose";

export interface ILog extends Document {
    car_id: string
    data_hora_criacao: Date
    data_hora_processamento: Date
}

const LogSchema: Schema = new Schema({
    car_id: { type: String, require: true },
    }, {
        timestamps: { createdAt:'data_hora_criacao', updatedAt: 'data_hora_processamento' }
    }
)

export type LogCreateInput = Pick<ILog, 'car_id'>

export default model<ILog>("Log", LogSchema)