import express from "express"
import { addRole, getAllRoles, getOneRole, editRole, deleteRole } from "../controllers/roleController.js"

const router = express.Router()

router.post('/role', addRole)
router.get('/role', getAllRoles)
router.get('/role/:id', getOneRole)
router.patch('/role/:id', editRole)
router.delete('/role/:id', deleteRole)

export default router