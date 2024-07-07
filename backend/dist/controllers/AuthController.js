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
const authService_1 = __importDefault(require("../services/authService"));
const auth_1 = __importDefault(require("../validations/auth"));
const authController = {
    login,
    register
};
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const error = auth_1.default.login(data);
        if (error)
            return error.send(res);
        const result = yield authService_1.default.login(data);
        if (result.isSuccess) {
            res.cookie('auth', result.data.token, { maxAge: 24 * 3600 * 1000, secure: true, sameSite: 'none', httpOnly: false });
        }
        return result.send(res);
    });
}
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const error = auth_1.default.register(data);
        if (error)
            return error.send(res);
        const result = yield authService_1.default.register(data);
        return result.send(res);
    });
}
exports.default = authController;
