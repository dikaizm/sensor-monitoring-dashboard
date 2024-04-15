import { Request, Response } from "express";
import userService from "../services/userService";
import { UserController, UserType } from "../types/user";
import { ApiResponse } from "../utils/response";

const userController: UserController = {
    updateUser,
    deleteUser
}

// update user
function updateUser(req: Request, res: Response) {
    res.send('Update user')
}

// delete user
function deleteUser(req: Request, res: Response) {
    res.send('Delete user')
}

export default userController