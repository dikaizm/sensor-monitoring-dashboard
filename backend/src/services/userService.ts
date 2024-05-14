import db from '../models'
import { UpdateUserType, UserService, UserType } from "../types/user"
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
    return response.success('User created successfully', user.dataValues, 201)
}

async function updateUser(data: UpdateUserType) {
    try {
        const { email } = data.user

        // check if user exists
        const isUserExist = await db.User.findOne({ where: { email } })
        if (!isUserExist) {
            return response.error('User not found', null, 404)
        }

        const { user, ...rest } = data

        // update user
        await db.User.update(rest, { where: { email } })

        return response.success('User updated successfully')
    } catch (error: any) {
        return response.error(error.message, null, 500)
    }
}

function deleteUser() {
    return 0
}

export default userService