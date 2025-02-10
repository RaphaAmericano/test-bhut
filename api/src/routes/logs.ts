import { Router } from "express"
import { logsController } from "../controller"
const router = Router()

router.get("/", logsController.getLogs)

export default router