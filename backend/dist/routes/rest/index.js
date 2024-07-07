"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoute_1 = __importDefault(require("./userRoute"));
const authRoute_1 = __importDefault(require("./authRoute"));
const productRoute_1 = __importDefault(require("./productRoute"));
const authentication_1 = __importDefault(require("../../middleware/authentication"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Sensor Monitoring System API is running!');
});
router.use('/auth', authRoute_1.default);
router.use('/user', authentication_1.default, userRoute_1.default);
router.use('/product', authentication_1.default, productRoute_1.default);
exports.default = router;
