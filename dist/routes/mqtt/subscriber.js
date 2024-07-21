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
exports.mqttClient = exports.checkMqttConnection = exports.startMqttSubscriber = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mqtt_1 = __importDefault(require("mqtt"));
const mqtt_2 = __importDefault(require("../../config/mqtt"));
const firebase_1 = require("../../utils/firebase");
const firestore_1 = require("firebase/firestore");
const models_1 = __importDefault(require("../../models"));
const sequelize_1 = require("sequelize");
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
        console.log('[server]: mqtt connected');
        mqttClient.subscribe([topic], () => {
            console.log(`[server]: Subscribe to topic '${topic}'`);
            mqttClient.publish(topic, JSON.stringify({ 'message': 'Sensor mqtt test' }), { qos: 1, retain: true }, (error) => {
                if (error) {
                    console.error(error);
                }
            });
        });
    });
    mqttClient.on('message', (topic, payload) => __awaiter(this, void 0, void 0, function* () {
        let data;
        try {
            const payloadStr = payload.toString();
            // console.log('Received Message:', topic, payloadStr)
            data = JSON.parse(payloadStr);
        }
        catch (error) {
            console.error(error);
        }
        // Save to database
        if (data.tag_name === 'ultrasonic' && data.value) {
            // Save record to firebase
            const ultrasonicData = {
                value: data.value,
                created_at: (0, firestore_1.serverTimestamp)()
            };
            firebase_1.fire.createDoc('ultrasonic', ultrasonicData);
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
                todayCount.quantity += 1;
                yield todayCount.save();
            }
            else {
                yield models_1.default.Production.create({ product_id: 1, quantity: 1 });
            }
        }
    }));
}
exports.startMqttSubscriber = startMqttSubscriber;
function checkMqttConnection() {
    if (mqttClient.connected) {
        console.log('[server]: mqtt connected');
        return true;
    }
    else {
        console.log('[server]: mqtt not connected');
        return false;
    }
}
exports.checkMqttConnection = checkMqttConnection;
