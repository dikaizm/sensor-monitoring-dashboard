import { Request, Response } from "express"
import { ApiResponse } from "../utils/response"
import { UserVerified } from "./auth"

interface UserService {
    createUser: (data: UserType) => Promise<ApiResponse>
    updateUser: (data: UpdateUserType) => Promise<ApiResponse>
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
    granted: boolean
}

interface UserRoleType {
    id?: number
    role_name: string
}

interface UpdateUserType {
    email?: string
    name?: string
    password?: string
    user: UserVerified
}

interface UserRequest {
    name: string
    email: string
    password: string
    confirmPassword: string
    roleRequest: string
}