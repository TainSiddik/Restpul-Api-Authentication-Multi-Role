import { Sequelize } from "sequelize"
import db from "../config/database/connection.js"
import Role from "./roleModel.js"

const { DataTypes } = Sequelize

const User = db.define('users', {
    uuid: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    refresh_token: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

User.belongsTo(Role, { foreignKey: "role_id", as: "role" })
Role.hasMany(User, { foreignKey: "role_id" })

export default User