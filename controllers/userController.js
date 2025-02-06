import User from "../models/userModel.js"
import Role from "../models/roleModel.js"

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        // Find all users
        const users = await User.findAll({
            include: {
                model: Role,
                as: 'role',
                attributes: ['role']
            },
            attributes: ["uuid", "username", "email", "status"]
        })
        if (users.length === 0) {
            return res.status(200).json({ message: "no user registered" })
        }
        // Get all users
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Get all users has failed",
            error: error.message
        })
    }
}

// get detail data user
export const getDataUser = async (req, res) => {
    try {
        const uuid = req.params.uuid
        const user = await User.findOne({
            where: {
                uuid: uuid
            },
            include: {
                model: Role,
                as: 'role',
                attributes: ['role']
            },
            attributes: ["uuid", "username", "email"]
        })
        if (!user) return res.status(404).json({ message: "user not found" })
        res.status(200).json({
            status: "Success",
            message: "Get detail user successfully",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Get detail user has failed",
            error: error.message
        })
    }
}

// Edit User access
export const editUserAccess = async (req, res) => {
    try {
        const uuid = req.params.uuid
        const user = await User.findOne({
            where: {
                uuid: uuid
            },
        })
        if (!user) return res.status(404).json({ message: "user not found" })
        const status = req.body.status
        const role = req.body.role
        const username = user.username
        await user.update({ status: status, role_id: role })
        res.status(200).json({
            status: "Success",
            message: `${username} access has changed`,
        })
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Change user role has failed",
            error: error.message
        })
    }
}