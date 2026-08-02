//==================================================
// SH GLOBAL TECHNOLOGY
// STOCK MANAGEMENT SYSTEM
// admin/stock.js
// Replace Final
// Part-1
// Firebase + Elements Setup
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc,
query,
orderBy

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";





//==================================================
// HTML ELEMENT
//==================================================


// Product

const productName =
document.getElementById("productName");


const productCode =
document.getElementById("productCode");


// Quantity

const stockQty =
document.getElementById("stockQty");


// Price

const stockPrice =
document.getElementById("stockPrice");


// Type

const stockType =
document.getElementById("stockType");


// Button

const addStockBtn =
document.getElementById("addStockBtn");


// Table

const stockTable =
document.getElementById("stockTable");


// Dashboard

const totalProduct =
document.getElementById("totalProduct");


const totalStock =
document.getElementById("totalStock");


const lowStock =
document.getElementById("lowStock");


// Search

const searchStock =
document.getElementById("searchStock");




//==================================================
// GLOBAL
//==================================================


let stockList = [];




//==================================================
// READY
//==================================================


console.log(

"✅ SHGT Stock System Replace Final Part-1 Loaded"

);


//==================================================
// END PART-1
//==================================================
