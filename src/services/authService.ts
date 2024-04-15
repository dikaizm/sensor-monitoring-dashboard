import { where } from "sequelize";
import db from "../models";
import { AuthService, LoginType } from "../types/auth";
import { UserType } from "../types/user";
import response from "../utils/response";
import userService from "./userService";
import bcrypt from 'bcrypt'

const authService: AuthService = {
    login,
    logout,
    register
}

async function login(data: LoginType) {
    const { email, password } = data

    try {
        const user: UserType = await db.User.findOne({ where: { email } })
        if (!user) return response.error('User not found', null, 404)

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) return response.error('Invalid password', null, 401)

        return response.success('Login successful')
    } catch (error: any) {
        console.log(error);
        return response.error(error.message)
    }
}

function logout() {

}

async function register(data: UserType) {
    try {
        // hash password
        const hashedPassword = await bcrypt.hash(data.password, 10)
        if (!hashedPassword) return response.error('Failed to hash password', null, 500)

        data.password = hashedPassword

        const result = await userService.createUser(data)

        return result
    } catch (error: any) {
        console.error(error)
        return response.error(error.message, null, 500)
    }
}

export default authService