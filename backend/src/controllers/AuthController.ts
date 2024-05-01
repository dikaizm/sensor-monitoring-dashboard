import { Request, Response } from "express"
import { AuthController, LoginType } from "../types/auth"
import authService from "../services/authService"
import { ApiResponse } from "../utils/response"
import { UserType } from "../types/user"

const authController: AuthController = {
    login,
    logout,
    register
}

async function login(req: Request, res: Response) {
    const data: LoginType = req.body

    const result: ApiResponse = await authService.login(data)

    if (result.isSuccess) {
        res.cookie('auth', result.data.token, { maxAge: 24 * 3600 * 1000 })
    }

    return result.send(res)
}

function logout(req: Request, res: Response) {
    // code here
}

async function register(req: Request, res: Response) {
    const data: UserType = req.body

    const result: ApiResponse = await authService.register(data)

    return result.send(res)
}

export default authController