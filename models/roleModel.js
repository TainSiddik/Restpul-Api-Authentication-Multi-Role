import { Sequelize } from "sequelize"
import db from "../config/database/connection.js"

const { DataTypes } = Sequelize

const Role = db.define('role', {
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
})
export default Role