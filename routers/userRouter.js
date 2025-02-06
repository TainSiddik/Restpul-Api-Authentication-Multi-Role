import express from "express"
import { getAllUsers, getDataUser, editUserAccess } from "../controllers/userController.js"
import { verifyToken } from "../middleware/verifyToken.js"
import { verifyRole } from "../middleware/verifyRole.js"

const router = express.Router()

router.get('/user', verifyToken, verifyRole([1, 2]), getAllUsers)
router.get('/user/:uuid', verifyToken, verifyRole([1]), getDataUser)
router.patch('/user/:uuid', verifyToken, verifyRole([1]), editUserAccess)

export default router