import { Router } from "express"
import {} from "http-errors"

import { registerUser, loginUser } from "../controllers"
import {} from "../middleware"

const apiRouter = Router()

apiRouter.post("/register", registerUser)
apiRouter.post("/login", loginUser)

export default apiRouter
