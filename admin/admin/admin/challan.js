//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-1
// Firebase + Elements + Auto Challan No
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
addDoc,
getDocs,
deleteDoc,
doc

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




// Challan Info

const challanNo =
document.getElementById("challanNo");


const challanDate =
document.getElementById("challanDate");


const invoiceRef =
document.getElementById("invoiceRef");




// Product

const challanBody =
document.getElementById("challanBody");


const addChallanItem =
document.getElementById("addChallanItem");




// Buttons

const saveChallan =
document.getElementById("saveChallan");


const printChallan =
document.getElementById("printChallan");


const downloadChallanPDF =
document.getElementById("downloadChallanPDF");


const clearChallan =
document.getElementById("clearChallan");




// History

const challanHistory =
document.getElementById("challanHistory");


const searchChallan =
document.getElementById("searchChallan");





//==================================================
// AUTO DATE
//==================================================


function generateDate(){


const today = new Date();



challanDate.value =

today.toLocaleDateString("en-GB");



}





//==================================================
// AUTO CHALLAN NUMBER
// FORMAT:
// DC-20260803-1234
//==================================================


function generateChallanNumber(){


const now = new Date();



const year =

now.getFullYear();



const month =

String(now.getMonth()+1)
.padStart(2,"0");



const day =

String(now.getDate())
.padStart(2,"0");



const random =

Math.floor(

1000 +

Math.random()*9000

);




challanNo.value =

"DC-" +

year +

month +

day +

"-" +

random;



}





//==================================================
// INITIAL LOAD
//==================================================


generateDate();


generateChallanNumber();




//==================================================
// READY
//==================================================


console.log(

"SHGT Challan System Part-1 Loaded"

);


//==================================================
// END PART-1
//==================================================
