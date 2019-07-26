import express from "express"
import { json as jsonParser } from "body-parser"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"

import { craPath } from "./config"
import { handle404, handle500 } from "./middleware"
import apiRouter from "./routes"

const app = express()

app.use(helmet())
app.use(jsonParser())
app.use(cors())
app.use(morgan("dev"))

app.use("/api", apiRouter)
app.use(express.static(craPath))
app.get("*", (req, res, next) => {
    if (/^\/api/.test(req.path)) return next()
    res.sendFile(craPath + "/index.html")
})

app.use(handle404)
app.use(handle500)

export default app
