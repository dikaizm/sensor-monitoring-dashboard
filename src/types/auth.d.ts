import { Request, Response } from "express"

interface AuthController {
    login: (req: Request, res: Response) => Promise<void>
    logout: (req: Request, res: Response) => void
    register: (req: Request, res: Response) => Promise<void>
}

interface AuthService {
    login: (data: LoginType) => Promise<ApiResponse>
    logout: () => void
    register: (data: UserType) => Promise<ApiResponse>
}

interface LoginType {
    email: string
    password: string
}