import { Request, Response } from "express";
import { LogsService } from "../service";
import { PromiseHandler } from "../utils/promise.handler";
async function getLogs(req:Request, res: Response): Promise<void> {
    const promise =  LogsService.getLogs()
    const { data, error } = await PromiseHandler.wrapPromise(promise)
    if(error){
        res.status(500).json({message: 'Error'})
        return
    }
    res.status(200).json({ result: data }) 
}

export { getLogs }