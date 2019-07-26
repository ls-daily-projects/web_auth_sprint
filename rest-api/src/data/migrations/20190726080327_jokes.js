export const up = knex =>
    knex.schema.createTable("jokes", jokes => {
        jokes.increments()

        jokes.text("setup").notNullable()
        jokes.text("punchline").notNullable()
        jokes.integer("votes").defaultTo(0)

        jokes
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })

export const down = knex => knex.schema.dropTableIfExists("jokes")
