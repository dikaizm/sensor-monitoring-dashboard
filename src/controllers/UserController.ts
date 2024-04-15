import { Request, Response } from "express";
import userService from "../services/userService";
import { UserController, UserType } from "../types/user";
import { ApiResponse } from "../types/response";


const userController: UserController = {
    createUser,
    updateUser,
    deleteUser
}

// create user
async function createUser(req: Request, res: Response) {
    const data: UserType = req.body

    console.log(data);

    const result: ApiResponse = await userService.createUser(data)
    return result.send(res)
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