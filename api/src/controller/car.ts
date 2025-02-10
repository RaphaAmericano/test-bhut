import { Request, Response } from "express";
import { publish } from "../publisher";

async function postCar(req:Request, res: Response): Promise<void>{
    const message = JSON.stringify({
        nome: "Etios",
        marca: "Toyota",
        preco: 49999.99,
        anoFabricacao: 2016
    })
    
    publish.publishMessage('logs-queue', message)
    res.status(200).json({message: 'POST Car'}) 
}

export { postCar }