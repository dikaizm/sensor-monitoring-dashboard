"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const rest_1 = __importDefault(require("./routes/rest"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const auth_1 = __importDefault(require("./config/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const corsOption = {
    origin: auth_1.default.clientUrl,
    credentials: true,
};
app.use((0, cors_1.default)(corsOption));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/api', rest_1.default);
console.log('[server]: Router loaded');
const server = http_1.default.createServer(app);
// startMqttSubscriber()
// startWebsocketServer(server, mqttClient)
server.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`);
});
