import express from "express"
import { register, login, refreshToken, me, logout } from "../controllers/authController.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/token', verifyToken, refreshToken)
router.get('/me', verifyToken, me)
router.delete('/logout', verifyToken, logout)

export default router