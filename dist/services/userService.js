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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const response_1 = __importDefault(require("../utils/response"));
const auth_1 = __importDefault(require("../config/auth"));
const userService = {
    createUser,
    updateUser,
    grantAccessUser,
    deleteUser
};
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = data;
        // check if user already exists
        const isUserExist = yield models_1.default.User.findOne({ where: { email } });
        if (isUserExist) {
            return response_1.default.error('User already exists', null, 409);
        }
        // create user
        const user = yield models_1.default.User.create(data);
        return response_1.default.success('User created successfully', user.dataValues, 201);
    });
}
function updateUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = data.user;
            // check if user exists
            const isUserExist = yield models_1.default.User.findOne({ where: { email } });
            if (!isUserExist) {
                return response_1.default.error('User not found', null, 404);
            }
            const { user } = data, rest = __rest(data
            // update user
            , ["user"]);
            // update user
            yield models_1.default.User.update(rest, { where: { email } });
            return response_1.default.success('User updated successfully');
        }
        catch (error) {
            return response_1.default.error(error.message, null, 500);
        }
    });
}
function grantAccessUser(req, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const registerReq = yield models_1.default.RegisterRequest.findOne({ where: { id: data.register_req_id } });
            if (!registerReq) {
                return response_1.default.error('Register request not found', null, 404);
            }
            const grantAccess = () => __awaiter(this, void 0, void 0, function* () {
                yield models_1.default.User.update({ granted: true, role_id: registerReq.role_id }, { where: { id: registerReq.user_id } });
                yield models_1.default.RegisterRequest.destroy({ where: { id: data.register_req_id } });
                return response_1.default.success('User granted access successfully');
            });
            if (data.secret_key) {
                if (data.secret_key === auth_1.default.secret) {
                    return yield grantAccess();
                }
                else {
                    return response_1.default.error('Invalid secret key', null, 401);
                }
            }
            const currentUser = req.body.user;
            if (!currentUser || currentUser.role !== 'admin') {
                return response_1.default.error('Access denied', null, 401);
            }
            return yield grantAccess();
        }
        catch (error) {
            console.error(error);
            return response_1.default.error(error.message, null, 500);
        }
    });
}
function deleteUser() {
    return 0;
}
exports.default = userService;
