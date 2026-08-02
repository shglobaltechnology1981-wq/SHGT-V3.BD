//==================================================
// SH GLOBAL TECHNOLOGY
// invoice.js
// Replace Final
// Part-1
// Firebase + Elements + Auto Invoice Setup
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc,
getDoc

}

from 
"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



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



// Invoice Info

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


const downloadPDF =
document.getElementById("downloadPDF");


const printInvoice =
document.getElementById("printInvoice");


const clearInvoice =
document.getElementById("clearInvoice");



// History

const invoiceHistory =
document.getElementById("invoiceHistory");


const searchInvoice =
document.getElementById("searchInvoice");




//==================================================
// GLOBAL VARIABLE
//==================================================


let editingId = null;



//==================================================
// DATE GENERATE
//==================================================


function generateDate(){


const date = new Date();


invoiceDate.value =

date.toLocaleDateString("en-GB");


}




//==================================================
// AUTO INVOICE NUMBER
//==================================================


function generateInvoiceNumber(){


const now = new Date();


const y =
now.getFullYear();


const m =
String(now.getMonth()+1)
.padStart(2,"0");


const d =
String(now.getDate())
.padStart(2,"0");


const random =
Math.floor(
1000 + Math.random()*9000
);



invoiceNo.value =

"SI-" +

y +

m +

d +

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

"SHGT Invoice Replace Final Part-1 Loaded"

);


//==================================================
// END PART-1
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// invoice.js
// Replace Final
// Part-2
// Add Item + Calculation
//==================================================



//==================================================
// ADD PRODUCT ROW
//==================================================


function addNewRow(){


const row = document.createElement("tr");



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
// SERIAL NUMBER UPDATE
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
// GRAND TOTAL CALCULATION
//==================================================


function calculateGrandTotal(){


let total = 0;



const rows =

itemBody.querySelectorAll("tr");



rows.forEach(row=>{


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

amount.toFixed(2);



total += amount;



});



if(grandTotal){

grandTotal.innerText =

total.toFixed(2);

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


calculateGrandTotal();


}


}

);





//==================================================
// REMOVE ITEM ROW
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
// ADD BUTTON EVENT
//==================================================


if(addItemBtn){


addItemBtn.addEventListener(

"click",

()=>{


addNewRow();


}

);


}





//==================================================
// FIRST ROW CREATE
//==================================================


addNewRow();




//==================================================
// END PART-2
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// invoice.js
// Replace Final
// Part-3
// Save Invoice + Stock OUT
//==================================================



//==================================================
// COLLECT ITEMS
//==================================================


function collectInvoiceItems(){


let items = [];



const rows =

itemBody.querySelectorAll("tr");



rows.forEach(row=>{


const product =

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



if(product){


items.push({

product,
brand,
qty,
price,
total

});


}



});



return items;


}





//==================================================
// STOCK AUTO OUT
//==================================================


async function updateStockAfterSale(items){



for(const item of items){



const stockQuery =

await getDocs(

collection(db,"stock")

);



for(const stockDoc of stockQuery){



const stockData =

stockDoc.data();



if(

stockData.productName === item.product

){



let currentQty =

Number(stockData.quantity) || 0;



let newQty =

currentQty - item.qty;



await updateDoc(

doc(

db,

"stock",

stockDoc.id

),

{


quantity:newQty,


lastSale:new Date()


}

);



break;



}



}



}



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



if(items.length===0){


alert(

"Please add product"

);


return;


}



let total = 0;



items.forEach(item=>{


total += item.total;


});




// Save Invoice


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


grandTotal:
total,


createdAt:
new Date()


}


);




// Save Sales Report


await addDoc(

collection(db,"sales"),

{


invoiceNo:
invoiceNo.value,


customer:
customerName.value,


company:
companyName.value,


items:items,


amount:
total,


date:
invoiceDate.value,


createdAt:
new Date()


}


);




// Stock Reduce


await updateStockAfterSale(items);




alert(

"✅ Invoice Saved & Stock Updated"

);



generateDate();


generateInvoiceNumber();



}



catch(error){



console.error(error);



alert(

"❌ Invoice Save Failed"

);



}



}



);



}



//==================================================
// END PART-3
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// invoice.js
// Replace Final
// Part-4
// Invoice History + Search + Delete + View
//==================================================



//==================================================
// LOAD INVOICE HISTORY
//==================================================


async function loadInvoiceHistory(){


if(!invoiceHistory) return;



try{


invoiceHistory.innerHTML="";



const snapshot =

await getDocs(

collection(db,"invoice")

);




if(snapshot.empty){


invoiceHistory.innerHTML=`

<tr>

<td colspan="6">

No Invoice Found

</td>

</tr>

`;


return;


}





snapshot.forEach((invoiceDoc)=>{


const data =

invoiceDoc.data();



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

data-id="${invoiceDoc.id}">

👁 View

</button>



<button

class="deleteInvoiceBtn"

data-id="${invoiceDoc.id}">

🗑 Delete

</button>



</td>


</tr>


`;



});



}


catch(error){


console.error(error);



}



}





//==================================================
// SEARCH
//==================================================


if(searchInvoice){



searchInvoice.addEventListener(

"keyup",

()=>{



const value =

searchInvoice.value.toLowerCase();



document

.querySelectorAll("#invoiceHistory tr")

.forEach(row=>{



const text =

row.innerText.toLowerCase();



row.style.display =

text.includes(value)

?

""

:

"none";



});



}



);



}




//==================================================
// DELETE INVOICE
//==================================================


document.addEventListener(

"click",

async(e)=>{


if(

e.target.classList.contains("deleteInvoiceBtn")

){



const id =

e.target.dataset.id;



const confirmDelete =

confirm(

"Delete Invoice?"

);



if(!confirmDelete)

return;




await deleteDoc(

doc(

db,

"invoice",

id

)

);




alert(

"Invoice Deleted"

);



loadInvoiceHistory();



}



}

);





//==================================================
// VIEW INVOICE
//==================================================


document.addEventListener(

"click",

async(e)=>{


if(

e.target.classList.contains("viewInvoiceBtn")

){



const id =

e.target.dataset.id;




const invoiceRef =

doc(

db,

"invoice",

id

);



const invoiceSnap =

await getDoc(invoiceRef);



if(invoiceSnap.exists()){


const data =

invoiceSnap.data();




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




itemBody.innerHTML="";





(data.items || []).forEach(item=>{


const row =

document.createElement("tr");



row.innerHTML = `


<td class="slNo"></td>


<td>

<input

class="itemName"

value="${item.product || ""}">

</td>



<td>

<input

class="itemBrand"

value="${item.brand || ""}">

</td>



<td>

<input

class="itemQty"

type="number"

value="${item.qty || 1}">

</td>



<td>

<input

class="itemPrice"

type="number"

value="${item.price || 0}">

</td>



<td>

<input

class="itemTotal"

value="${item.total || 0}"

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



});




updateSerial();

calculateGrandTotal();




window.scrollTo({

top:0,

behavior:"smooth"

});



}



}



}

);





//==================================================
// INITIAL LOAD
//==================================================


loadInvoiceHistory();




//==================================================
// END PART-4
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// invoice.js
// Replace Final
// Part-5
// PDF + Print + Clear + Final Ready
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


const invoicePaper =

document.querySelector(".invoice-paper");



if(!invoicePaper){


alert(

"Invoice Layout Not Found"

);


return;


}




const canvas =

await html2canvas(

invoicePaper,

{


scale:2,


useCORS:true,


backgroundColor:"#ffffff"



}

);




const image =

canvas.toDataURL(

"image/jpeg",

1.0

);



const {

jsPDF

}=window.jspdf;



const pdf =

new jsPDF({

orientation:"portrait",

unit:"mm",

format:"a4"

});




const width =

pdf.internal.pageSize.getWidth();



const height =

(canvas.height * width)

/

canvas.width;



pdf.addImage(

image,

"JPEG",

0,

0,

width,

height

);




pdf.save(

invoiceNo.value +

".pdf"

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
// CLEAR INVOICE
//==================================================


if(clearInvoice){



clearInvoice.addEventListener(

"click",

()=>{


const ok =

confirm(

"Clear Invoice?"

);



if(!ok)

return;




customerName.value="";


companyName.value="";


phoneNumber.value="";



itemBody.innerHTML="";



addNewRow();



generateDate();


generateInvoiceNumber();



grandTotal.innerText="0.00";



editingId=null;



}

);



}




//==================================================
// PAGE LOAD
//==================================================


window.addEventListener(

"load",

()=>{


calculateGrandTotal();


loadInvoiceHistory();


}

);




//==================================================
// FINAL READY
//==================================================


console.log(

"✅ SHGT Invoice System Replace Final Loaded"

);



//==================================================
// END PART-5
//==================================================


