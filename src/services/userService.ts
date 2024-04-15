import db from '../models'
import { UserService, UserType } from "../types/user"
import response from "../utils/response"

const userService: UserService = {
    createUser,
    updateUser,
    deleteUser
}

async function createUser(data: UserType) {
    const { email } = data

    // check if user already exists
    const isUserExist = await db.User.findOne({ where: { email } })
    if (isUserExist) {
        return response.error('User already exists', null, 409)
    }

    // create user
    const user = await db.User.create(data)
    return response.success('User created successfully', user)
}

function updateUser() {
    return 0
}

function deleteUser() {
    return 0
}

export default userService