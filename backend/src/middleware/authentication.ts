import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import authService from "../services/authService";
import { UserVerified } from "../types/auth";
import { ApiResponse } from "../utils/response";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const headerAuth: string | undefined = req.headers.authorization

        if (!headerAuth) {
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        }

        const token = headerAuth!.split(' ')[1]
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        }

        const payload: string | JwtPayload = verify(token, authConfig.secret)
        const user: UserVerified = payload as UserVerified

        const refreshToken: ApiResponse = authService.refreshToken(user)
        if (!refreshToken.isSuccess) {
            return refreshToken.send(res)
        }

        res.cookie('auth', refreshToken.data.token, { maxAge: 24 * 3600 * 1000, secure: true, sameSite: 'none', httpOnly: true })

        req.body.user = user
        next()

    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' })
        }
        
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}