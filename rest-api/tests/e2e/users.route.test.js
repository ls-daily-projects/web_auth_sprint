import request from "supertest"

import db from "../../src/data"
import { createUser } from "../../src/data/utils"
import app from "../../src/app"

describe("POST /api/register", () => {
    beforeAll(() => {
        return db.migrate.latest()
    })

    afterAll(() => {
        return db("users").truncate()
    })

    test("adds a user", async () => {
        const user = createUser()
        const result = await request(app)
            .post("/api/register")
            .send(user)

        expect(result.body.username).toEqual(user.username)
    })
})

describe("POST /api/login", () => {
    beforeAll(() => {
        return db.migrate.latest()
    })

    afterAll(() => {
        return db("users").truncate()
    })

    test("adds a user", async () => {
        const user = createUser()
        await request(app)
            .post("/api/register")
            .send(user)

        const result = await request(app)
            .post("/api/login")
            .send(user)
        const jwtRegex = expect.stringMatching(
            /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
        )
        expect(result.body.token).toEqual(jwtRegex)
    })
})
