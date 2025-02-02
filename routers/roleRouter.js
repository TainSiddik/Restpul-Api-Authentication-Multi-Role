import express from "express"
import { getAllRoles, addRole, deleteRole } from "../controllers/roleController.js"

const router = express.Router()

router.get('/role', getAllRoles)
router.post('/role', addRole)
router.delete('/role/:id', deleteRole)

export default router