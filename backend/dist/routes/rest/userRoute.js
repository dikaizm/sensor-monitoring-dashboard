"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../../controllers/UserController"));
const router = (0, express_1.Router)();
router.put('/update', UserController_1.default.updateUser);
router.put('/grant-access', UserController_1.default.grantAccessUser);
router.delete('/delete/:id', UserController_1.default.deleteUser);
exports.default = router;
