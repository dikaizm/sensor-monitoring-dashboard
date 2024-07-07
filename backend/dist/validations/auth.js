"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const response_1 = __importDefault(require("../utils/response"));
function register(data) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required(),
        roleRequest: joi_1.default.string().required()
    });
    const { error } = schema.validate(data);
    if (error)
        return response_1.default.error(error.details[0].message, null, 400);
    else
        return null;
}
function login(data) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required()
    });
    const { error } = schema.validate(data);
    if (error)
        return response_1.default.error(error.details[0].message, null, 400);
    else
        return null;
}
const authValidation = { register, login };
exports.default = authValidation;
