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
const express_1 = require("express");
const firebase_1 = require("../../utils/firebase");
const models_1 = __importDefault(require("../../models"));
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
router.get('/refresh', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Count firestore
        const ultrasonicCount = yield firebase_1.fire.getDocCount('ultrasonic', 'value');
        // Save record to database
        const todayCount = yield models_1.default.Production.findOne({
            where: {
                createdAt: {
                    [sequelize_1.Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
                    [sequelize_1.Op.lt]: new Date(new Date().setHours(23, 59, 59, 999))
                }
            }
        });
        if (todayCount) {
            todayCount.quantity = ultrasonicCount;
            yield todayCount.save();
        }
        else {
            yield models_1.default.Production.create({ product_id: 1, quantity: ultrasonicCount });
        }
        res.status(200).json({ success: true, message: "Count refreshed", data: ultrasonicCount });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to refresh count" });
    }
}));
router.get('/ultrasonic', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get query params from request filter=today
    const { filter } = req.query;
    if (filter === 'today') {
        try {
            const ultrasonicData = yield models_1.default.Production.findOne({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
                        [sequelize_1.Op.lt]: new Date(new Date().setHours(23, 59, 59, 999))
                    }
                }
            });
            res.status(200).json({ success: true, message: "Production data fetched", data: (ultrasonicData === null || ultrasonicData === void 0 ? void 0 : ultrasonicData.quantity) || 0 });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to fetch production data" });
        }
    }
    else {
        try {
            const ultrasonicData = yield models_1.default.Production.findAll({
                order: [['createdAt', 'DESC']],
                include: {
                    model: models_1.default.Product,
                    attributes: ['product_name']
                }
            });
            res.status(200).json({ success: true, message: "Production data fetched", data: ultrasonicData });
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Failed to fetch production data" });
        }
    }
}));
router.get('/ultrasonic/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ultrasonicData = yield models_1.default.Production.findByPk(id);
        res.status(200).json({ success: true, message: "Production data fetched", data: ultrasonicData });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch production data" });
    }
}));
router.put('/ultrasonic/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check role
    if (req.body.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const ultrasonicData = yield models_1.default.Production.findByPk(id);
        ultrasonicData.quantity = quantity;
        yield ultrasonicData.save();
        res.status(200).json({ success: true, message: "Ultrasonic data updated" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to update ultrasonic data" });
    }
}));
exports.default = router;
