import { Request, Response } from "express"
import { ApiResponse } from "./response"

interface UserService {
    createUser: (data: UserType) => Promise<ApiResponse>
    updateUser: () => void
    deleteUser: () => void
}

interface UserController {
    createUser: (req: Request, res: Response) => void
    updateUser: (req: Request, res: Response) => void
    deleteUser: (req: Request, res: Response) => void
}

interface UserType {
    name: string
    email: string
    password: string
    role_id: number
}