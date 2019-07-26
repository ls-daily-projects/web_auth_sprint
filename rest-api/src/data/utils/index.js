import faker from "faker"

import jokes from "./jokes.json"

const maxRecords = 100

const createMany = (factory, count = maxRecords) => {
    const many = []
    for (let index = 0; index < count; index++) {
        many.push(factory())
    }
    return many
}

const createUser = (firstName, lastName) => {
    return {
        username: faker.internet.userName(firstName, lastName),
        password: faker.internet.password(8, true)
    }
}

const createJokes = () => {
    return jokes
        .map(({ joke }) => joke)
        .filter(j => j.includes("?"))
        .filter(j => !j.includes("\n"))
        .map(j => {
            const [setup, punchline] = j.split("?")
            return { setup: setup + "?", punchline, user_id: 1 }
        })
}

export { createMany, createUser, createJokes }
