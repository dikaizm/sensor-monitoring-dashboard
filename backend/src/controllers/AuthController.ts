import { Request, Response } from "express"
import { AuthController, LoginType, RegisterType } from "../types/auth"
import authService from "../services/authService"
import { ApiResponse } from "../utils/response"
import authValidation from "../validations/auth"

const authController: AuthController = {
    login,
    register
}

async function login(req: Request, res: Response) {
    const data: LoginType = req.body

    const error = authValidation.login(data)
    if (error) return error.send(res)

    const result: ApiResponse = await authService.login(data)

    if (result.isSuccess) {
        res.cookie('auth', result.data.token, { maxAge: 24 * 3600 * 1000, secure: true, sameSite: 'none', httpOnly: false })
    }

    return result.send(res)
}

async function register(req: Request, res: Response) {
    const data: RegisterType = req.body

    const error = authValidation.register(data)
    if (error) return error.send(res)

    const result: ApiResponse = await authService.register(data)

    return result.send(res)
}

export default authController