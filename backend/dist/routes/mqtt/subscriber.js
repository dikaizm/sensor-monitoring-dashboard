"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mqttClient = exports.startMqttSubscriber = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mqtt_1 = __importDefault(require("mqtt"));
const mqtt_2 = __importDefault(require("../../config/mqtt"));
const firebase_1 = require("../../utils/firebase");
const mqttOptions = {
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
    clean: true,
    connectTimeout: 4000,
    username: mqtt_2.default.user,
    password: mqtt_2.default.password,
    reconnectPeriod: 1000,
    ca: fs_1.default.readFileSync(path_1.default.join(__dirname, '../../../certs/emqxsl-ca.crt')),
};
const urlConfig = {
    protocol: mqtt_2.default.protocol,
    host: mqtt_2.default.host,
    port: mqtt_2.default.port
};
const connectUrl = `${urlConfig.protocol}://${urlConfig.host}:${urlConfig.port}`;
const mqttClient = mqtt_1.default.connect(connectUrl, mqttOptions);
exports.mqttClient = mqttClient;
const topic = mqtt_2.default.topic;
function startMqttSubscriber() {
    mqttClient.on('connect', () => {
        console.log('mqtt connected');
        mqttClient.subscribe([topic], () => {
            console.log(`Subscribe to topic '${topic}'`);
            mqttClient.publish(topic, JSON.stringify({ 'message': 'Sensor mqtt test' }), { qos: 1, retain: true }, (error) => {
                if (error) {
                    console.error(error);
                }
            });
        });
    });
    mqttClient.on('message', (topic, payload) => {
        const payloadStr = payload.toString();
        // console.log('Received Message:', topic, payloadStr)
        const data = JSON.parse(payloadStr);
        // Save to database
        if (data.tag_name === 'photoelectric') {
            const photoelectricData = {
                status: data.value,
                created_at: data.timestamp
            };
            firebase_1.fire.createDoc('photoelectric', photoelectricData);
        }
    });
}
exports.startMqttSubscriber = startMqttSubscriber;
