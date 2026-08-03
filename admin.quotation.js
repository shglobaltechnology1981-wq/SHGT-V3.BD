//==================================================
// SH GLOBAL TECHNOLOGY
// QUOTATION SYSTEM
// quotation.js
// PART-1
//==================================================

import { db } from "../js/firebase.js";

import {

collection,

addDoc,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


//==================================================
// ELEMENTS
//==================================================

const quotationForm =
document.getElementById("quotationForm");

const quotationNo =
document.getElementById("quotationNo");

const quotationDate =
document.getElementById("quotationDate");

const customerName =
document.getElementById("customerName");

const companyName =
document.getElementById("companyName");

const mobile =
document.getElementById("mobile");

const address =
document.getElementById("address");

const grandTotal =
document.getElementById("grandTotal");


//==================================================
// SAVE QUOTATION
//==================================================

if(quotationForm){

quotationForm.addEventListener(

"submit",

async(e)=>{

e.preventDefault();

try{

await addDoc(

collection(db,"quotation"),

{

quotationNo: quotationNo.value,

date: quotationDate.value,

customer: customerName.value,

company: companyName.value,

mobile: mobile.value,

address: address.value,

grandTotal: Number(grandTotal.innerText)||0,

createdAt: serverTimestamp()

}

);

alert("✅ Quotation Saved Successfully");

quotationForm.reset();

grandTotal.innerText="0.00";

}

catch(error){

console.error(error);

alert("❌ Save Failed");

}

}

);

}

//==================================================
// END PART-1
//==================================================


