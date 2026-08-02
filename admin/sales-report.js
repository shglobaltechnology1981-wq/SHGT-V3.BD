//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT MANAGEMENT SYSTEM
// admin/sales-report.js
// Part-1
// Firebase + Elements Setup
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
getDocs

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";




//==================================================
// DASHBOARD ELEMENT
//==================================================


const totalSales =

document.getElementById("totalSales");


const todaySales =

document.getElementById("todaySales");


const monthlySales =

document.getElementById("monthlySales");


const totalInvoice =

document.getElementById("totalInvoice");





//==================================================
// FILTER ELEMENT
//==================================================


const fromDate =

document.getElementById("fromDate");


const toDate =

document.getElementById("toDate");


const reportType =

document.getElementById("reportType");


const searchReport =

document.getElementById("searchReport");





//==================================================
// TABLE ELEMENT
//==================================================


const salesTable =

document.getElementById("salesTable");





//==================================================
// SEARCH
//==================================================


const searchSales =

document.getElementById("searchSales");





//==================================================
// BUTTON
//==================================================


const printReport =

document.getElementById("printReport");


const downloadReportPDF =

document.getElementById("downloadReportPDF");





//==================================================
// GLOBAL VARIABLE
//==================================================


let salesData = [];





//==================================================
// DATE DEFAULT
//==================================================


function setDefaultDate(){


const today =

new Date()

.toISOString()

.split("T")[0];



if(fromDate)

fromDate.value = today;



if(toDate)

toDate.value = today;



}





//==================================================
// INITIAL LOAD
//==================================================


setDefaultDate();





console.log(

"✅ SHGT Sales Report Part-1 Loaded"

);



//==================================================
// END PART-1
//==================================================
