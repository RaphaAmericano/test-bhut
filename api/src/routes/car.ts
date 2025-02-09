import { Router } from "express"
import { carController } from "../controller"

const router = Router()

router.get("/", (req, res) => {
    res.status(200).json({ message: true })
})
router.post("/", carController.postCar)


export default router