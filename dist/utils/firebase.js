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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fire = exports.fireDb = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
// import { getAnalytics } from "firebase/analytics";
const database_1 = require("../config/database");
// Initialize Firebase
const app = (0, app_1.initializeApp)(database_1.firebaseConfig);
const fireDb = (0, firestore_1.getFirestore)(app);
exports.fireDb = fireDb;
const fire = {
    createDoc
};
exports.fire = fire;
function createDoc(col, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(fireDb, col), data);
            // console.log('Document written with ID: ', docRef.id)
        }
        catch (error) {
            console.error('Error adding document: ', error);
        }
    });
}
