import { sign } from "jsonwebtoken";
import db from "../models";
import { AuthService, LoginType, RegisterType, UserVerified } from "../types/auth";
import { UserType } from "../types/user";
import response from "../utils/response";
import userService from "./userService";
import bcrypt from 'bcryptjs';
import authConfig from "../config/auth";
import { capitalizeFirstLetter } from "../utils/globalUtils";

const authService: AuthService = {
    login,
    register,
    refreshToken
}

async function login(data: LoginType) {
    const { email, password } = data

    try {
        const user: UserType = await db.User.findOne({ 
            where: { email },
            include: {
                model: db.UserRole,
                attributes: ['role_name']
            }
        })
        if (!user) return response.error('User not found', null, 404)

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) return response.error('Invalid password', null, 401)

        if (!user.granted) return response.error('User not granted', null, 401)

        const token = sign({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.user_role?.role_name
        }, authConfig.secret, {
            expiresIn: '8h'
        })

        const userResponse = {
            name: user.name,
            email: user.email,
            role: capitalizeFirstLetter(user.user_role?.role_name || '')
        }

        return response.success('Login successful', { token, user: userResponse }, 201)
    } catch (error: any) {
        console.log(error);
        return response.error(error.message)
    }
}

async function register(data: RegisterType) {
    try {
        const isUserExist = await db.User.findOne({ where: { email: data.email } })
        if (isUserExist) return response.error('User already exist', null, 400)

        // hash password
        const hashedPassword = await bcrypt.hash(data.password, 10)
        if (!hashedPassword) return response.error('Failed to hash password', null, 500)

        data.password = hashedPassword

        const userRoles = await db.UserRole.findAll()
        if (userRoles.length === 0) return response.error('Failed to get user roles', null, 500)

        const guestRole = userRoles.find((role: any) => role.dataValues.role_name === 'guest')
        const currentUserRole = userRoles.find((role: any) => role.dataValues.role_name === data.roleRequest)

        const newUser: UserType = {
            name: data.name,
            email: data.email,
            password: data.password,
            role_id: guestRole.dataValues.id,
            granted: false
        }

        const createUser = await userService.createUser(newUser)

        // save user register request
        if (!createUser.isSuccess) {
            return response.error(createUser.message, null, createUser.statusCode)
        }

        const newRegisterReq = {
            user_id: createUser.data.id,
            role_id: currentUserRole.dataValues.id,
        }
        await db.RegisterRequest.create(newRegisterReq)

        return response.success('Register success. Please wait for access approval.', null, 201)
    } catch (error: any) {
        console.error(error)
        return response.error(error.message, null, 500)
    }
}

function refreshToken(user: UserVerified) {
    try {
        const expireTimeMs = user.exp * 1000
        const remainingTime = expireTimeMs - Date.now()

        if (remainingTime > 0) {
            const newToken = sign({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }, authConfig.secret, {
                expiresIn: '8h'
            })

            return response.success('Token refreshed', { token: newToken })
        } else {
            return response.error('Token expired', null, 401)
        }
    } catch (error: any) {
        console.error(error)
        return response.error(error.message, null, 500)
    }
}

export default authService