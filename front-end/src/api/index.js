import axios from "axios"

const request = axios.create({
    baseURL: "/api",
    timeout: 1000,
    headers: {
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2NDE2NjQ5OCwiZXhwIjoxNTY0MjUyODk4fQ.APaAB4TcGil7NSjZUsiPAk8hM5ydeiRL51fUOb9shm8"
    }
})

export const getJokes = () => request.get("/jokes")
