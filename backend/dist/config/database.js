"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = exports.mysqlConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mysqlConfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'test',
};
exports.mysqlConfig = mysqlConfig;
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCe4eMA3dDGn1Ic-585EGzsxGc5qhRuPVg",
    authDomain: "sensor-monitoring-ysf.firebaseapp.com",
    projectId: "sensor-monitoring-ysf",
    storageBucket: "sensor-monitoring-ysf.appspot.com",
    messagingSenderId: "646956221747",
    appId: "1:646956221747:web:0bcb186fa252d44e71aa46",
    measurementId: "G-TLL1LVRZ8K"
};
exports.firebaseConfig = firebaseConfig;
