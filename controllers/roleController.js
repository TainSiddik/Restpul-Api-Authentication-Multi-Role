import Role from "../models/roleModel.js"

// Get all data roles
export const getAllRoles = async (req, res) => {
    try {
        // Find all data role
        const roles = await Role.findAll()
        if (roles.length === 0) {
            return res.status(200).json({ message: "Empty Role" })
        }
        // Get all data roles
        res.status(200).json(roles)
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Get all roles has failed",
            error: error.message
        })
    }
}

// Get one data role
export const getOneRole = async (req, res) => {
    try {
        // Find role by id
        const id = req.params.id
        const role = await Role.findOne({
            where: {
                id: id
            }
        })
        if (!role) return res.status(404).json({ message: "Role not found" })

        // Get data role
        res.status(200).json({
            status: "Success",
            message: "Get one user successfully",
            data: role
        })
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Get all roles has failed",
            error: error.message
        })
    }
}

// Add role
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
            error: error.message
        })
    }
}

// Edit role
export const editRole = async (req, res) => {
    try {
        // Find role by id
        const id = req.params.id;
        const role = await Role.findOne({
            where: {
                id: id
            }
        });

        if (!role) return res.status(404).json({ message: "Role not found" });

        const editRole = req.body.role

        // check, what's the role names has used
        const checkRole = await Role.findOne({
            where: {
                role: editRole
            }
        })
        if (checkRole && checkRole.id !== role.id) {
            return res.status(400).json({
                status: "Failed",
                message: "Role name has been used"
            })
        }

        // Update role
        const edit = await role.update({ role: editRole });
        res.status(200).json({
            status: "success",
            message: "Edit role successfully",
            data: edit
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Edit role failed",
            error: error.message
        });
    }
};


// Delete role
export const deleteRole = async (req, res) => {
    try {
        // Find role by id
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

        // Delete Role
        await role.destroy()
        res.status(200).json({
            status: "Success",
            message: "The role has been deleted",
            role: `${roleName}`
        })
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Delete role has failed",
            error: error.message
        })
    }
}