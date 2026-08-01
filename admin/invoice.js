//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-1
// Firebase + HTML Elements
//==================================================

import { db } from "../js/firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


//==================================================
// HTML ELEMENTS
//==================================================

const customerName =
document.getElementById("customerName");

const companyName =
document.getElementById("companyName");

const customerPhone =
document.getElementById("customerPhone");

const invoiceNumber =
document.getElementById("invoiceNumber");

const invoiceDate =
document.getElementById("invoiceDate");

const invoiceItems =
document.getElementById("invoiceItems");

const grandTotal =
document.getElementById("grandTotal");

const saveInvoiceBtn =
document.getElementById("saveInvoiceBtn");

const addInvoiceItemBtn =
document.getElementById("addInvoiceItem");

const printInvoiceBtn =
document.getElementById("printInvoiceBtn");


//==================================================
// START SYSTEM
//==================================================

console.log("================================");
console.log("SHGT Invoice System Started");
console.log("Firebase Connected");
console.log("================================");


//==================================================
// END PART-1
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-2
// Add Item + Total Calculation
//==================================================


//==================================================
// ADD NEW ITEM
//==================================================

if(addInvoiceItemBtn){

addInvoiceItemBtn.addEventListener("click",()=>{

const row=document.createElement("tr");

row.innerHTML=`

<td>
<input
type="text"
class="itemName"
placeholder="Product Name">
</td>

<td>
<input
type="text"
class="itemBrand"
placeholder="Brand">
</td>

<td>
<input
type="number"
class="itemQty"
value="1"
min="1">
</td>

<td>
<input
type="number"
class="itemPrice"
value="0"
min="0">
</td>

<td>
<input
type="number"
class="itemTotal"
value="0"
readonly>
</td>

`;

invoiceItems.appendChild(row);

});

}


//==================================================
// CALCULATE GRAND TOTAL
//==================================================

function calculateInvoice(){

let total=0;

const rows=document.querySelectorAll("#invoiceItems tr");

rows.forEach((row)=>{

const qty=row.querySelector(".itemQty");
const price=row.querySelector(".itemPrice");
const itemTotal=row.querySelector(".itemTotal");

const amount=
(Number(qty.value)||0)*
(Number(price.value)||0);

itemTotal.value=amount;

total+=amount;

});

grandTotal.innerText=total;

}


//==================================================
// LIVE CALCULATION
//==================================================

document.addEventListener("input",(e)=>{

if(
e.target.classList.contains("itemQty")||
e.target.classList.contains("itemPrice")
){

calculateInvoice();

}

});


//==================================================
// END PART-2
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-3
// Invoice Number + Date + Live Preview
//==================================================


//==================================================
// GENERATE INVOICE NUMBER
//==================================================

function generateInvoiceNumber(){

const now=new Date();

const number=
"INV-"+
now.getFullYear()+
String(now.getMonth()+1).padStart(2,"0")+
String(now.getDate()).padStart(2,"0")+
"-"+
Math.floor(Math.random()*9000+1000);

if(invoiceNumber){
invoiceNumber.value=number;
}

if(invoiceDate){
invoiceDate.value=now.toLocaleDateString("en-GB");
}

}

generateInvoiceNumber();


//==================================================
// UPDATE PREVIEW
//==================================================

function updateInvoicePreview(){

const previewInvoiceNo=
document.getElementById("previewInvoiceNo");

const previewDate=
document.getElementById("previewDate");

const previewCustomer=
document.getElementById("previewCustomer");

const previewCompany=
document.getElementById("previewCompany");

const previewPhone=
document.getElementById("previewPhone");

const previewItems=
document.getElementById("previewItems");

const previewTotal=
document.getElementById("previewTotal");


if(previewInvoiceNo){
previewInvoiceNo.innerText=invoiceNumber.value;
}

if(previewDate){
previewDate.innerText=invoiceDate.value;
}

if(previewCustomer){
previewCustomer.innerText=customerName.value;
}

if(previewCompany){
previewCompany.innerText=companyName.value;
}

if(previewPhone){
previewPhone.innerText=customerPhone.value;
}

if(previewItems){

previewItems.innerHTML="";

const rows=document.querySelectorAll("#invoiceItems tr");

rows.forEach((row)=>{

const name=row.querySelector(".itemName").value;
const qty=row.querySelector(".itemQty").value;
const price=row.querySelector(".itemPrice").value;
const total=row.querySelector(".itemTotal").value;

previewItems.innerHTML+=`

<tr>

<td>${name}</td>

<td>${qty}</td>

<td>${price}</td>

<td>${total}</td>

</tr>

`;

});

}

if(previewTotal){
previewTotal.innerText=grandTotal.innerText;
}

}


//==================================================
// LIVE UPDATE
//==================================================

document.addEventListener("input",()=>{

updateInvoicePreview();

});

updateInvoicePreview();


//==================================================
// END PART-3
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-4
// Save Invoice To Firestore
//==================================================


//==================================================
// SAVE INVOICE
//==================================================

if(saveInvoiceBtn){

saveInvoiceBtn.addEventListener("click",async()=>{

try{

const items=[];

document.querySelectorAll("#invoiceItems tr").forEach((row)=>{

items.push({

name:row.querySelector(".itemName").value,

brand:row.querySelector(".itemBrand").value,

qty:Number(row.querySelector(".itemQty").value||0),

price:Number(row.querySelector(".itemPrice").value||0),

total:Number(row.querySelector(".itemTotal").value||0)

});

});


await addDoc(

collection(db,"invoice"),

{

invoiceNo:invoiceNumber.value,

date:invoiceDate.value,

customer:customerName.value,

company:companyName.value,

phone:customerPhone.value,

items:items,

grandTotal:Number(grandTotal.innerText),

createdAt:new Date()

}

);


alert("✅ Invoice Saved Successfully");

}
catch(error){

console.error(error);

alert("❌ Invoice Save Failed");

}

});

}


//==================================================
// END PART-4
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-5
// Invoice History
//==================================================


//==================================================
// HISTORY TABLE
//==================================================

const invoiceHistory =
document.getElementById("invoiceHistory");


//==================================================
// LOAD HISTORY
//==================================================

async function loadInvoiceHistory(){

if(!invoiceHistory) return;

try{

const snapshot =
await getDocs(collection(db,"invoice"));

invoiceHistory.innerHTML = "";

snapshot.forEach((docItem)=>{

const data = docItem.data();

invoiceHistory.innerHTML += `

<tr>

<td>${data.invoiceNo || ""}</td>

<td>${data.date || ""}</td>

<td>${data.customer || ""}</td>

<td>${data.company || ""}</td>

<td>${data.grandTotal || 0}</td>

</tr>

`;

});

}
catch(error){

console.error("History Error:",error);

}

}


//==================================================
// AUTO LOAD
//==================================================

window.addEventListener("load",()=>{

loadInvoiceHistory();

});


//==================================================
// END PART-5
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-6
// Print Invoice + System Ready
//==================================================


//==================================================
// PRINT INVOICE
//==================================================

if(printInvoiceBtn){

printInvoiceBtn.addEventListener("click",()=>{

updateInvoicePreview();

window.print();

});

}


//==================================================
// RELOAD HISTORY AFTER SAVE
//==================================================

if(saveInvoiceBtn){

saveInvoiceBtn.addEventListener("click",()=>{

setTimeout(()=>{

loadInvoiceHistory();

generateInvoiceNumber();

updateInvoicePreview();

},1000);

});

}


//==================================================
// SYSTEM READY
//==================================================

window.addEventListener("load",()=>{

generateInvoiceNumber();

calculateInvoice();

updateInvoicePreview();

console.log("================================");
console.log("SHGT Invoice System Ready");
console.log("================================");

});


//==================================================
// END PART-6
//==================================================
