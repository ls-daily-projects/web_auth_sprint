import { Unauthorized } from "http-errors"
import jwt from "jsonwebtoken"
import { compare } from "bcrypt"

import { jwtSecret } from "../config"
import { addUser, findUserByUsername, findJokesForUser } from "../model"

export const registerUser = async (req, res, next) => {
    try {
        const addedUser = await addUser(req.body)
        res.json(addedUser)
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    const { username, password } = req.body
    const incorrectCredentialsError = Unauthorized(
        `Username and/or password are incorrect!`
    )
    try {
        const foundUser = await findUserByUsername(username)
        if (!foundUser) throw incorrectCredentialsError

        const isPasswordMatching = await compare(password, foundUser.password)
        if (!isPasswordMatching) throw incorrectCredentialsError

        const payload = { userId: foundUser.id }
        const token = jwt.sign(payload, jwtSecret, { expiresIn: "1d" })
        res.json({ token })
    } catch (error) {
        next(error)
    }
}

export const viewUserJokes = async (req, res, next) => {
    try {
        const jokes = await findJokesForUser(req.userId)
        res.json(jokes)
    } catch (error) {
        next(error)
    }
}
