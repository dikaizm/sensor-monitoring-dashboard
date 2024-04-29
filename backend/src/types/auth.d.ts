import { Request, Response } from "express"
import { UserType } from "./user"
import { ApiResponse } from "../utils/response"
import { JwtPayload } from "jsonwebtoken"

interface AuthController {
    login: (req: Request, res: Response) => Promise<void>
    logout: (req: Request, res: Response) => void
    register: (req: Request, res: Response) => Promise<void>
}

interface AuthService {
    login: (data: LoginType) => Promise<ApiResponse>
    logout: () => void
    register: (data: UserType) => Promise<ApiResponse>
    refreshToken: (user: UserVerified) => ApiResponse
}

interface LoginType {
    email: string
    password: string
}

interface UserVerified {
    id: number
    email: string
    name: string
    iat: number
    exp: number
}