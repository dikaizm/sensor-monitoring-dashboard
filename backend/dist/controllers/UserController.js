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
const userService_1 = __importDefault(require("../services/userService"));
const userController = {
    updateUser,
    grantAccessUser,
    deleteUser
};
// update user
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const result = yield userService_1.default.updateUser(data);
        return result.send(res);
    });
}
function grantAccessUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const result = yield userService_1.default.grantAccessUser(req, data);
        return result.send(res);
    });
}
// delete user
function deleteUser(req, res) {
    res.send('Delete user');
}
exports.default = userController;
