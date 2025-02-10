import { Router } from "express"
import { authMiddleware } from "../middleware"
import carRouter from "./car"
import logsRouter from "./logs"

const router = Router()
router.get("/", (req, res) => {
    res.status(200).json({ message: "API Online" })
})
router.use('/car', authMiddleware, carRouter)
router.use('/logs', authMiddleware, logsRouter)

export default router