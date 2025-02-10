import { Router } from "express"
import { carController } from "../controller"
import { requestMiddleware, publishMiddleware } from "../middleware"

const router = Router()

router.get("/", carController.getCar)
router.post("/",requestMiddleware.validatePostCarRequestMiddleware,  carController.postCar, publishMiddleware.publishCarLogMiddleware)


export default router