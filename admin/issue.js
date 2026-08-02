//==================================================
// SH GLOBAL TECHNOLOGY
// ISSUE SALE MANAGEMENT SYSTEM
// admin/issue.js
// Part-1
// Firebase + Elements + Auto Issue No
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";





//==================================================
// HTML ELEMENT
//==================================================


// Dashboard

const totalIssue =
document.getElementById("totalIssue");


const todayIssue =
document.getElementById("todayIssue");


const totalAmount =
document.getElementById("totalAmount");




// Issue Info

const issueNo =
document.getElementById("issueNo");


const customerName =
document.getElementById("customerName");


const companyName =
document.getElementById("companyName");


const phoneNumber =
document.getElementById("phoneNumber");


const issueDate =
document.getElementById("issueDate");





// Product Table

const issueTable =
document.getElementById("issueTable");


const addIssueItem =
document.getElementById("addIssueItem");




// Buttons

const saveIssue =
document.getElementById("saveIssue");


const printIssue =
document.getElementById("printIssue");


const clearIssue =
document.getElementById("clearIssue");




// History

const issueHistory =
document.getElementById("issueHistory");


const searchIssue =
document.getElementById("searchIssue");






//==================================================
// GLOBAL VARIABLE
//==================================================


let issueItems = [];





//==================================================
// AUTO ISSUE NUMBER
// FORMAT:
// IS-20260803-1234
//==================================================


function generateIssueNumber(){


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




issueNo.value =


"IS-" +

year +

month +

day +

"-" +

random;



}





//==================================================
// AUTO DATE
//==================================================


function setIssueDate(){


const today =

new Date()

.toISOString()

.split("T")[0];



issueDate.value = today;



}





//==================================================
// INITIAL LOAD
//==================================================


generateIssueNumber();


setIssueDate();





console.log(

"✅ SHGT Issue System Part-1 Loaded"

);



//==================================================
// END PART-1
//==================================================
