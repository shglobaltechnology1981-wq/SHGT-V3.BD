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
document.getElementById("phoneNumber");


// Invoice

const invoiceNo =
document.getElementById("invoiceNo");

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


