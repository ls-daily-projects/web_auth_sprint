import { Router } from "express"
import {} from "http-errors"

import { registerUser, loginUser, viewUserJokes } from "../controllers"
import { protectRoute } from "../middleware"

const apiRouter = Router()

apiRouter.post("/register", registerUser)
apiRouter.post("/login", loginUser)
apiRouter.get("/jokes", protectRoute, viewUserJokes)

export default apiRouter
