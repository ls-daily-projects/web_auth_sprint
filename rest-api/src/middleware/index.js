import jwt from "jsonwebtoken"
import { NotFound, Unauthorized } from "http-errors"

import { jwtSecret } from "../config"

export const handle404 = (req, _res, next) => {
    const { method, path } = req
    const msg = `${method} ${path} has not been implemented.`
    next(NotFound(msg))
}

export const handle500 = ({ status = 500, name, message }, _req, res, next) => {
    if (res.headersSent) return next()
    res.status(status).json({ name, statusCode: status, message })
}

export const protectRoute = (req, res, next) => {
    const authHeader = req.headers.authorization
    const error401 = Unauthorized("Please provide a valid token.")

    if (!authHeader) return next(error401)

    const token = authHeader.split(" ")[1].trim()

    jwt.verify(token, jwtSecret, (err, payload) => {
        if (err || !payload || !payload.userId) return next(error401)

        req.userId = payload.userId
        next()
    })
}
