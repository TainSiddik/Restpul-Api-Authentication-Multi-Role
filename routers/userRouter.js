import express from "express"
import { getAllUsers, getDataUser, editUser } from "../controllers/userController.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get('/user', verifyToken, getAllUsers)
router.get('/user/:uuid', verifyToken, getDataUser)
router.post('/user/:uuid', verifyToken, editUser)

export default router