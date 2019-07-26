export const up = knex =>
    knex.schema.createTable("users", users => {
        users.increments()

        users
            .string("username", 255)
            .notNullable()
            .unique()
        users.string("password", 255).notNullable()
    })

export const down = knex => knex.schema.dropTableIfExists("users")
