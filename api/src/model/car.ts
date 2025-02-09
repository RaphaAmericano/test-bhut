import { Date, Document, Double, Schema, model } from "mongoose";

export interface ICar extends Document {
    id: string
    nome: string
    marca: string
    preco: Double
    anoFabricacao: number
    ativo: boolean
    criadoEm: Date
    atualizadoEm: Date
}

const CarSchema: Schema = new Schema({
    id: { type: String, require: true, unique: true },
    nome: { type: String, require: true },
    marca: { type: String, require: true },
    preco: { type: Number, require: true },
    anoFabricacao: { type: Number, require: true },
    ativo: { type: Boolean, require: true },
    criadoEm: { type: Date, require: true },
    atualizadoEm: { type: Date, require: true }
})

export default model<ICar>("Car", CarSchema)
