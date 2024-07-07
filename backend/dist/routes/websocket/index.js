"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../../config/auth"));
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
            ws.send(JSON.stringify({ "message": "Terhubung ke sensor", "message_type": "alert", "status": "success" }));
            mqttClient.on('message', (topic, payload) => {
                // console.log('Received Message:', topic, payload.toString())
                ws.send(payload.toString());
            });
        });
    });
}
exports.default = startWebsocketServer;
