import express from "express"
import cors from "cors"
import "dotenv/config"
import db from "./config/database/connection.js"
import roleRouter from "./routers/roleRouter.js"
import userRouter from "./routers/userRouter.js"

const app = express()
const port = process.env.APP_PORT

const dbSync = async () => {
    try {
        await db.authenticate()
        console.log("Database connected successfully")
        await db.sync()
    } catch (error) {
        console.log("Database connection has failed", error)
    }
}
dbSync()

app.use(express.json())
app.use(cors())

app.use(roleRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`)
})