import { resolve as resolvePath } from "path"

require("dotenv").config({
    path: resolvePath(__dirname, "../.env")
})

const { PORT, NODE_ENV, CRA_BUILD_PATH, DB_URI, TEST_DB_URI } = process.env

const isProduction = NODE_ENV === "production"
const isTesting = NODE_ENV === "test"
const port = PORT || 5000
const craPath = resolvePath(
    __dirname,
    CRA_BUILD_PATH || "../../front-end/build"
)
const dbUri = isTesting ? TEST_DB_URI : DB_URI

export { port, isProduction, isTesting, craPath, dbUri }
