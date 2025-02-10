import { NextFunction, Request, Response } from "express";
import { carValidations } from "../validations"

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

export {
    validatePostCarRequestMiddleware
};
