import { resolve as resolvePath } from "path"
import { dbUri } from "./config"

const connection = { filename: dbUri }
const migrations = {
    directory: resolvePath(__dirname, "./data/migrations"),
    tableName: "dbmigrations"
}

const seeds = { directory: resolvePath(__dirname, "./data/seeds") }

const pool = {
    afterCreate: (connection, done) => {
        connection.run("PRAGMA foreign_keys = ON", done)
    }
}

export const development = {
    client: "sqlite3",
    connection,
    useNullAsDefault: true,
    pool,
    migrations,
    seeds
}
