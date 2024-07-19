"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
const authService_1 = __importDefault(require("../services/authService"));
function authMiddleware(req, res, next) {
    try {
        const headerAuth = req.headers.authorization;
        if (!headerAuth) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const token = headerAuth.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const payload = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret);
        const user = payload;
        const refreshToken = authService_1.default.refreshToken(user);
        if (!refreshToken.isSuccess) {
            return refreshToken.send(res);
        }
        res.cookie('auth', refreshToken.data.token, { maxAge: 24 * 3600 * 1000, secure: false, sameSite: 'none', httpOnly: true });
        req.body.user = user;
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.default = authMiddleware;
