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
