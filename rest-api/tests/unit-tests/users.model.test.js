import db from "../../src/data"
import { createUser } from "../../src/data/utils"
import { addUser } from "../../src/model"

describe("User", () => {
    beforeAll(() => {
        return db.migrate.latest()
    })

    afterAll(() => {
        return db("users").truncate()
        // return db.schema.dropTableIfExists("users").dropTableIfExists("jokes")
    })

    // beforeEach(() => {
    //     return db.seed.run()
    // })

    test("#addUser(userData)", async () => {
        const user = createUser()
        const { username, password } = await addUser(user)

        expect(username).toEqual(user.username)
        expect(password).toBeUndefined()
    })
})
