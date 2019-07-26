import { createJokes } from "../utils"

const jokes = createJokes()

export const seed = knex =>
    knex("jokes")
        .truncate()
        .insert(jokes)
