//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-1
// Firebase Connection
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


const saveInvoiceBtn =
document.getElementById("saveInvoiceBtn");


const customerName =
document.getElementById("customerName");


const companyName =
document.getElementById("companyName");


const customerPhone =
document.getElementById("customerPhone");


const invoiceItems =
document.getElementById("invoiceItems");


const grandTotal =
document.getElementById("grandTotal");



//==================================================
// START CHECK
//==================================================


console.log(
"================================"
);


console.log(
"SHGT INVOICE SYSTEM STARTED"
);


console.log(
"Firebase Connected"
);


console.log(
"================================"
);



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
// ADD INVOICE ITEM
//==================================================


const addInvoiceItem =
document.getElementById("addInvoiceItem");


if(addInvoiceItem){


addInvoiceItem.addEventListener(
"click",
()=>{


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
    value="1">

    </td>


    <td>

    <input
    type="number"
    class="itemPrice"
    placeholder="Price">

    </td>


    <td>

    <input
    type="number"
    class="itemTotal"
    readonly>

    </td>

    `;


    invoiceItems.appendChild(row);


});


}


//==================================================
// CALCULATE TOTAL
//==================================================


document.addEventListener(
"input",
()=>{


let total = 0;



const qtyInputs =
document.querySelectorAll(
".itemQty"
);



const priceInputs =
document.querySelectorAll(
".itemPrice"
);



const totalInputs =
document.querySelectorAll(
".itemTotal"
);



qtyInputs.forEach(
(qty,index)=>{


const amount =

Number(qty.value || 0) *

Number(priceInputs[index].value || 0);



totalInputs[index].value =
amount;



total += amount;



});



if(grandTotal){

grandTotal.innerText =
total;

}



});



//==================================================
// END PART-2
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-3
// Save Invoice + Firestore
//==================================================


//==================================================
// SAVE INVOICE
//==================================================


if(saveInvoiceBtn){


saveInvoiceBtn.addEventListener(
"click",
async()=>{


try{


let items = [];


const nameInputs =
document.querySelectorAll(
".itemName"
);


const brandInputs =
document.querySelectorAll(
".itemBrand"
);


const qtyInputs =
document.querySelectorAll(
".itemQty"
);


const priceInputs =
document.querySelectorAll(
".itemPrice"
);



for(let i=0; i<nameInputs.length; i++){


items.push({


name:
nameInputs[i].value,


brand:
brandInputs[i].value,


qty:
Number(qtyInputs[i].value || 0),


price:
Number(priceInputs[i].value || 0),


total:
Number(
qtyInputs[i].value || 0
)
*
Number(
priceInputs[i].value || 0
)


});


}





await addDoc(

collection(db,"invoice"),

{


customerName:
customerName.value,


companyName:
companyName.value,


phone:
customerPhone.value,


items:items,


total:
Number(
grandTotal.innerText
),


createdAt:
new Date()


}


);




alert(
"✅ Invoice Saved Successfully"
);




console.log(
"Invoice Saved"
);



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
// ADMIN INVOICE SYSTEM
// invoice.js Part-4
// Invoice Preview System
//==================================================


//==================================================
// PREVIEW ELEMENTS
//==================================================

const previewCustomer =
document.getElementById("previewCustomer");


const previewCompany =
document.getElementById("previewCompany");


const previewPhone =
document.getElementById("previewPhone");


const previewItems =
document.getElementById("previewItems");


const previewTotal =
document.getElementById("previewTotal");



//==================================================
// UPDATE INVOICE PREVIEW
//==================================================


function updateInvoicePreview(){


if(previewCustomer){

previewCustomer.innerText =
customerName.value;

}


if(previewCompany){

previewCompany.innerText =
companyName.value;

}


if(previewPhone){

previewPhone.innerText =
customerPhone.value;

}




if(previewItems){


previewItems.innerHTML = "";



const names =
document.querySelectorAll(
".itemName"
);


const qtys =
document.querySelectorAll(
".itemQty"
);


const prices =
document.querySelectorAll(
".itemPrice"
);



names.forEach(
(name,index)=>{


previewItems.innerHTML += `


<tr>

<td>
${name.value}
</td>


<td>
${qtys[index].value}
</td>


<td>
${prices[index].value}
</td>


<td>
${Number(qtys[index].value || 0)
*
Number(prices[index].value || 0)}
</td>


</tr>


`;



});


}




if(previewTotal){

previewTotal.innerText =
grandTotal.innerText;

}


}



//==================================================
// LIVE PREVIEW UPDATE
//==================================================


document.addEventListener(
"input",
()=>{

updateInvoicePreview();

});



//==================================================
// END PART-4
//==================================================
  //==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-5
// Load Products From Firestore
//==================================================


//==================================================
// PRODUCT COLLECTION
//==================================================


const productSelectArea =
document.getElementById(
"productSelectArea"
);



//==================================================
// LOAD PRODUCT LIST
//==================================================


async function loadInvoiceProducts(){


try{


const snapshot = await getDocs(

collection(db,"products")

);



if(productSelectArea){


productSelectArea.innerHTML = `

<option value="">

Select Product

</option>

`;



snapshot.forEach((item)=>{


const product =
item.data();



productSelectArea.innerHTML += `


<option

value="${item.id}"

data-name="${product.name || ''}"

data-brand="${product.brand || ''}"

data-price="${product.price || 0}">


${product.name || "No Name"}

-

${product.brand || ""}


</option>


`;



});


}



console.log(

"Invoice Products Loaded:",

snapshot.size

);



}



catch(error){


console.error(

"Invoice Product Load Error:",

error

);



}



}



//==================================================
// PRODUCT AUTO SELECT
//==================================================


if(productSelectArea){


productSelectArea.addEventListener(

"change",

()=>{


const option =
productSelectArea.options[
productSelectArea.selectedIndex
];



const name =
option.dataset.name || "";


const brand =
option.dataset.brand || "";


const price =
option.dataset.price || 0;



const nameInput =
document.querySelector(
".itemName"
);


const brandInput =
document.querySelector(
".itemBrand"
);


const priceInput =
document.querySelector(
".itemPrice"
);



if(nameInput){

nameInput.value =
name;

}



if(brandInput){

brandInput.value =
brand;

}



if(priceInput){

priceInput.value =
price;

}



});


}




//==================================================
// START LOAD
//==================================================

loadInvoiceProducts();



//==================================================
// END PART-5
//==================================================
  //==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-6
// Invoice Number + Date System
//==================================================


//==================================================
// GENERATE INVOICE NUMBER
//==================================================


const invoiceNumber =
document.getElementById(
"invoiceNumber"
);


const invoiceDate =
document.getElementById(
"invoiceDate"
);



function generateInvoiceNumber(){


const now =
new Date();


const number =

"SHGT-" +

now.getFullYear() +

("0"+(now.getMonth()+1))
.slice(-2)

+

("0"+now.getDate())
.slice(-2)

+

"-"

+

now.getTime();



if(invoiceNumber){

invoiceNumber.value =
number;

}


if(invoiceDate){

invoiceDate.value =
now.toLocaleDateString();

}


}




//==================================================
// RUN
//==================================================


generateInvoiceNumber();



//==================================================
// END PART-6
//==================================================
  //==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-7
// Load Saved Invoice History
//==================================================


//==================================================
// INVOICE HISTORY ELEMENT
//==================================================


const invoiceHistory =
document.getElementById(
"invoiceHistory"
);



//==================================================
// LOAD SAVED INVOICES
//==================================================


async function loadInvoiceHistory(){


try{


const snapshot = await getDocs(

collection(db,"invoice")

);




if(invoiceHistory){


invoiceHistory.innerHTML = "";



snapshot.forEach((item)=>{


const data =
item.data();



invoiceHistory.innerHTML += `


<div class="invoice-history-card">


<h3>

${data.companyName || "Customer"}

</h3>



<p>

Customer:

${data.customerName || ""}

</p>



<p>

Phone:

${data.phone || ""}

</p>



<p>

Total:

${data.total || 0}

</p>



<small>

Date:

${data.createdAt?.toDate
?
data.createdAt.toDate().toLocaleDateString()
:
""
}

</small>



</div>


`;



});



}



console.log(

"Invoice History Loaded:",

snapshot.size

);



}



catch(error){


console.error(

"Invoice History Error:",

error

);



}



}



//==================================================
// START LOAD HISTORY
//==================================================


loadInvoiceHistory();



//==================================================
// END PART-7
//==================================================
   //==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-8
// Final Print + Ready Check
//==================================================


//==================================================
// PRINT INVOICE
//==================================================


const printInvoiceBtn =
document.getElementById(
"printInvoiceBtn"
);



if(printInvoiceBtn){


printInvoiceBtn.addEventListener(
"click",
()=>{


window.print();


});


}




//==================================================
// CLEAR INVOICE FORM
//==================================================


const clearInvoiceBtn =
document.getElementById(
"clearInvoiceBtn"
);



if(clearInvoiceBtn){


clearInvoiceBtn.addEventListener(
"click",
()=>{


if(customerName){

customerName.value = "";

}


if(companyName){

companyName.value = "";

}


if(customerPhone){

customerPhone.value = "";

}


const inputs =
document.querySelectorAll(
"input"
);


inputs.forEach(
(input)=>{


if(
input.classList.contains("itemName") ||
input.classList.contains("itemBrand") ||
input.classList.contains("itemQty") ||
input.classList.contains("itemPrice") ||
input.classList.contains("itemTotal")
){


input.value = "";


}


});


if(grandTotal){

grandTotal.innerText = "0";

}



updateInvoicePreview();



generateInvoiceNumber();



});


}



//==================================================
// SYSTEM READY CHECK
//==================================================


window.addEventListener(
"load",
()=>{


console.log(
"================================"
);


console.log(
"SHGT INVOICE SYSTEM READY"
);


console.log(
"All Invoice Modules Loaded"
);


console.log(
"================================"
);


});



//==================================================
// END PART-8
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-9
// Invoice Preview Update
//==================================================

function updateInvoicePreview(){

    const invoiceNo =
    document.getElementById("invoiceNumber");

    const invoiceDate =
    document.getElementById("invoiceDate");

    const customerName =
    document.getElementById("customerName");

    const companyName =
    document.getElementById("companyName");

    const customerPhone =
    document.getElementById("customerPhone");

    if(document.getElementById("previewInvoiceNo")){
        document.getElementById("previewInvoiceNo").innerText =
        invoiceNo ? invoiceNo.value : "";
    }

    if(document.getElementById("previewDate")){
        document.getElementById("previewDate").innerText =
        invoiceDate ? invoiceDate.value : "";
    }

    if(document.getElementById("previewCustomer")){
        document.getElementById("previewCustomer").innerText =
        customerName ? customerName.value : "";
    }

    if(document.getElementById("previewCompany")){
        document.getElementById("previewCompany").innerText =
        companyName ? companyName.value : "";
    }

    if(document.getElementById("previewPhone")){
        document.getElementById("previewPhone").innerText =
        customerPhone ? customerPhone.value : "";
    }

    if(document.getElementById("previewTotal") && grandTotal){
        document.getElementById("previewTotal").innerText =
        grandTotal.innerText;
    }

}

setInterval(updateInvoicePreview,500);

//==================================================
// END OF invoice.js
//==================================================
  
