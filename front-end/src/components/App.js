import React, { useState, useEffect } from "react"
import axios from "axios"

import { getJokes } from "../api"
import LoadingIndicator from "./LoadingIndicator"

const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [jokes, setJokes] = useState([])

    useEffect(() => {
        getJokes()
            .then(({ data }) => {
                setJokes(data)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        localStorage.setItem("jokes", JSON.stringify(jokes))
    }, [jokes])

    if (isLoading) {
        return <LoadingIndicator />
    }
    return (
        <>
            <h1>Jokes</h1>
            <ul>
                {jokes.map(({ id, setup, punchline, votes }) => (
                    <li key={id}>
                        <h4>{setup}</h4>
                        <p>{punchline}</p>
                        <span>Votes: {votes}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App
