import { Request, Response } from "express"
import { UserRequest, UserType } from "./user"
import { ApiResponse } from "../utils/response"
import { JwtPayload } from "jsonwebtoken"

interface AuthController {
    login: (req: Request, res: Response) => Promise<void>
    register: (req: Request, res: Response) => Promise<void>
}

interface AuthService {
    login: (data: LoginType) => Promise<ApiResponse>
    register: (data: UserRequest) => Promise<ApiResponse>
    refreshToken: (user: UserVerified) => ApiResponse
}

interface LoginType {
    email: string
    password: string
    remember: boolean
}

interface UserVerified {
    id: number
    email: string
    name: string
    role: string
    iat: number
    exp: number
}

interface RegisterType {
    name: string
    email: string
    password: string
    confirmPassword: string
    roleRequest: string
}