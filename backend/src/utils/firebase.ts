// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";

import { firebaseConfig } from "../config/database";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app)

interface FireType {
    createDoc: (collection: string, data: any) => void
}

const fire: FireType = {
    createDoc
}

async function createDoc(col: string, data: object) {
    try {
        const docRef = await addDoc(collection(fireDb, col), data)
        // console.log('Document written with ID: ', docRef.id)
    } catch (error) {
        console.error('Error adding document: ', error)
    }
}

export { fireDb, fire }