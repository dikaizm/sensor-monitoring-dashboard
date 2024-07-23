"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqttConfig = {
    user: process.env.MQTT_USER || '',
    password: process.env.MQTT_PASSWORD || '',
    protocol: process.env.MQTT_PROTOCOL || '',
    host: process.env.MQTT_HOST || '',
    port: process.env.MQTT_PORT ? parseInt(process.env.MQTT_PORT) : 0,
    topic_1: process.env.MQTT_TOPIC_1 || '',
    topic_2: process.env.MQTT_TOPIC_2 || '',
    topic_3: process.env.MQTT_TOPIC_3 || '',
};
exports.default = mqttConfig;
