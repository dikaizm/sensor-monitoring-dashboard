"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const models_1 = __importDefault(require("../models"));
const response_1 = __importDefault(require("../utils/response"));
const userService_1 = __importDefault(require("./userService"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = __importDefault(require("../config/auth"));
const authService = {
    login,
    register,
    refreshToken
};
function login(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const { email, password, remember } = data;
        try {
            const user = yield models_1.default.User.findOne({
                where: { email },
                include: {
                    model: models_1.default.UserRole,
                    attributes: ['role_name']
                }
            });
            if (!user)
                return response_1.default.error('User not found', null, 404);
            const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!isValidPassword)
                return response_1.default.error('Invalid password', null, 401);
            if (!user.granted)
                return response_1.default.error('User not granted', null, 401);
            const token = (0, jsonwebtoken_1.sign)({
                id: user.id,
                email: user.email,
                name: user.name,
                role: (_a = user.user_role) === null || _a === void 0 ? void 0 : _a.role_name
            }, auth_1.default.secret, {
                expiresIn: remember ? '7d' : '24h'
            });
            const userResponse = {
                name: user.name,
                email: user.email,
                role: (_b = user.user_role) === null || _b === void 0 ? void 0 : _b.role_name
            };
            return response_1.default.success('Login successful', { token, user: userResponse }, 201);
        }
        catch (error) {
            console.log(error);
            return response_1.default.error(error.message);
        }
    });
}
function register(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isUserExist = yield models_1.default.User.findOne({ where: { email: data.email } });
            if (isUserExist)
                return response_1.default.error('User already exist', null, 400);
            // hash password
            const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
            if (!hashedPassword)
                return response_1.default.error('Failed to hash password', null, 500);
            data.password = hashedPassword;
            const userRoles = yield models_1.default.UserRole.findAll();
            if (userRoles.length === 0)
                return response_1.default.error('Failed to get user roles', null, 500);
            const guestRole = userRoles.find((role) => role.dataValues.role_name === 'guest');
            const currentUserRole = userRoles.find((role) => role.dataValues.role_name === data.roleRequest);
            const newUser = {
                name: data.name,
                email: data.email,
                password: data.password,
                role_id: data.roleRequest ? currentUserRole.dataValues.id : guestRole.dataValues.id,
                granted: true
            };
            const createUser = yield userService_1.default.createUser(newUser);
            // save user register request
            if (!createUser.isSuccess) {
                return response_1.default.error(createUser.message, null, createUser.statusCode);
            }
            const newRegisterReq = {
                user_id: createUser.data.id,
                role_id: currentUserRole.dataValues.id,
            };
            yield models_1.default.RegisterRequest.create(newRegisterReq);
            return response_1.default.success('Register success. Please wait for access approval.', null, 201);
        }
        catch (error) {
            console.error(error);
            return response_1.default.error(error.message, null, 500);
        }
    });
}
function refreshToken(user) {
    try {
        const expireTimeMs = user.exp * 1000;
        const remainingTime = expireTimeMs - Date.now();
        if (remainingTime > 0) {
            const newToken = (0, jsonwebtoken_1.sign)({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }, auth_1.default.secret, {
                expiresIn: '8h'
            });
            return response_1.default.success('Token refreshed', { token: newToken });
        }
        else {
            return response_1.default.error('Token expired', null, 401);
        }
    }
    catch (error) {
        console.error(error);
        return response_1.default.error(error.message, null, 500);
    }
}
exports.default = authService;
