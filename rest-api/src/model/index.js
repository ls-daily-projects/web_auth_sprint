import { hash } from "bcrypt"

import db from "../data"

const addUser = async ({ username, password }) => {
    if (!username || !password)
        throw Error(`A username and password are required!`)

    const hashedPassword = await hash(password, 10)

    const [id] = await db("users").insert({
        username,
        password: hashedPassword
    })

    return db("users")
        .where("id", id)
        .column("username")
        .first()
}

const findUserByUsername = username => {
    return db("users")
        .where("username", username)
        .first()
}

const findUserByUserId = userId => {
    return db("users")
        .where("id", userId)
        .first()
}

const findJokesForUser = async userId => {
    const { id } = await findUserByUserId(userId)
    if (!id) throw Error(`This user does not exist!`)
    return db("jokes")
        .where("user_id", id)
        .columns(["setup", "punchline", "id", "votes"])
}

export { addUser, findUserByUsername, findUserByUserId, findJokesForUser }
