//==================================================
// SH GLOBAL TECHNOLOGY
// invoice.js
// Part-1
// Firebase + Elements + Auto Invoice No
//==================================================

import { db } from "../js/firebase.js";

import {

    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


//==================================================
// HTML ELEMENTS
//==================================================

// Customer

const customerName =
document.getElementById("customerName");

const companyName =
document.getElementById("companyName");

const phoneNumber =
document.getElementById("customerPhone");

// Invoice

const invoiceNo =
document.getElementById("invoiceNumber");

const invoiceDate =
document.getElementById("invoiceDate");


// Product Table

const itemBody =
document.getElementById("itemBody");

const addItemBtn =
document.getElementById("addItemBtn");

const grandTotal =
document.getElementById("grandTotal");


// Buttons

const saveInvoice =
document.getElementById("saveInvoice");

const previewInvoice =
document.getElementById("previewInvoice");

const downloadPDF =
document.getElementById("downloadPDF");

const printInvoice =
document.getElementById("printInvoice");

const clearInvoice =
document.getElementById("clearInvoice");


// History

const searchInvoice =
document.getElementById("searchInvoice");

const invoiceHistory =
document.getElementById("invoiceHistory");


//==================================================
// GLOBAL VARIABLES
//==================================================

let invoiceItems = [];

let editingId = null;


//==================================================
// AUTO DATE
//==================================================

function generateDate(){

    const today = new Date();

    invoiceDate.value =
    today.toLocaleDateString(
        "en-GB"
    );

}


//==================================================
// AUTO INVOICE NUMBER
// FORMAT:
// SI-20260802-4587
//==================================================

function generateInvoiceNumber(){

    const now = new Date();

    const year =
    now.getFullYear();

    const month =
    String(
        now.getMonth()+1
    ).padStart(2,"0");

    const day =
    String(
        now.getDate()
    ).padStart(2,"0");

    const random =
    Math.floor(
        1000 +
        Math.random()*9000
    );

    invoiceNo.value =

    "SI-" +

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

generateInvoiceNumber();


//==================================================
// READY
//==================================================

console.log(

"SHGT Sales Invoice Ready"

);


//==================================================
// END PART-1
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// invoice.js
// Part-2
// Add Item + Total Calculation
//==================================================


//==================================================
// ADD NEW ROW
//==================================================

function addNewRow(){

    const row =
    document.createElement("tr");

    row.innerHTML = `

        <td class="slNo"></td>

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

    updateSerial();

    calculateGrandTotal();

}


//==================================================
// SERIAL NUMBER
//==================================================

function updateSerial(){

    const rows =
    itemBody.querySelectorAll("tr");

    rows.forEach((row,index)=>{

        row.querySelector(".slNo").innerText =
        index + 1;

    });

}


//==================================================
// CALCULATE TOTAL
//==================================================

function calculateGrandTotal(){

    let grand = 0;

    const rows =
    itemBody.querySelectorAll("tr");

    rows.forEach((row)=>{

        const qty =
        Number(
            row.querySelector(".itemQty").value
        ) || 0;

        const price =
        Number(
            row.querySelector(".itemPrice").value
        ) || 0;

        const total =
        qty * price;

        row.querySelector(".itemTotal").value =
        total.toFixed(2);

        grand += total;

    });

    grandTotal.innerText =
    grand.toFixed(2);

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

            calculateGrandTotal();

        }

    }

);


//==================================================
// REMOVE ROW
//==================================================

document.addEventListener(

    "click",

    (e)=>{

        if(

            e.target.classList.contains("removeItem")

        ){

            e.target
            .closest("tr")
            .remove();

            updateSerial();

            calculateGrandTotal();

        }

    }

);


//==================================================
// ADD BUTTON
//==================================================

addItemBtn.addEventListener(

    "click",

    addNewRow

);


//==================================================
// FIRST ROW
//==================================================

addNewRow();


//==================================================
// END PART-2
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// invoice.js
// Part-3A
// Print + Download PDF
//==================================================


//==================================================
// PRINT INVOICE
//==================================================

if(printInvoice){

    printInvoice.addEventListener(

        "click",

        ()=>{

            window.print();

        }

    );

}


//==================================================
// DOWNLOAD PDF
//==================================================

if(downloadPDF){

downloadPDF.addEventListener(

"click",

async()=>{

try{

const invoice =

document.querySelector(".invoice-paper");

if(!invoice){

alert("Invoice Layout Not Found");

return;

}

const canvas =

await html2canvas(

invoice,

{

scale:2,

useCORS:true,

backgroundColor:"#ffffff"

}

);

const image =

canvas.toDataURL("image/png");

const {

jsPDF

} = window.jspdf;

const pdf =

new jsPDF(

"P",

"mm",

"A4"

);

const pageWidth =

210;

const pageHeight =

297;

const imgWidth =

pageWidth;

const imgHeight =

(canvas.height * imgWidth)

/ canvas.width;

if(imgHeight <= pageHeight){

pdf.addImage(

image,

"PNG",

0,

0,

imgWidth,

imgHeight

);

}else{

let heightLeft =

imgHeight;

let position = 0;

pdf.addImage(

image,

"PNG",

0,

position,

imgWidth,

imgHeight

);

heightLeft -= pageHeight;

while(heightLeft > 0){

position =

heightLeft - imgHeight;

pdf.addPage();

pdf.addImage(

image,

"PNG",

0,

position,

imgWidth,

imgHeight

);

heightLeft -= pageHeight;

}

}

pdf.save(

invoiceNo.value + ".pdf"

);

}

catch(error){

console.error(error);

alert(

"PDF Download Failed"

);

}

}

);

}


//==================================================
// READY
//==================================================

console.log(

"Print & PDF Ready"

);


//==================================================
// END PART-3A
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// invoice.js
// Part-3B
// Clear Form + Reset
//==================================================


//==================================================
// CLEAR ALL PRODUCT ROWS
//==================================================

function clearRows(){

    itemBody.innerHTML = "";

    addNewRow();

}


//==================================================
// RESET CUSTOMER INFORMATION
//==================================================

function resetCustomerInfo(){

    customerName.value = "";

    companyName.value = "";

    phoneNumber.value = "";

}


//==================================================
// RESET INVOICE
//==================================================

function resetInvoice(){

    resetCustomerInfo();

    clearRows();

    calculateGrandTotal();

    generateDate();

    generateInvoiceNumber();

    editingId = null;

}


//==================================================
// CLEAR BUTTON
//==================================================

if(clearInvoice){

    clearInvoice.addEventListener(

        "click",

        ()=>{

            const ok = confirm(
                "Clear this invoice?"
            );

            if(!ok) return;

            resetInvoice();

        }

    );

}


//==================================================
// AFTER SAVE RESET
//==================================================

function afterSave(){

    resetInvoice();

}


//==================================================
// PAGE LOAD
//==================================================

window.addEventListener(

    "load",

    ()=>{

        calculateGrandTotal();

    }

);


//==================================================
// READY
//==================================================

console.log(

    "Invoice Reset Ready"

);


//==================================================
// END PART-3B
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// invoice.js
// Part-4
// Save Invoice To Firebase
//==================================================


//==================================================
// COLLECT ITEMS
//==================================================

function collectInvoiceItems(){

    const items = [];

    const rows =
    itemBody.querySelectorAll("tr");


    rows.forEach((row)=>{

        const name =
        row.querySelector(".itemName").value.trim();


        const brand =
        row.querySelector(".itemBrand").value.trim();


        const qty =
        Number(
            row.querySelector(".itemQty").value
        ) || 0;


        const price =
        Number(
            row.querySelector(".itemPrice").value
        ) || 0;


        const total =
        Number(
            row.querySelector(".itemTotal").value
        ) || 0;



        if(name){

            items.push({

                product:name,

                brand:brand,

                qty:qty,

                price:price,

                total:total

            });

        }


    });


    return items;

}


//==================================================
// SAVE INVOICE
//==================================================

if(saveInvoice){


saveInvoice.addEventListener(

"click",

async()=>{


try{


const items =

collectInvoiceItems();



if(items.length === 0){

alert(

"Please add product item"

);

return;

}



let total = 0;


items.forEach((item)=>{

total += item.total;

});



// Firebase Save

await addDoc(

collection(

db,

"invoice"

),

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


items:

items,


grandTotal:

total,


createdAt:

new Date()



}

);



alert(

"✅ Invoice Saved Successfully"

);



afterSave();



if(typeof loadInvoiceHistory === "function"){

    loadInvoiceHistory();

}


}

catch(error){

    console.error(
        "Save Error:",
        error
    );

    alert(
        "❌ Invoice Save Failed"
    );

}


}

);


}
//==================================================
// END PART-4
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// invoice.js
// Part-5
// Invoice History + Search
//==================================================


//==================================================
// LOAD INVOICE HISTORY
//==================================================

async function loadInvoiceHistory(){

    if(!invoiceHistory) return;


    try{


        invoiceHistory.innerHTML = "";


        const snapshot =

        await getDocs(

            collection(

                db,

                "invoice"

            )

        );



        if(snapshot.empty){


            invoiceHistory.innerHTML = `

            <tr>

            <td colspan="6">

            No Invoice Found

            </td>

            </tr>

            `;


            return;

        }



        snapshot.forEach((docItem)=>{


            const data =

            docItem.data();



            const id =

            docItem.id;



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

            ৳ ${data.grandTotal || 0}

            </td>


            <td>


            <button

            class="viewInvoiceBtn"

            data-id="${id}">

            👁 View

            </button>


            <button

            class="deleteInvoiceBtn"

            data-id="${id}">

            🗑 Delete

            </button>


            </td>


            </tr>


            `;


        });


    }


    catch(error){


        console.error(

            error

        );


        invoiceHistory.innerHTML = `

        <tr>

        <td colspan="6">

        Failed Loading Invoice

        </td>

        </tr>

        `;


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

searchInvoice.value.toLowerCase();



document

.querySelectorAll(

"#invoiceHistory tr"

)

.forEach((row)=>{


const text =

row.innerText.toLowerCase();



if(text.includes(keyword)){


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


loadInvoiceHistory();


});



//==================================================
// READY
//==================================================

console.log(

"Invoice History Ready"

);


//==================================================
// END PART-5
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// invoice.js
// Part-6
// Delete + View Invoice + Final Integration
//==================================================


//==================================================
// DELETE INVOICE
//==================================================

document.addEventListener(
"click",
async(e)=>{


if(e.target.classList.contains("deleteInvoiceBtn")){


const id = e.target.dataset.id;


const ok = confirm(
"Delete this invoice?"
);


if(!ok) return;


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


loadInvoiceHistory();


}

catch(error){


console.error(error);


alert(
"❌ Delete Failed"
);


}


}


});




//==================================================
// VIEW INVOICE
//==================================================

document.addEventListener(
"click",
async(e)=>{


if(e.target.classList.contains("viewInvoiceBtn")){


const id = e.target.dataset.id;


try{


const snapshot = await getDocs(
collection(
db,
"invoice"
)
);



snapshot.forEach((item)=>{


if(item.id === id){


const data = item.data();



invoiceNo.value =
data.invoiceNo || "";


invoiceDate.value =
data.date || "";


customerName.value =
data.customer || "";


companyName.value =
data.company || "";


phoneNumber.value =
data.phone || "";



itemBody.innerHTML = "";



(data.items || []).forEach((item)=>{


const row =
document.createElement("tr");


row.innerHTML = `

<td class="slNo"></td>

<td>
<input class="itemName" value="${item.product || ""}">
</td>

<td>
<input class="itemBrand" value="${item.brand || ""}">
</td>

<td>
<input class="itemQty" type="number" value="${item.qty || 1}">
</td>

<td>
<input class="itemPrice" type="number" value="${item.price || 0}">
</td>

<td>
<input class="itemTotal" value="${item.total || 0}" readonly>
</td>

<td>
<button class="removeItem">✖</button>
</td>

`;



itemBody.appendChild(row);



});



updateSerial();

calculateGrandTotal();



window.scrollTo({

top:0,

behavior:"smooth"

});


}


});


}


catch(error){


console.error(error);


alert(
"Invoice Load Failed"
);


}


}


});



//==================================================
// FINAL READY
//==================================================

console.log(
"SHGT Invoice System Loaded Successfully"
);


//==================================================
// END PART-6
//==================================================
