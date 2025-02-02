import Role from "../models/roleModel.js"

export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll()
        if (roles.length === 0) {
            return res.status(200).json({ message: "Empty Role" })
        }
        res.status(200).json(roles)
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Get all roles has failed",
            error: error.message
        })
    }
}

export const addRole = async (req, res) => {
    try {
        const role = req.body.role
        if (!role) {
            return res.status(400).json({ message: "Role has required" })
        }
        const add = await Role.create({
            role: role
        })
        res.status(201).json({
            status: "Success",
            message: "Role has been added",
            data: add
        })
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Add role has failed",
            data: add
        })
    }
}

export const deleteRole = async (req, res) => {
    try {
        const id = req.params.id
        const role = await Role.findOne({
            where: {
                id: id
            }
        })
        if (!role) {
            return res.status(404).json({ message: "Role not found" })
        }

        const roleName = role.role
        await role.destroy()
        res.status(200).json({
            status: "Success",
            message: "The role has been deleted",
            role: `${roleName}`
        })
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Delete role has failed"
        })
    }
}