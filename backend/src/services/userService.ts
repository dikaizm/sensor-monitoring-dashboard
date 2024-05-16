import { Request } from 'express'
import db from '../models'
import { GrantAccessRequest, UpdateUserType, UserService, UserType } from "../types/user"
import response from "../utils/response"
import authConfig from '../config/auth'

const userService: UserService = {
    createUser,
    updateUser,
    grantAccessUser,
    deleteUser
}

async function createUser(data: UserType) {
    const { email } = data

    // check if user already exists
    const isUserExist = await db.User.findOne({ where: { email } })
    if (isUserExist) {
        return response.error('User already exists', null, 409)
    }

    // create user
    const user = await db.User.create(data)
    return response.success('User created successfully', user.dataValues, 201)
}

async function updateUser(data: UpdateUserType) {
    try {
        const { email } = data.user

        // check if user exists
        const isUserExist = await db.User.findOne({ where: { email } })
        if (!isUserExist) {
            return response.error('User not found', null, 404)
        }

        const { user, ...rest } = data

        // update user
        await db.User.update(rest, { where: { email } })

        return response.success('User updated successfully')
    } catch (error: any) {
        return response.error(error.message, null, 500)
    }
}

async function grantAccessUser(req: Request, data: GrantAccessRequest) {
    try {
        const registerReq = await db.RegisterRequest.findOne({ where: { id: data.register_req_id } });

        if (!registerReq) {
            return response.error('Register request not found', null, 404);
        }

        const grantAccess = async () => {
            await db.User.update({ granted: true, role_id: registerReq.role_id }, { where: { id: registerReq.user_id } });
            await db.RegisterRequest.destroy({ where: { id: data.register_req_id } });
            return response.success('User granted access successfully');
        };

        if (data.secret_key) {
            if (data.secret_key === authConfig.secret) {
                return await grantAccess();
            } else {
                return response.error('Invalid secret key', null, 401);
            }
        }

        const currentUser = req.body.user;
        if (currentUser.role !== 'admin') {
            return response.error('Access denied', null, 401);
        }

        return await grantAccess();
    } catch (error: any) {
        console.error(error);
        return response.error(error.message, null, 500);
    }
}

function deleteUser() {
    return 0
}

export default userService