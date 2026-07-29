//==================================================
// SH GLOBAL TECHNOLOGY
// FIREBASE CONFIGURATION
// SHGT-V3.BD
//==================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


//==================================================
// FIREBASE CONFIG
//==================================================

const firebaseConfig = {

  apiKey: "AIzaSyBO7FwgicWD9lXvvLQcVw3NWMpWXeVHJ88",

  authDomain: "shgt-v3bd.firebaseapp.com",

  projectId: "shgt-v3bd",

  storageBucket: "shgt-v3bd.firebasestorage.app",

  messagingSenderId: "240941738351",

  appId: "1:240941738351:web:e157cc0071ec616538209a",

  measurementId: "G-FJC796C01Q"

};


//==================================================
// INITIALIZE FIREBASE
//==================================================

const app = initializeApp(firebaseConfig);


//==================================================
// EXPORT SERVICES
//==================================================

// Firestore Database
export const db = getFirestore(app);

// Firebase Storage
export const storage = getStorage(app);

// Firebase Authentication
export const auth = getAuth(app);


//==================================================
// CONNECTION CHECK
//==================================================

console.log("✅ Firebase Connected Successfully");


//==================================================
// END
//==================================================
