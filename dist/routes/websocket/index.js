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
const ws_1 = __importDefault(require("ws"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../../config/auth"));
const subscriber_1 = require("../mqtt/subscriber");
const models_1 = __importDefault(require("../../models"));
const sequelize_1 = require("sequelize");
function startWebsocketServer(server, mqttClient) {
    const wss = new ws_1.default.Server({ server });
    console.log('[server]: WebSocket server is running');
    wss.on('connection', (ws, req) => {
        var _a;
        const params = new URLSearchParams((_a = req.url) === null || _a === void 0 ? void 0 : _a.split('?')[1]);
        const token = params.get('session');
        if (!token) {
            console.log('No token provided');
            ws.close(1002, 'Protocol error');
            return;
        }
        jsonwebtoken_1.default.verify(token, auth_1.default.secret, (err, decoded) => {
            if (err) {
                console.log('Invalid token');
                ws.close(1008, 'Unauthorized');
                return;
            }
            ws.email = decoded.email;
            ws.on('message', (message) => {
                console.log(`Received message from ${ws.email}: ${message}`);
            });
            if (!(0, subscriber_1.checkMqttConnection)()) {
                ws.send(JSON.stringify({ "message": "Gagal terhubung ke sensor", "message_type": "alert", "status": "error" }));
                ws.close(1006, 'Server error');
                return;
            }
            ws.send(JSON.stringify({ "message": "Terhubung ke sensor", "message_type": "alert", "status": "success" }));
            mqttClient.on('message', (topic, payload) => __awaiter(this, void 0, void 0, function* () {
                const payloadStr = payload.toString();
                // console.log('Received Message:', topic, payloadStr)
                const data = JSON.parse(payloadStr);
                if (data.tag_name === 'ultrasonic' && data.value) {
                    const todayCount = yield models_1.default.Production.findOne({
                        where: {
                            createdAt: {
                                [sequelize_1.Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
                                [sequelize_1.Op.lt]: new Date(new Date().setHours(23, 59, 59, 999))
                            }
                        }
                    });
                    data.value = todayCount ? todayCount.quantity : 0;
                    ws.send(JSON.stringify(data));
                }
                else {
                    ws.send(payloadStr);
                }
            }));
        });
    });
}
exports.default = startWebsocketServer;
