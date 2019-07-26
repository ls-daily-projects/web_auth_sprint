import { hashSync } from "bcrypt"

import { createMany, createUser } from "../utils"

const users = [
    { id: 1, username: "icanhazdadjoke", password: "Password123!" },
    ...createMany(createUser)
].map(user => {
    const hashedPassword = hashSync(user.password, 10)
    return { ...user, password: hashedPassword }
})

export const seed = knex =>
    knex("users")
        .truncate()
        .insert(users)
