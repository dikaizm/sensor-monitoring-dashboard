import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import authService from "../services/authService";
import { UserVerified } from "../types/auth";
import response, { ApiResponse } from "../utils/response";

interface UserRequest extends Request {
    user: UserVerified
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const headerAuth: string | undefined = req.headers.authorization

        if (!headerAuth) {
            return response.error('Unauthorized', null, 401)
        }

        const token = headerAuth!.split(' ')[1]
        if (!token) {
            return response.error('Unauthorized', null, 401)
        }

        const payload: string | JwtPayload = verify(token, authConfig.secret)
        const user: UserVerified = payload as UserVerified

        const refreshToken: ApiResponse = authService.refreshToken(user)
        if (!refreshToken.isSuccess) {
            return response.error(refreshToken.message, null, refreshToken.statusCode)
        }
        
        res.cookie('auth', refreshToken.data.token, { maxAge: 24 * 3600 * 1000, httpOnly: true })

        req.body.user = user
        next()
        
    } catch (error) {
        console.error(error)
        return response.error('Internal server error', null, 500)
    }
}