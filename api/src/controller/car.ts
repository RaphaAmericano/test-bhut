import { NextFunction, Request, Response } from "express";
import { getCarro, postCarro } from "../service/api.bhut";

async function postCar(req:Request, res: Response, next: NextFunction): Promise<void> {
    const { headers: { authorization }, body } = req
    const { status, result } = await postCarro(authorization!, body)
    console.log(status)
    console.log("result: ", result)
    if(status ===  200){
        const { id:car_id } = result
        req.body = { ...body, car_id }
        next()
        return
    }
    // publish.publishMessage('logs-queue', message)
    res.status(status).json({message: result }) 
}

async function getCar(req: Request, res: Response): Promise<void> {
    const { headers: { authorization } } = req
    const { status, result } = await getCarro(authorization!)
    
    res.status(status).json({ result })
}

export { postCar, getCar }