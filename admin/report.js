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

//==================================================
// SH GLOBAL TECHNOLOGY
// REPORT MANAGEMENT SYSTEM
// reports.js
// PART-3
// Challan Report + Delivery Summary
//==================================================


//==================================================
// LOAD CHALLAN REPORT
//==================================================

async function loadChallanReport(){

try{

clearReport();

const q = query(

collection(db,"challan"),

orderBy("createdAt","desc")

);

const snapshot =
await getDocs(q);

let count = 0;

let totalQty = 0;

snapshot.forEach(docItem=>{

const data = docItem.data();

let qty = 0;

if(Array.isArray(data.items)){

data.items.forEach(item=>{

qty += Number(item.qty)||0;

});

}

count++;

totalQty += qty;

if(reportTable){

reportTable.innerHTML += `

<tr>

<td>${count}</td>

<td>${data.challanNo||"-"}</td>

<td>${data.date||"-"}</td>

<td>${data.customer||"-"}</td>

<td>${data.company||"-"}</td>

<td>${qty}</td>

<td>${data.status||"Delivered"}</td>

</tr>

`;

}

});

if(totalRecords){

totalRecords.innerText = count;

}

if(totalAmount){

totalAmount.innerText = totalQty;

}

console.log("✅ Challan Report Loaded");

}

catch(error){

console.error(

"Challan Report Error:",

error

);

}

}



//==================================================
// REPORT TYPE
//==================================================

if(loadReport){

loadReport.addEventListener(

"click",

()=>{

switch(reportType.value){

case "invoice":

loadInvoiceReport();

break;

case "challan":

loadChallanReport();

break;

}

}

);

}


//==================================================
// END PART-3
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// REPORT MANAGEMENT SYSTEM
// reports.js
// PART-4
// Stock Report + Low Stock Report
//==================================================


//==================================================
// LOAD STOCK REPORT
//==================================================

async function loadStockReport(){

try{

clearReport();

const q = query(

collection(db,"stock"),

orderBy("productName","asc")

);

const snapshot =
await getDocs(q);

let totalProduct = 0;

let totalStockQty = 0;

let lowStockCount = 0;

snapshot.forEach(docItem=>{

const data = docItem.data();

const qty =
Number(data.quantity)||0;

totalProduct++;

totalStockQty += qty;

let status = "Available";

if(qty<=5){

status = "⚠ Low Stock";

lowStockCount++;

}

if(reportTable){

reportTable.innerHTML += `

<tr>

<td>${totalProduct}</td>

<td>${data.productName||"-"}</td>

<td>${data.brand||"-"}</td>

<td>${data.category||"-"}</td>

<td>${qty}</td>

<td>${status}</td>

</tr>

`;

}

});

if(totalRecords){

totalRecords.innerText =
totalProduct;

}

if(totalAmount){

totalAmount.innerText =
totalStockQty;

}

console.log(

`✅ Stock Report Loaded | Low Stock : ${lowStockCount}`

);

}

catch(error){

console.error(

"Stock Report Error:",

error

);

}

}



//==================================================
// REPORT TYPE
//==================================================

if(loadReport){

loadReport.addEventListener(

"click",

()=>{

switch(reportType.value){

case "invoice":

loadInvoiceReport();

break;

case "challan":

loadChallanReport();

break;

case "stock":

loadStockReport();

break;

}

}

);

}


//==================================================
// END PART-4
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// REPORT MANAGEMENT SYSTEM
// reports.js
// PART-5
// Product Report + Spare Parts Report
//==================================================


//==================================================
// LOAD PRODUCT REPORT
//==================================================

async function loadProductReport(){

try{

clearReport();

const q = query(

collection(db,"products"),

orderBy("name","asc")

);

const snapshot =
await getDocs(q);

let count = 0;

snapshot.forEach(docItem=>{

const data = docItem.data();

count++;

if(reportTable){

reportTable.innerHTML += `

<tr>

<td>${count}</td>

<td>${data.name||data.productName||"-"}</td>

<td>${data.brand||"-"}</td>

<td>${data.category||"-"}</td>

<td>${data.stock||data.quantity||0}</td>

<td>${data.status||"Active"}</td>

</tr>

`;

}

});

if(totalRecords){

totalRecords.innerText = count;

}

if(totalAmount){

totalAmount.innerText = count;

}

console.log("✅ Product Report Loaded");

}

catch(error){

console.error(

"Product Report Error:",

error

);

}

}



//==================================================
// LOAD SPARE PARTS REPORT
//==================================================

async function loadSparePartsReport(){

try{

clearReport();

const q = query(

collection(db,"spare-parts"),

orderBy("name","asc")

);

const snapshot =
await getDocs(q);

let count = 0;

snapshot.forEach(docItem=>{

const data = docItem.data();

count++;

if(reportTable){

reportTable.innerHTML += `

<tr>

<td>${count}</td>

<td>${data.name||data.partName||"-"}</td>

<td>${data.brand||"-"}</td>

<td>${data.category||"-"}</td>

<td>${data.quantity||0}</td>

<td>${data.status||"Available"}</td>

</tr>

`;

}

});

if(totalRecords){

totalRecords.innerText = count;

}

if(totalAmount){

totalAmount.innerText = count;

}

console.log("✅ Spare Parts Report Loaded");

}

catch(error){

console.error(

"Spare Parts Report Error:",

error

);

}

}



//==================================================
// REPORT TYPE
//==================================================

if(loadReport){

loadReport.addEventListener(

"click",

()=>{

switch(reportType.value){

case "invoice":

loadInvoiceReport();

break;

case "challan":

loadChallanReport();

break;

case "stock":

loadStockReport();

break;

case "products":

loadProductReport();

break;

case "spare-parts":

loadSparePartsReport();

break;

}

}

);

}


//==================================================
// END PART-5
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// REPORT MANAGEMENT SYSTEM
// reports.js
// PART-6
// Daily Sales + Monthly Sales + Yearly Sales
//==================================================


//==================================================
// LOAD SALES REPORT
//==================================================

async function loadSalesReport(){

try{

clearReport();

const snapshot =
await getDocs(
collection(db,"invoice")
);

const today =
new Date();

const todayString =
today.toLocaleDateString();

const currentMonth =
today.getMonth();

const currentYear =
today.getFullYear();

let dailySales = 0;
let monthlySales = 0;
let yearlySales = 0;
let invoiceCount = 0;

snapshot.forEach(docItem=>{

const data =
docItem.data();

const amount =
Number(

data.amount ||

data.total ||

data.grandTotal ||

0

);

invoiceCount++;

const invoiceDate =

data.createdAt

?

new Date(

data.createdAt.seconds * 1000

)

:

new Date(data.date);

if(

invoiceDate.toLocaleDateString()

=== todayString

){

dailySales += amount;

}

if(

invoiceDate.getMonth()

=== currentMonth &&

invoiceDate.getFullYear()

=== currentYear

){

monthlySales += amount;

}

if(

invoiceDate.getFullYear()

=== currentYear

){

yearlySales += amount;

}

});



//==================================================
// REPORT TABLE
//==================================================

if(reportTable){

reportTable.innerHTML = `

<tr>

<td>1</td>

<td>Today's Sales</td>

<td>${dailySales.toFixed(2)} BDT</td>

</tr>

<tr>

<td>2</td>

<td>This Month Sales</td>

<td>${monthlySales.toFixed(2)} BDT</td>

</tr>

<tr>

<td>3</td>

<td>This Year Sales</td>

<td>${yearlySales.toFixed(2)} BDT</td>

</tr>

`;

}

if(totalRecords){

totalRecords.innerText =
invoiceCount;

}

if(totalAmount){

totalAmount.innerText =
yearlySales.toFixed(2);

}

console.log("✅ Sales Report Loaded");

}

catch(error){

console.error(

"Sales Report Error:",

error

);

}

}



//==================================================
// REPORT TYPE
//==================================================

if(loadReport){

loadReport.addEventListener(

"click",

()=>{

switch(reportType.value){

case "invoice":

loadInvoiceReport();

break;

case "challan":

loadChallanReport();

break;

case "stock":

loadStockReport();

break;

case "products":

loadProductReport();

break;

case "spare-parts":

loadSparePartsReport();

break;

case "sales":

loadSalesReport();

break;

}

}

);

}


//==================================================
// END PART-6
//==================================================


