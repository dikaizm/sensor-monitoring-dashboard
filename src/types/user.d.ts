import { Request, Response } from "express"
import { ApiResponse } from "../utils/response"

interface UserService {
    createUser: (data: UserType) => Promise<ApiResponse>
    updateUser: () => void
    deleteUser: () => void
}

interface UserController {
    updateUser: (req: Request, res: Response) => void
    deleteUser: (req: Request, res: Response) => void
}

interface UserType {
    id?: number
    name: string
    email: string
    password: string
    role_id: number
}