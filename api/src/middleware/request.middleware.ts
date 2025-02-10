import { NextFunction, Request, Response } from "express";
import { carValidations, logsValidations } from "../validations"

async function validatePostCarRequestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
    const { body } = req
    const validate = carValidations.validatePostCarRequest(body)
    const { success } = validate
    if(!success) {
        res.status(400).json({ message: validate.error })
        return
    }
    next()
}


async function validateGetCarRequestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { query } = req
  const validate = carValidations.validateGetCarQueryRequest(query)
  const { success, error, data } = validate
  if(!success) {
      res.status(400).json({ message: error })
      return
  }
  req.query = data 
  next()
}

async function validateGetLogsRequestMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { query } = req
    const validate = logsValidations.validateGetLogsQueryRequest(query)
    const { success, error, data } = validate
    if(!success){
        res.status(400).json({ message: error })
        return
    }
    req.query = data    
    next()
  }

export {
    validatePostCarRequestMiddleware,
    validateGetCarRequestMiddleware,
    validateGetLogsRequestMiddleware
};
