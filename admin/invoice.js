//==================================================
// SH GLOBAL TECHNOLOGY
// Invoice V2
// invoice.js Part-1
// Firebase + HTML Elements
//==================================================


//==================================================
// FIREBASE IMPORT
//==================================================

import { db } from "../js/firebase.js";

import {
    collection,
    addDoc,
    getDocs
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


    if(invoiceNo){

        invoiceNo.value =
        "INV-" +
        now.getFullYear() +
        String(now.getMonth()+1).padStart(2,"0") +
        String(now.getDate()).padStart(2,"0") +
        "-" +
        Math.floor(Math.random()*9000+1000);

    }


    if(invoiceDate){

        invoiceDate.value =
        now.toLocaleDateString("en-GB");

    }

}


//==================================================
// INITIAL LOAD
//==================================================

createInvoiceNumber();


//==================================================
// READY MESSAGE
//==================================================


console.log(
"SHGT Invoice V2 Part-1 Loaded"
);


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
// ADD NEW ITEM ROW
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
        type="button"
        class="removeItem">
        ✖
        </button>
    </td>


    `;


    itemBody.appendChild(row);

}


//==================================================
// ADD BUTTON
//==================================================

if(addItemBtn){

addItemBtn.addEventListener(
"click",
()=>{

addNewRow();

});

}


//==================================================
// REMOVE ITEM ROW
//==================================================

document.addEventListener(
"click",
(e)=>{


if(
e.target.classList.contains("removeItem")
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



if(grandTotal){

grandTotal.innerText =
"Grand Total : " + total;

}


}


//==================================================
// LIVE TOTAL UPDATE
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
// FIRST ITEM ROW
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

if(saveInvoice){


saveInvoice.addEventListener(
"click",
async()=>{


try{


const items = [];


//------------------------------------------
// GET ALL ITEM DATA
//------------------------------------------

document
.querySelectorAll("#itemBody tr")
.forEach((row)=>{


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




//------------------------------------------
// GRAND TOTAL
//------------------------------------------

let total = 0;


items.forEach((item)=>{


total += item.total;


});




//------------------------------------------
// SAVE FIREBASE
//------------------------------------------

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


createdAt:
new Date()


}

);





alert(
"✅ Invoice Saved Successfully"
);




//------------------------------------------
// RESET AFTER SAVE
//------------------------------------------

createInvoiceNumber();


customerName.value = "";

companyName.value = "";

phoneNumber.value = "";


itemBody.innerHTML = "";


addNewRow();


calculateTotal();



}


catch(error){


console.error(
"Invoice Save Error:",
error
);


alert(
"❌ Invoice Save Failed"
);


}



});


}



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



try{


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

<td>
${data.invoiceNo || ""}
</td>


<td>
${data.date || ""}
</td>


<td>
${data.customer || ""}
</td>


<td>
${data.company || ""}
</td>


<td>
${data.grandTotal || 0}
</td>


</tr>


`;



});



}


catch(error){


console.error(
"Invoice History Error:",
error
);


}



}



//==================================================
// SEARCH INVOICE
//==================================================

if(searchInvoice){


searchInvoice.addEventListener(
"keyup",
()=>{


const keyword =
searchInvoice.value
.toLowerCase();




document
.querySelectorAll(
"#invoiceHistory tr"
)
.forEach((row)=>{


if(
row.innerText
.toLowerCase()
.includes(keyword)
){


row.style.display = "";


}

else{


row.style.display = "none";


}


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
// Print + Final Cleanup
//==================================================


//==================================================
// PRINT INVOICE
//==================================================

if(printInvoice){


printInvoice.addEventListener(
"click",
()=>{


window.print();


});


}



//==================================================
// CLEAR INVOICE FORM
//==================================================

function clearInvoice(){


if(customerName)
customerName.value = "";


if(companyName)
companyName.value = "";


if(phoneNumber)
phoneNumber.value = "";



if(itemBody){

itemBody.innerHTML = "";

addNewRow();

}



calculateTotal();


createInvoiceNumber();



}



//==================================================
// FINAL READY CHECK
//==================================================

console.log(
"✅ SHGT Invoice V2 Loaded Successfully"
);



//==================================================
// END PART-5
//==================================================
