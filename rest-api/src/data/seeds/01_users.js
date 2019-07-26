import { createMany, createUser } from "../utils"

const users = [
    { id: 1, username: "icanhazdadjoke", password: "Password123!" },
    ...createMany(createUser)
]

export const seed = knex =>
    knex("users")
        .truncate()
        .insert(users)
