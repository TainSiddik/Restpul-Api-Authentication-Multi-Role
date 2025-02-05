import User from "../models/userModel.js"
import Role from "../models/roleModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import "dotenv/config"
import jwt from "jsonwebtoken"

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
            attributes: ["uuid", "username", "email"]
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

// User register
export const register = async (req, res) => {
    try {
        const username = req.body.username.replace(/[^a-zA-Z0-9' ]/g, "")

        const email = req.body.email
        // check valid format email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid format email" })
        }

        // check duplicate username and email
        const [checkUsername, checkEmail] = await Promise.all([
            User.findOne({ where: { username } }),
            User.findOne({ where: { email } }),
        ]);
        if (checkUsername) {
            return res.status(400).json({ message: "Username already exists" })
        }
        if (checkEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }

        // check password and confirm password
        const password = req.body.password
        const confPassword = req.body.confPassword

        if (password !== confPassword) {
            return res.status(400).json({ message: "Password and Confirm Password not match" })
        }

        // Hash password
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)

        const regist = await User.create({
            username,
            email,
            password: hashPassword,
            role_id: 4
        })
        res.status(201).json({
            status: "Success",
            message: "Register user successfully",
            data: {
                uuid: regist.uuid,
                username: regist.username,
                email: regist.email,
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Internal server error",
            message: "Registration failed"
        });
    }
}