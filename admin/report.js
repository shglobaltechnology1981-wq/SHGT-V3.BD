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

//==================================================
// SH GLOBAL TECHNOLOGY
// REPORT MANAGEMENT SYSTEM
// reports.js
// PART-2
// Invoice Report + Sales Summary
//==================================================


//==================================================
// LOAD INVOICE REPORT
//==================================================

async function loadInvoiceReport(){

try{

clearReport();

const q = query(

collection(db,"invoice"),

orderBy("createdAt","desc")

);

const snapshot =
await getDocs(q);

let count = 0;
let grandTotal = 0;

snapshot.forEach(docItem=>{

const data = docItem.data();

const amount = Number(

data.amount ||

data.total ||

data.grandTotal ||

0

);

count++;

grandTotal += amount;

if(reportTable){

reportTable.innerHTML += `

<tr>

<td>${count}</td>

<td>${data.invoiceNo || "-"}</td>

<td>${data.date || "-"}</td>

<td>${data.customer || "-"}</td>

<td>${data.company || "-"}</td>

<td>${amount.toFixed(2)}</td>

<td>${data.status || "Paid"}</td>

</tr>

`;

}

});

if(totalRecords){

totalRecords.innerText = count;

}

if(totalAmount){

totalAmount.innerText = grandTotal.toFixed(2);

}

console.log("✅ Invoice Report Loaded");

}

catch(error){

console.error(

"Invoice Report Error:",

error

);

}

}


//==================================================
// LOAD REPORT BUTTON
//==================================================

if(loadReport){

loadReport.addEventListener(

"click",

()=>{

if(reportType.value==="invoice"){

loadInvoiceReport();

}

}

);

}


//==================================================
// END PART-2
//==================================================
