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
const models_1 = __importDefault(require("../../models"));
const router = (0, express_1.Router)();
router.get('/toggle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conveyor = yield models_1.default.Sensor.findOne({ where: { name: 'conveyor' } });
        if (!conveyor) {
            return res.status(404).send({ message: 'Conveyor not found' });
        }
        // Toggle conveyor status
        const status = !conveyor.is_active;
        yield models_1.default.Sensor.update({ is_active: status }, { where: { name: 'conveyor' } });
        // Send response as json
        res.status(200).send({ message: 'Toggle command sent!', data: { status } });
    }
    catch (error) {
        // Send error as json
        res.status(500).send({ message: error.message });
    }
}));
router.get('/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conveyor = yield models_1.default.Sensor.findOne({ where: { name: 'conveyor' } });
        if (!conveyor) {
            return res.status(404).send({ message: 'Conveyor not found' });
        }
        // Send response as json
        res.status(200).send({ message: 'Success get status', data: { status: conveyor.is_active } });
    }
    catch (error) {
        // Send error as json
        res.status(500).send({ message: error.message });
    }
}));
exports.default = router;
