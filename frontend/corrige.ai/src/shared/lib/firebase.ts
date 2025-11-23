import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCnTBcBU3Z4VFsk-6kvCN-st7oywY_-GDM",
    authDomain: "corrigeai-49bf4.firebaseapp.com",
    projectId: "corrigeai-49bf4",
    storageBucket: "corrigeai-49bf4.firebasestorage.app",
    messagingSenderId: "383637066860",
    appId: "1:383637066860:web:29823fdea2276a2126f449"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
