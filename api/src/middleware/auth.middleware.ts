import { NextFunction, Request, Response } from "express";
import { BhutAuthResponse, getAuthenticationToken } from "../service/api.bhut";

async function authMiddleware(req: Request, res: Response, next: NextFunction){
    const { status, result } = await getAuthenticationToken()
    
    if(status === 200 ) {
        const { accessToken } = result as BhutAuthResponse
        req.headers.authorization = `Bearer ${accessToken}`
        next()
    }
    res.status(status).json({ message: result })
}
export default authMiddleware
