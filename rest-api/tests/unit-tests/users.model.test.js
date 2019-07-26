import db from "../../src/data"
import { createUser } from "../../src/data/utils"
import { addUser, findUserByUsername } from "../../src/model"

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

    test("#findUserByUsername(username)", async () => {
        const user = createUser()
        const { username, password } = await addUser(user)
        const foundUser = await findUserByUsername(username)

        expect(foundUser.username).toEqual(user.username)
        expect(password).not.toEqual(user.password)
    })
})
