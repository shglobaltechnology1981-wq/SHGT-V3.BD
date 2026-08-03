//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-1
// Firebase Import + HTML Elements
//==================================================


//==================================================
// FIREBASE
//==================================================

import { db } from "../js/firebase.js";

import {

collection,
addDoc,
getDocs,
getDoc,
updateDoc,
deleteDoc,
doc,
query,
orderBy,
limit

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


//==================================================
// CUSTOMER INFORMATION
//==================================================

const customerName =
document.getElementById("customerName");

const companyName =
document.getElementById("companyName");

const phoneNumber =
document.getElementById("phoneNumber");

const address =
document.getElementById("address");


//==================================================
// CHALLAN INFORMATION
//==================================================

const challanId =
document.getElementById("challanId");

const challanNo =
document.getElementById("challanNo");

const challanDate =
document.getElementById("challanDate");

const invoiceRef =
document.getElementById("invoiceRef");


//==================================================
// PRODUCT TABLE
//==================================================

const challanBody =
document.getElementById("challanBody");

const totalQty =
document.getElementById("totalQty");


//==================================================
// BUTTONS
//==================================================

const addChallanItem =
document.getElementById("addChallanItem");

const saveChallan =
document.getElementById("saveChallan");

const updateChallanBtn =
document.getElementById("updateChallan");

const clearChallan =
document.getElementById("clearChallan");

const printChallan =
document.getElementById("printChallan");

const downloadChallanPDF =
document.getElementById("downloadChallanPDF");

const exportChallan =
document.getElementById("exportChallan");


//==================================================
// HISTORY
//==================================================

const searchChallan =
document.getElementById("searchChallan");

const challanHistory =
document.getElementById("challanHistory");


//==================================================
// SYSTEM STATUS
//==================================================

console.log("==================================");
console.log("SH GLOBAL TECHNOLOGY");
console.log("CHALLAN MANAGEMENT SYSTEM");
console.log("Part-1 Loaded Successfully");
console.log("Firebase Connected");
console.log("==================================");


//==================================================
// END PART-1
//==================================================
