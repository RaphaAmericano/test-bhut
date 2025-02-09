import { Request, Response } from "express";

async function getLogs(req:Request, res: Response): Promise<void>{
    res.status(200).json({message: 'GET Logs'}) 
}

export { getLogs }