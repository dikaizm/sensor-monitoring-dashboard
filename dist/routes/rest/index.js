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
const userRoute_1 = __importDefault(require("./userRoute"));
const authRoute_1 = __importDefault(require("./authRoute"));
const productRoute_1 = __importDefault(require("./productRoute"));
const authentication_1 = __importDefault(require("../../middleware/authentication"));
const sensorRoute_1 = __importDefault(require("./sensorRoute"));
const models_1 = __importDefault(require("../../models"));
const router = (0, express_1.Router)();
// Function to record sensor active time end
function recordSensorEndTime(clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!clientId) {
            const conveyor = yield models_1.default.Sensor.findOne({ where: { name: 'conveyor' } });
            var activeTime = yield models_1.default.SensorActiveTime.findOne({
                where: { sensor_id: conveyor.id, end_time: null },
                order: [['start_time', 'DESC']]
            });
        }
        else {
            var activeTime = yield models_1.default.SensorActiveTime.findOne({
                where: { client_id: clientId, end_time: null },
                order: [['start_time', 'DESC']]
            });
        }
        if (activeTime) {
            const currentTime = new Date();
            const runningSec = Math.floor((currentTime.getTime() - activeTime.start_time.getTime()) / 1000);
            yield activeTime.update({ end_time: currentTime, running_sec: runningSec });
            console.log(`Recorded end time for sensor ${clientId} at ${currentTime}`);
        }
        else {
            console.log(`No active time record found for sensor ${clientId}`);
        }
    });
}
const clients = new Map();
const INACTIVITY_TIMEOUT = 120000; // 120 seconds
// Middleware to track clients' requests
router.use((req, res, next) => {
    const type = req.query.type;
    if (type === 'plc') {
        const clientId = req.ip; // Use a more specific identifier if needed
        console.log(clientId);
        const currentTime = Date.now();
        if (clientId) {
            // If client already exists, clear the existing timeout
            if (clients.has(clientId)) {
                clearTimeout(clients.get(clientId).timeout);
            }
            // Set a new inactivity timeout
            const timeout = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                console.log(`Client ${clientId} is inactive. Recording end time: ${new Date(currentTime)}`);
                // Record the sensor activity end time here
                yield recordSensorEndTime();
                clients.delete(clientId);
            }), INACTIVITY_TIMEOUT);
            // Update the client's last active time and timeout
            clients.set(clientId, { lastActive: currentTime, timeout });
        }
    }
    next();
});
router.get('/', (req, res) => {
    res.send('Sensor Monitoring System API is running!');
});
router.use('/auth', authRoute_1.default);
router.use('/user', authentication_1.default, userRoute_1.default);
router.use('/product', authentication_1.default, productRoute_1.default);
router.use('/sensor/conveyor', sensorRoute_1.default);
exports.default = router;
