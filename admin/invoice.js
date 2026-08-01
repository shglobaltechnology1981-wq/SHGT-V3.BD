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
    getDocs,
    deleteDoc,
    doc
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
// invoice.js Part-7
// Load Saved Invoice History
//==================================================



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
// invoice.js Part-10
// Live Product Preview
//==================================================

function updatePreviewItems(){

    const previewItems =
    document.getElementById("previewItems");

    if(!previewItems){
        return;
    }

    previewItems.innerHTML = "";

    const itemNames =
    document.querySelectorAll(".itemName");

    const itemQty =
    document.querySelectorAll(".itemQty");

    const itemPrice =
    document.querySelectorAll(".itemPrice");

    const itemTotal =
    document.querySelectorAll(".itemTotal");

    for(let i=0;i<itemNames.length;i++){

        previewItems.innerHTML += `

        <tr>

            <td>
            ${itemNames[i].value || ""}
            </td>

            <td>
            ${itemQty[i].value || "0"}
            </td>

            <td>
            ${itemPrice[i].value || "0"}
            </td>

            <td>
            ${itemTotal[i].value || "0"}
            </td>

        </tr>

        `;

    }

}


//==================================================
// AUTO REFRESH PREVIEW
//==================================================

setInterval(()=>{

    updatePreviewItems();

},500);

//==================================================
// END PART-10
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-11
// Auto Invoice Number + Date
//==================================================


//==================================================
// GENERATE INVOICE NUMBER
//==================================================

function generateInvoiceNumber() {

    const invoiceInput =
    document.getElementById("invoiceNumber");

    if (!invoiceInput) return;

    const now = new Date();

    const invoiceNo =
        "INV-" +
        now.getFullYear() +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0") +
        "-" +
        Math.floor(Math.random() * 9000 + 1000);

    invoiceInput.value = invoiceNo;

    const preview =
    document.getElementById("previewInvoiceNo");

    if (preview) {

        preview.innerText = invoiceNo;

    }

}


//==================================================
// TODAY DATE
//==================================================

function setInvoiceDate() {

    const dateInput =
    document.getElementById("invoiceDate");

    if (!dateInput) return;

    const today = new Date();

    const dateText =
        today.toLocaleDateString("en-GB");

    dateInput.value = dateText;

    const preview =
    document.getElementById("previewDate");

    if (preview) {

        preview.innerText = dateText;

    }

}


//==================================================
// RUN
//==================================================

window.addEventListener("load", () => {

    generateInvoiceNumber();

    setInvoiceDate();

});


//==================================================
// END PART-11
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-12
// Add Unlimited Invoice Items
//==================================================




//==================================================
// END PART-12
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-13
// Auto Total + Grand Total
//==================================================


//==================================================
// CALCULATE INVOICE
//==================================================

function calculateInvoice(){

    const qtyList =
    document.querySelectorAll(".itemQty");

    const priceList =
    document.querySelectorAll(".itemPrice");

    const totalList =
    document.querySelectorAll(".itemTotal");

    let grandTotal = 0;

    for(let i=0;i<qtyList.length;i++){

        const qty =
        Number(qtyList[i].value) || 0;

        const price =
        Number(priceList[i].value) || 0;

        const total =
        qty * price;

        totalList[i].value = total;

        grandTotal += total;

    }

    const grand =
    document.getElementById("grandTotal");

    if(grand){

        grand.innerText = grandTotal;

    }

    const preview =
    document.getElementById("previewTotal");

    if(preview){

        preview.innerText = grandTotal;

    }

}


//==================================================
// LIVE CALCULATION
//==================================================

document.addEventListener(
"input",
(e)=>{

    if(

        e.target.classList.contains("itemQty") ||

        e.target.classList.contains("itemPrice")

    ){

        calculateInvoice();

    }

});


//==================================================
// FIRST LOAD
//==================================================

calculateInvoice();


//==================================================
// END PART-13
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-14
// Live Invoice Preview
//==================================================


//==================================================
// UPDATE PREVIEW
//==================================================

function updateInvoicePreview(){

    const customer =
    document.getElementById("customerName");

    const company =
    document.getElementById("companyName");

    const phone =
    document.getElementById("customerPhone");

    const previewCustomer =
    document.getElementById("previewCustomer");

    const previewCompany =
    document.getElementById("previewCompany");

    const previewPhone =
    document.getElementById("previewPhone");

    if(customer && previewCustomer){

        previewCustomer.innerText =
        customer.value;

    }

    if(company && previewCompany){

        previewCompany.innerText =
        company.value;

    }

    if(phone && previewPhone){

        previewPhone.innerText =
        phone.value;

    }


    const previewItems =
    document.getElementById("previewItems");

    if(previewItems){

        previewItems.innerHTML = "";

        const names =
        document.querySelectorAll(".itemName");

        const qtys =
        document.querySelectorAll(".itemQty");

        const prices =
        document.querySelectorAll(".itemPrice");

        const totals =
        document.querySelectorAll(".itemTotal");

        for(let i=0;i<names.length;i++){

            previewItems.innerHTML += `

            <tr>

                <td>${names[i].value}</td>

                <td>${qtys[i].value}</td>

                <td>${prices[i].value}</td>

                <td>${totals[i].value}</td>

            </tr>

            `;

        }

    }

}


//==================================================
// LIVE UPDATE
//==================================================

document.addEventListener("input",()=>{

    updateInvoicePreview();

});


//==================================================
// FIRST LOAD
//==================================================

updateInvoicePreview();


//==================================================
// END PART-14
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-15
// Save Invoice To Firestore
//==================================================


//==================================================
// SAVE INVOICE
//==================================================


if(saveInvoiceBtn){

saveInvoiceBtn.addEventListener(
"click",
async()=>{

try{

const items = [];

document.querySelectorAll(
"#invoiceItems tr"
).forEach((row)=>{

items.push({

name:
row.querySelector(".itemName")?.value || "",

brand:
row.querySelector(".itemBrand")?.value || "",

qty:
Number(
row.querySelector(".itemQty")?.value
) || 0,

price:
Number(
row.querySelector(".itemPrice")?.value
) || 0,

total:
Number(
row.querySelector(".itemTotal")?.value
) || 0

});

});


await addDoc(

collection(db,"invoice"),

{

invoiceNo:
document.getElementById(
"invoiceNumber"
).value,

date:
document.getElementById(
"invoiceDate"
).value,

customer:
document.getElementById(
"customerName"
).value,

company:
document.getElementById(
"companyName"
).value,

phone:
document.getElementById(
"customerPhone"
).value,

items:items,

grandTotal:
Number(
document.getElementById(
"grandTotal"
).innerText
) || 0,

createdAt:
new Date()

}

);


alert(
"✅ Invoice Saved Successfully"
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
// END PART-15
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-16
// Print Invoice
//==================================================


//==================================================
// PRINT BUTTON
//==================================================

const printBtn =
document.getElementById(
"printInvoiceBtn"
);


if(printBtn){

printBtn.addEventListener(
"click",
()=>{

const preview =
document.getElementById(
"invoicePreview"
);

if(!preview){

alert(
"Invoice Preview Not Found"
);

return;

}

const printWindow =
window.open(
"",
"",
"width=900,height=700"
);

printWindow.document.write(`

<html>

<head>

<title>

SHGT Invoice

</title>

<style>

body{

font-family:Arial,sans-serif;

padding:30px;

color:#222;

}

h2{

text-align:center;

margin-bottom:5px;

}

p{

margin:5px 0;

}

table{

width:100%;

border-collapse:collapse;

margin-top:15px;

}

table,th,td{

border:1px solid #000;

}

th,td{

padding:8px;

text-align:left;

}

hr{

margin:15px 0;

}

</style>

</head>

<body>

${preview.innerHTML}

</body>

</html>

`);

printWindow.document.close();

printWindow.focus();

printWindow.print();

printWindow.close();

});

}


//==================================================
// END PART-16
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-17
// Invoice History
//==================================================


//==================================================
// INVOICE HISTORY ELEMENT
//==================================================

const invoiceHistoryTable =
document.getElementById(
"invoiceHistory"
);


//==================================================
// LOAD INVOICE HISTORY
//==================================================

async function loadInvoiceHistory(){

    if(!invoiceHistoryTable){
        return;
    }


    try{


        const snapshot =
        await getDocs(
            collection(db,"invoice")
        );


        invoiceHistoryTable.innerHTML = "";


        snapshot.forEach((docItem)=>{


            const data =
            docItem.data();


            invoiceHistoryTable.innerHTML += `

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
// AUTO LOAD
//==================================================

window.addEventListener(
"load",
()=>{

    loadInvoiceHistory();

});



//==================================================
// END PART-17
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN INVOICE SYSTEM
// invoice.js Part-18
// Invoice Search + Edit + Delete + Final
//==================================================


//==================================================
// LOAD MANAGE INVOICE LIST
//==================================================

const invoiceManageTable =
document.getElementById(
"invoiceManageTable"
);


async function loadManageInvoices(){

    if(!invoiceManageTable){
        return;
    }


    try{


        const snapshot =
        await getDocs(
            collection(db,"invoice")
        );


        invoiceManageTable.innerHTML = "";


        snapshot.forEach((item)=>{


            const data =
            item.data();


            invoiceManageTable.innerHTML += `

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


            <td>


            <button
            class="deleteInvoiceBtn"
            data-id="${item.id}">

            Delete

            </button>


            </td>


            </tr>

            `;


        });



    }

    catch(error){


        console.error(
        "Invoice List Error:",
        error
        );


    }


}



//==================================================
// DELETE INVOICE
//==================================================


document.addEventListener(
"click",
async(e)=>{


if(
e.target.classList.contains(
"deleteInvoiceBtn"
)
){


const id =
e.target.dataset.id;


const confirmDelete =
confirm(
"Delete this invoice?"
);



if(!confirmDelete){

return;

}



try{


await deleteDoc(

doc(
db,
"invoice",
id
)

);



alert(
"✅ Invoice Deleted"
);



loadManageInvoices();



}


catch(error){


console.error(
"Delete Invoice Error:",
error
);


alert(
"❌ Delete Failed"
);


}



}


});




//==================================================
// SEARCH INVOICE
//==================================================


const searchInvoice =
document.getElementById(
"searchInvoice"
);



if(searchInvoice){


searchInvoice.addEventListener(
"keyup",
()=>{


const keyword =
searchInvoice.value.toLowerCase();



const rows =
document.querySelectorAll(
"#invoiceManageTable tr"
);



rows.forEach((row)=>{


const text =
row.innerText.toLowerCase();



if(
text.includes(keyword)
){


row.style.display="";


}

else{


row.style.display="none";


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


loadManageInvoices();


});



//==================================================
// AUTO REFRESH
//==================================================


setInterval(
()=>{

loadManageInvoices();

},
60000
);



//==================================================
// FINAL READY
//==================================================


console.log(
"SHGT Invoice System Final Loaded"
);


//==================================================
// END PART-18
//==================================================

//==================================================
// END OF invoice.js
//==================================================
  
