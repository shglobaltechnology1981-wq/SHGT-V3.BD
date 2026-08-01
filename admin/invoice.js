//==================================================
// SH GLOBAL TECHNOLOGY
// Invoice V2
// invoice.js Part-1
// Firebase + Elements
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

const phoneNumber =
document.getElementById("phoneNumber");

const invoiceNo =
document.getElementById("invoiceNo");

const invoiceDate =
document.getElementById("invoiceDate");

const itemBody =
document.getElementById("itemBody");

const addItemBtn =
document.getElementById("addItemBtn");

const saveInvoice =
document.getElementById("saveInvoice");

const printInvoice =
document.getElementById("printInvoice");

const grandTotal =
document.getElementById("grandTotal");


//==================================================
// GENERATE INVOICE NUMBER
//==================================================

function createInvoiceNumber(){

    const now = new Date();

    invoiceNo.value =
    "INV-" +
    now.getFullYear() +
    String(now.getMonth()+1).padStart(2,"0") +
    String(now.getDate()).padStart(2,"0") +
    "-" +
    Math.floor(Math.random()*9000+1000);

    invoiceDate.value =
    now.toLocaleDateString("en-GB");

}

createInvoiceNumber();


//==================================================
// READY
//==================================================

console.log("SHGT Invoice V2 Ready");


//==================================================
// END PART-1
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// Invoice V2
// invoice.js Part-2
// Add Item + Auto Total
//==================================================


//==================================================
// ADD ITEM
//==================================================

function addNewRow(){

    const row =
    document.createElement("tr");

    row.innerHTML = `

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

    <td>

        <button
        class="removeItem">

        ✖

        </button>

    </td>

    `;

    itemBody.appendChild(row);

}


addItemBtn.addEventListener(
"click",
addNewRow
);


//==================================================
// REMOVE ITEM
//==================================================

document.addEventListener(
"click",
(e)=>{

if(
e.target.classList.contains(
"removeItem"
)
){

e.target.closest("tr").remove();

calculateTotal();

}

});


//==================================================
// CALCULATE TOTAL
//==================================================

function calculateTotal(){

let total = 0;

const rows =
document.querySelectorAll(
"#itemBody tr"
);

rows.forEach((row)=>{

const qty =
Number(
row.querySelector(".itemQty").value
) || 0;

const price =
Number(
row.querySelector(".itemPrice").value
) || 0;

const amount =
qty * price;

row.querySelector(".itemTotal").value =
amount;

total += amount;

});

grandTotal.innerText =
"Grand Total : " + total;

}


//==================================================
// LIVE UPDATE
//==================================================

document.addEventListener(
"input",
(e)=>{

if(

e.target.classList.contains("itemQty") ||

e.target.classList.contains("itemPrice")

){

calculateTotal();

}

});


//==================================================
// FIRST ROW
//==================================================

addNewRow();


//==================================================
// END PART-2
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// Invoice V2
// invoice.js Part-3
// Save Invoice To Firebase
//==================================================


//==================================================
// SAVE INVOICE
//==================================================

saveInvoice.addEventListener(
"click",
async()=>{

try{

const items=[];

document.querySelectorAll(
"#itemBody tr"
).forEach((row)=>{

items.push({

product:
row.querySelector(".itemName").value,

brand:
row.querySelector(".itemBrand").value,

qty:
Number(
row.querySelector(".itemQty").value
),

price:
Number(
row.querySelector(".itemPrice").value
),

total:
Number(
row.querySelector(".itemTotal").value
)

});

});


let total=0;

items.forEach((item)=>{

total+=item.total;

});


await addDoc(

collection(db,"invoice"),

{

invoiceNo:
invoiceNo.value,

date:
invoiceDate.value,

customer:
customerName.value,

company:
companyName.value,

phone:
phoneNumber.value,

items:items,

grandTotal:total,

createdAt:new Date()

}

);


alert(
"✅ Invoice Saved Successfully"
);


createInvoiceNumber();

customerName.value="";
companyName.value="";
phoneNumber.value="";

itemBody.innerHTML="";

addNewRow();

calculateTotal();

}

catch(error){

console.error(error);

alert(
"❌ Invoice Save Failed"
);

}

});


//==================================================
// END PART-3
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// Invoice V2
// invoice.js Part-4
// Invoice History + Search
//==================================================


//==================================================
// HTML ELEMENTS
//==================================================

const invoiceHistory =
document.getElementById("invoiceHistory");

const searchInvoice =
document.getElementById("searchInvoice");


//==================================================
// LOAD INVOICE HISTORY
//==================================================

async function loadInvoiceHistory(){

    if(!invoiceHistory) return;

    invoiceHistory.innerHTML = "";

    const snapshot =
    await getDocs(
        collection(db,"invoice")
    );

    snapshot.forEach((docItem)=>{

        const data =
        docItem.data();

        invoiceHistory.innerHTML += `

        <tr>

            <td>${data.invoiceNo}</td>

            <td>${data.date}</td>

            <td>${data.customer}</td>

            <td>${data.company}</td>

            <td>${data.grandTotal}</td>

        </tr>

        `;

    });

}


//==================================================
// SEARCH
//==================================================

if(searchInvoice){

searchInvoice.addEventListener(
"keyup",
()=>{

const keyword =
searchInvoice.value.toLowerCase();

document
.querySelectorAll("#invoiceHistory tr")
.forEach((row)=>{

row.style.display =
row.innerText
.toLowerCase()
.includes(keyword)
?
""
:
"none";

});

});

}


//==================================================
// AUTO LOAD
//==================================================

window.addEventListener(
"load",
()=>{

loadInvoiceHistory();

});


//==================================================
// END PART-4
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// Invoice V2
// invoice.js Part-5
// Print + Delete Row
//==================================================


//==================================================
// PRINT INVOICE
//==================================================

printInvoice.addEventListener(
"click",
()=>{

window.print();

});


//==================================================
// DELETE PRODUCT ROW
//==================================================

document.addEventListener(
"click",
(e)=>{

if(

e.target.classList.contains(
"removeItem"
)

){

const row =
e.target.closest("tr");

if(row){

row.remove();

calculateTotal();

}

}

});


//==================================================
// CLEAR FORM
//==================================================

function clearInvoice(){

customerName.value = "";

companyName.value = "";

phoneNumber.value = "";

itemBody.innerHTML = "";

addNewRow();

calculateTotal();

createInvoiceNumber();

}


//==================================================
// AFTER SAVE
//==================================================

saveInvoice.addEventListener(
"click",
()=>{

setTimeout(()=>{

clearInvoice();

loadInvoiceHistory();

},500);

});


//==================================================
// READY
//==================================================

console.log(
"SHGT Invoice V2 Loaded Successfully"
);


//==================================================
// END PART-5
//================================================== 
