import { Request, Response } from "express";
import userService from "../services/userService";
import { UpdateUserType, UserController, UserType } from "../types/user";
import { ApiResponse } from "../utils/response";

const userController: UserController = {
    updateUser,
    deleteUser
}

// update user
async function updateUser(req: Request, res: Response) {
    const data: UpdateUserType = req.body

    const result: ApiResponse = await userService.updateUser(data)

    return result.send(res)
}

// delete user
function deleteUser(req: Request, res: Response) {
    res.send('Delete user')
}

export default userController