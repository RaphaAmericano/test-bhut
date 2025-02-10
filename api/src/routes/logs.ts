import { Router } from "express"
import { logsController } from "../controller"
import { requestMiddleware } from "../middleware"
const router = Router()

router.get("/", requestMiddleware.validateGetLogsRequestMiddleware, logsController.getLogs)

export default router