//==================================================
// SH GLOBAL TECHNOLOGY
// REPORT MANAGEMENT SYSTEM
// reports.js
// PART-1
// Firebase Import + HTML Elements + Initial Load
//==================================================

import { db } from "../js/firebase.js";

import {

collection,
getDocs,
query,
orderBy

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


//==================================================
// HTML ELEMENTS
//==================================================

const fromDate =
document.getElementById("fromDate");

const toDate =
document.getElementById("toDate");

const reportType =
document.getElementById("reportType");

const loadReport =
document.getElementById("loadReport");

const printReport =
document.getElementById("printReport");

const exportPDF =
document.getElementById("exportPDF");

const exportCSV =
document.getElementById("exportCSV");

const reportTable =
document.getElementById("reportTable");

const totalRecords =
document.getElementById("totalRecords");

const totalAmount =
document.getElementById("totalAmount");


//==================================================
// AUTO DATE
//==================================================

const today = new Date();

const firstDay =

new Date(

today.getFullYear(),

today.getMonth(),

1

);

if(fromDate){

fromDate.value =
firstDay.toISOString().split("T")[0];

}

if(toDate){

toDate.value =
today.toISOString().split("T")[0];

}


//==================================================
// CLEAR REPORT
//==================================================

function clearReport(){

if(reportTable){

reportTable.innerHTML = "";

}

if(totalRecords){

totalRecords.innerText = "0";

}

if(totalAmount){

totalAmount.innerText = "0.00";

}

}


//==================================================
// INITIAL LOAD
//==================================================

window.addEventListener(

"DOMContentLoaded",

()=>{

clearReport();

console.log(

"✅ SHGT Reports Part-1 Loaded"

);

}

);


//==================================================
// END PART-1
//==================================================
