import { Router } from "express"
import {} from "http-errors"

import { registerUser } from "../controllers"
import {} from "../middleware"

const apiRouter = Router()

apiRouter.post("/register", registerUser)

export default apiRouter
