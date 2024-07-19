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
const sensorRoute_1 = __importDefault(require("./sensorRoute"));
const router = (0, express_1.Router)();
const clients = new Map();
const INACTIVITY_TIMEOUT = 2000; // 10 seconds
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
            const timeout = setTimeout(() => {
                console.log(`Client ${clientId} is inactive. Recording end time: ${new Date(currentTime)}`);
                // Record the sensor activity end time here
                clients.delete(clientId);
            }, INACTIVITY_TIMEOUT);
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
