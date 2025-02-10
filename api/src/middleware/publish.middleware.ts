import { NextFunction, Request, Response } from "express";
import { publish } from "../publisher";

async function publishCarLogMiddleware(req:Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const { car_id } = body
    const message = JSON.stringify({ car_id, data_hora_criacao: new Date().getTime() })
    console.log(message)
    publish.publishMessage('logs-queue', message)
    res.status(200).json({ message: body }) 
}

export { 
    publishCarLogMiddleware
}