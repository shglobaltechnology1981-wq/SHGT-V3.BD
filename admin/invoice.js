//==================================================
// SH GLOBAL TECHNOLOGY
// invoice.js
// Replace Final
// Part-1
// Firebase + Elements + Auto Invoice Setup
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc,
getDoc

}

from 
"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



//==================================================
// HTML ELEMENTS
//==================================================


// Customer

const customerName =
document.getElementById("customerName");


const companyName =
document.getElementById("companyName");


const phoneNumber =
document.getElementById("phoneNumber");



// Invoice Info

const invoiceNo =
document.getElementById("invoiceNo");


const invoiceDate =
document.getElementById("invoiceDate");



// Product Table

const itemBody =
document.getElementById("itemBody");


const addItemBtn =
document.getElementById("addItemBtn");


const grandTotal =
document.getElementById("grandTotal");



// Buttons

const saveInvoice =
document.getElementById("saveInvoice");


const downloadPDF =
document.getElementById("downloadPDF");


const printInvoice =
document.getElementById("printInvoice");


const clearInvoice =
document.getElementById("clearInvoice");



// History

const invoiceHistory =
document.getElementById("invoiceHistory");


const searchInvoice =
document.getElementById("searchInvoice");




//==================================================
// GLOBAL VARIABLE
//==================================================


let editingId = null;



//==================================================
// DATE GENERATE
//==================================================


function generateDate(){


const date = new Date();


invoiceDate.value =

date.toLocaleDateString("en-GB");


}




//==================================================
// AUTO INVOICE NUMBER
//==================================================


function generateInvoiceNumber(){


const now = new Date();


const y =
now.getFullYear();


const m =
String(now.getMonth()+1)
.padStart(2,"0");


const d =
String(now.getDate())
.padStart(2,"0");


const random =
Math.floor(
1000 + Math.random()*9000
);



invoiceNo.value =

"SI-" +

y +

m +

d +

"-" +

random;


}



//==================================================
// INITIAL LOAD
//==================================================


generateDate();

generateInvoiceNumber();



//==================================================
// READY
//==================================================


console.log(

"SHGT Invoice Replace Final Part-1 Loaded"

);


//==================================================
// END PART-1
//==================================================
