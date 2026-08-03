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


//==================================================
// SH GLOBAL TECHNOLOGY
// QUOTATION SYSTEM
// quotation.js
// PART-2
// Add Item + Auto Total
//==================================================


//==================================================
// ELEMENTS
//==================================================

const addRow =
document.getElementById(
"addRow"
);

const quotationItems =
document.getElementById(
"quotationItems"
);



//==================================================
// ADD NEW ROW
//==================================================

if(addRow){

addRow.addEventListener(

"click",

()=>{

quotationItems.innerHTML += `

<tr>

<td>

<input
type="text"
class="product">

</td>

<td>

<input
type="number"
class="qty"
value="1"
min="1">

</td>

<td>

<input
type="number"
class="price"
value="0"
min="0">

</td>

<td>

<input
type="number"
class="total"
value="0"
readonly>

</td>

</tr>

`;

});

}



//==================================================
// AUTO CALCULATION
//==================================================

document.addEventListener(

"input",

(e)=>{

if(

e.target.classList.contains("qty") ||

e.target.classList.contains("price")

){

const row =
e.target.closest("tr");

const qty =

Number(
row.querySelector(".qty").value
) || 0;

const price =

Number(
row.querySelector(".price").value
) || 0;

const total =
qty * price;

row.querySelector(".total").value =
total.toFixed(2);

calculateGrandTotal();

}

}

);



//==================================================
// GRAND TOTAL
//==================================================

function calculateGrandTotal(){

let grand = 0;

document
.query
  
  
