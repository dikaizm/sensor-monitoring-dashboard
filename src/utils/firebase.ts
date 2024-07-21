// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, query, Timestamp, where } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";

import { firebaseConfig } from "../config/database";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app)

interface FireType {
    createDoc: (collection: string, data: any) => void
    getDocCount: (collection: string, field: string) => Promise<number>
}

const fire: FireType = {
    createDoc,
    getDocCount
}

async function createDoc(col: string, data: object) {
    try {
        const docRef = await addDoc(collection(fireDb, col), data)
        console.log('Document written with ID: ', docRef.id)
    } catch (error) {
        console.error('Error adding document: ', error)
    }
}

async function getDocCount(col: string, field: string) {
    const today = new Date();
    const startOfDay = Timestamp.fromDate(new Date(today.setHours(0, 0, 0, 0)));
    const endOfDay = Timestamp.fromDate(new Date(today.setHours(23, 59, 59, 999)));

    const q = query(
        collection(fireDb, col),
        where(field, '==', true),
        where('created_at', '>=', startOfDay),
        where('created_at', '<=', endOfDay)
    );

    const querySnapshot = await getDocs(q);
    console.log('Document count with value true and created today: ', querySnapshot.size);
    return querySnapshot.size;
}

export { fireDb, fire }