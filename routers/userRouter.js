import express from "express"
import { getAllUsers, register } from "../controllers/userController.js"

const router = express.Router()

router.post('/register', register)
router.get('/user', getAllUsers)

export default router