//==================================================
// SH GLOBAL TECHNOLOGY
// FIREBASE CONFIGURATION FINAL
// SHGT-V3.BD
// App + Firestore + Storage + Authentication
//==================================================


// Firebase App
import { initializeApp }

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";


// Firestore Database
import { getFirestore }

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// Firebase Storage
import { getStorage }

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";


// Firebase Authentication
import { getAuth }

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";




//==================================================
// FIREBASE CONFIG
// Firebase Console থেকে আপনার Config বসাবেন
//==================================================


const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT_ID.firebaseapp.com",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_PROJECT_ID.appspot.com",

messagingSenderId: "YOUR_MESSAGING_SENDER_ID",

appId: "YOUR_APP_ID"

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



// Storage

export const storage = getStorage(app);



// Authentication

export const auth = getAuth(app);




// Connection Check

console.log(
"✅ Firebase Connected Successfully"
);


//==================================================
// END FIREBASE CONFIGURATION
//==================================================
