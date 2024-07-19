import dotenv from 'dotenv'

dotenv.config()

const mysqlConfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'test',
}

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

export { mysqlConfig, firebaseConfig }