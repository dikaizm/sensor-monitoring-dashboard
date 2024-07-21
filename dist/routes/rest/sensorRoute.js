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
const authentication_1 = __importDefault(require("../../middleware/authentication"));
const sensor_1 = __importDefault(require("../../config/sensor"));
const router = (0, express_1.Router)();
router.get('/toggle', authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conveyor = yield models_1.default.Sensor.findOne({ where: { name: 'conveyor' } });
        if (!conveyor) {
            return res.status(404).send({ success: false, error: 'Conveyor not found' });
        }
        try {
            yield fetch(`${sensor_1.default.api}/move`);
        }
        catch (error) {
            throw new Error('Failed to send command to sensor server');
        }
        // Toggle conveyor status
        const status = !conveyor.is_active;
        const dbRes = yield models_1.default.Sensor.update({ is_active: status }, { where: { name: 'conveyor' } });
        if (!dbRes) {
            return res.status(500).send({ success: false, error: 'Failed to toggle conveyor status' });
        }
        // Set sensor active time to start
        if (status) {
            yield models_1.default.SensorActiveTime.create({ sensor_id: conveyor.id, start_time: new Date(), client_id: req.ip });
        }
        else {
            // Set sensor active time to end
            const activeTime = yield models_1.default.SensorActiveTime.findOne({ where: { sensor_id: conveyor.id, end_time: null, client_id: req.ip }, order: [['start_time', 'DESC']] });
            if (activeTime) {
                const currentTime = new Date();
                const runningSec = Math.floor((currentTime.getTime() - activeTime.start_time.getTime()) / 1000);
                yield activeTime.update({ end_time: currentTime, running_sec: runningSec });
            }
        }
        // Send response as json
        res.status(200).send({ success: true, message: 'Toggle command sent!', data: { status } });
    }
    catch (error) {
        // Send error as json
        res.status(500).send({ success: false, error: error.message });
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
