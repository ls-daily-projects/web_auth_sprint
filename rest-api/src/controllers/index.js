import { addUser } from "../model"

export const registerUser = async (req, res, next) => {
    try {
        const addedUser = await addUser(req.body)
        res.json(addedUser)
    } catch (error) {
        next(error)
    }
}
