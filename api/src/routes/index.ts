import { Router } from "express"
import carRouter from "./car"
import logsRouter from "./logs"

const router = Router()
router.get("/", (req, res) => {
    res.status(200).json({ message: true })
})
router.use('/car', carRouter)
router.use('/logs', logsRouter)

export default router