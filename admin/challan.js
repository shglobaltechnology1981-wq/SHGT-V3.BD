//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-1
// Firebase + Elements + Auto Challan No
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
addDoc,
getDocs,
deleteDoc,
doc

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




// Challan Info

const challanNo =
document.getElementById("challanNo");


const challanDate =
document.getElementById("challanDate");


const invoiceRef =
document.getElementById("invoiceRef");




// Product

const challanBody =
document.getElementById("challanBody");


const addChallanItem =
document.getElementById("addChallanItem");




// Buttons

const saveChallan =
document.getElementById("saveChallan");


const printChallan =
document.getElementById("printChallan");


const downloadChallanPDF =
document.getElementById("downloadChallanPDF");


const clearChallan =
document.getElementById("clearChallan");




// History

const challanHistory =
document.getElementById("challanHistory");


const searchChallan =
document.getElementById("searchChallan");





//==================================================
// AUTO DATE
//==================================================


function generateDate(){


const today = new Date();



challanDate.value =

today.toLocaleDateString("en-GB");



}





//==================================================
// AUTO CHALLAN NUMBER
// FORMAT:
// DC-20260803-1234
//==================================================


function generateChallanNumber(){


const now = new Date();



const year =

now.getFullYear();



const month =

String(now.getMonth()+1)
.padStart(2,"0");



const day =

String(now.getDate())
.padStart(2,"0");



const random =

Math.floor(

1000 +

Math.random()*9000

);




challanNo.value =

"DC-" +

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


generateChallanNumber();




//==================================================
// READY
//==================================================


console.log(

"SHGT Challan System Part-1 Loaded"

);


//==================================================
// END PART-1
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-2
// Add Item + Row Management
//==================================================



//==================================================
// ADD CHALLAN ITEM ROW
//==================================================


function addChallanRow(){


const row = document.createElement("tr");



row.innerHTML = `

<td class="slNo"></td>


<td>

<input

type="text"

class="productName"

placeholder="Product Name">

</td>



<td>

<input

type="text"

class="productBrand"

placeholder="Brand">

</td>



<td>

<input

type="number"

class="productQty"

value="1"

min="1">

</td>




<td>

<input

type="text"

class="remark"

placeholder="Remark">

</td>




<td>

<button

class="removeChallanItem">

✖

</button>

</td>


`;



challanBody.appendChild(row);



updateChallanSerial();



}




//==================================================
// SERIAL NUMBER
//==================================================


function updateChallanSerial(){


const rows =

challanBody.querySelectorAll("tr");



rows.forEach((row,index)=>{


row.querySelector(".slNo").innerText =

index + 1;



});


}




//==================================================
// REMOVE ITEM
//==================================================


document.addEventListener(

"click",

(e)=>{



if(

e.target.classList.contains("removeChallanItem")

){



e.target

.closest("tr")

.remove();



updateChallanSerial();



}



}

);




//==================================================
// ADD BUTTON
//==================================================


if(addChallanItem){


addChallanItem.addEventListener(

"click",

()=>{


addChallanRow();


}

);


}





//==================================================
// FIRST ROW
//==================================================


addChallanRow();





//==================================================
// END PART-2
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-3
// Save Challan + Stock OUT + Dashboard Refresh
//==================================================



//==================================================
// COLLECT CHALLAN ITEMS
//==================================================

function collectChallanItems(){

let items = [];

const rows =
challanBody.querySelectorAll("tr");

rows.forEach(row=>{

const product =
row.querySelector(".productName").value.trim();

const brand =
row.querySelector(".productBrand").value.trim();

const qty =
Number(
row.querySelector(".productQty").value
) || 0;

const remark =
row.querySelector(".remark").value.trim();

if(product){

items.push({

product,
brand,
qty,
remark

});

}

});

return items;

}



//==================================================
// UPDATE STOCK AFTER DELIVERY
//==================================================

async function updateStockAfterDelivery(items){

for(const item of items){

const snapshot =
await getDocs(
collection(db,"stock")
);

for(const stockItem of snapshot){

const data =
stockItem.data();

if(data.productName === item.product){

let oldQty =
Number(data.quantity) || 0;

let newQty =
oldQty - item.qty;

if(newQty < 0){

newQty = 0;

}

await updateDoc(

doc(
db,
"stock",
stockItem.id
),

{

quantity:newQty,

lastDelivery:new Date(),

updatedAt:new Date()

}

);

break;

}

}

}

}



//==================================================
// SAVE CHALLAN
//==================================================

if(saveChallan){

saveChallan.addEventListener(

"click",

async()=>{

try{

const items =
collectChallanItems();

if(items.length===0){

alert("Please add product item");

return;

}

await addDoc(

collection(db,"challan"),

{

challanNo:
challanNo.value,

date:
challanDate.value,

invoiceRef:
invoiceRef.value,

customer:
customerName.value,

company:
companyName.value,

phone:
phoneNumber.value,

items:items,

status:"Delivered",

createdAt:new Date()

}

);


//------------------------------------
// STOCK UPDATE
//------------------------------------

await updateStockAfterDelivery(items);


//------------------------------------
// DASHBOARD UPDATE
//------------------------------------

if(typeof refreshDashboardSummary==="function"){

await refreshDashboardSummary();

}


//------------------------------------
// RELOAD HISTORY
//------------------------------------

if(typeof loadChallan==="function"){

await loadChallan();

}


//------------------------------------
// CLEAR FORM
//------------------------------------

if(typeof clearForm==="function"){

clearForm();

}else{

generateDate();

generateChallanNumber();

}


alert("✅ Challan Saved Successfully");


}

catch(error){

console.error(
"Save Error:",
error
);

alert("❌ Challan Save Failed");

}

});

}



//==================================================
// END PART-3
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-4
// History + Search + View + Delete + Edit Ready
//==================================================



//==================================================
// LOAD CHALLAN HISTORY
//==================================================

async function loadChallanHistory(){

if(!challanHistory) return;

try{

challanHistory.innerHTML = "";

const snapshot =
await getDocs(collection(db,"challan"));

if(snapshot.empty){

challanHistory.innerHTML=`

<tr>

<td colspan="6">
No Challan Found
</td>

</tr>

`;

return;

}

snapshot.forEach((item)=>{

const data=item.data();

challanHistory.innerHTML+=`

<tr>

<td>${data.challanNo||""}</td>

<td>${data.date||""}</td>

<td>${data.customer||""}</td>

<td>${data.company||""}</td>

<td>${data.status||"Delivered"}</td>

<td>

<button
class="viewChallanBtn"
data-id="${item.id}">
👁 View
</button>

<button
class="editChallanBtn"
data-id="${item.id}">
✏ Edit
</button>

<button
class="deleteChallanBtn"
data-id="${item.id}">
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

if(searchChallan){

searchChallan.addEventListener("keyup",()=>{

const keyword=
searchChallan.value.toLowerCase();

document
.querySelectorAll("#challanHistory tr")
.forEach(row=>{

row.style.display=
row.innerText.toLowerCase().includes(keyword)
?
""
:
"none";

});

});

}



//==================================================
// DELETE
//==================================================

document.addEventListener("click",async(e)=>{

if(e.target.classList.contains("deleteChallanBtn")){

const id=e.target.dataset.id;

if(!confirm("Delete Challan?")) return;

await deleteDoc(doc(db,"challan",id));

if(typeof refreshDashboardSummary==="function"){

await refreshDashboardSummary();

}

alert("✅ Challan Deleted");

loadChallanHistory();

}

});



//==================================================
// VIEW + EDIT
//==================================================

document.addEventListener("click",async(e)=>{

if(
e.target.classList.contains("viewChallanBtn") ||
e.target.classList.contains("editChallanBtn")
){

const id=e.target.dataset.id;

document.getElementById("challanId").value=id;

const snap=
await getDoc(doc(db,"challan",id));

if(!snap.exists()) return;

const data=snap.data();

challanNo.value=data.challanNo||"";
challanDate.value=data.date||"";
invoiceRef.value=data.invoiceRef||"";
customerName.value=data.customer||"";
companyName.value=data.company||"";
phoneNumber.value=data.phone||"";

challanBody.innerHTML="";

(data.items||[]).forEach(item=>{

const row=document.createElement("tr");

row.innerHTML=`

<td class="slNo"></td>

<td>
<input
class="productName"
value="${item.product||""}">
</td>

<td>
<input
class="productBrand"
value="${item.brand||""}">
</td>

<td>
<input
class="productQty"
type="number"
value="${item.qty||1}">
</td>

<td>
<input
class="remark"
value="${item.remark||""}">
</td>

<td>

<button
class="removeChallanItem">

✖

</button>

</td>

`;

challanBody.appendChild(row);

});

updateChallanSerial();

if(typeof calculateTotalQty==="function"){

calculateTotalQty();

}

window.scrollTo({

top:0,

behavior:"smooth"

});

}

});



//==================================================
// AUTO LOAD
//==================================================

loadChallanHistory();



//==================================================
// END PART-4
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-5
// PDF + Print + Clear + Final Ready
//==================================================


//==================================================
// PRINT CHALLAN
//==================================================

if(printChallan){

printChallan.addEventListener(

"click",

()=>{

window.print();

}

);

}



//==================================================
// DOWNLOAD PDF
//==================================================

if(downloadChallanPDF){

downloadChallanPDF.addEventListener(

"click",

async()=>{

try{

const challanPaper =
document.querySelector(".invoice-paper");

if(!challanPaper){

alert("Challan Layout Not Found");

return;

}

const canvas =
await html2canvas(challanPaper,{

scale:2,

useCORS:true,

backgroundColor:"#ffffff"

});

const image =
canvas.toDataURL("image/jpeg",1.0);

const { jsPDF } =
window.jspdf;

const pdf =
new jsPDF({

orientation:"portrait",

unit:"mm",

format:"a4"

});

const width =
pdf.internal.pageSize.getWidth();

const height =
(canvas.height * width) /
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

challanNo.value + ".pdf"

);

}

catch(error){

console.error(error);

alert("PDF Download Failed");

}

}

);

}



//==================================================
// CLEAR CHALLAN
//==================================================

if(clearChallan){

clearChallan.addEventListener(

"click",

()=>{

const ok =
confirm("Clear Challan?");

if(!ok){

return;

}

customerName.value = "";

companyName.value = "";

phoneNumber.value = "";

invoiceRef.value = "";

document.getElementById("challanId").value = "";

challanBody.innerHTML = "";

addChallanRow();

if(typeof calculateTotalQty==="function"){

calculateTotalQty();

}

generateDate();

generateChallanNumber();

}

);

}



//==================================================
// PAGE LOAD
//==================================================

window.addEventListener(

"load",

async()=>{

if(typeof loadChallanHistory==="function"){

await loadChallanHistory();

}

if(typeof calculateTotalQty==="function"){

calculateTotalQty();

}

}

);



//==================================================
// FINAL READY
//==================================================

console.log("================================");
console.log("SHGT CHALLAN SYSTEM READY");
console.log("PDF + PRINT + CLEAR ENABLED");
console.log("================================");


//==================================================
// END PART-5
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-6
// Update Challan (Compatible Version)
//==================================================


//==================================================
// UPDATE CHALLAN
//==================================================

async function updateChallan(){

const id =
document.getElementById("challanId").value;

if(!id){

return false;

}

const items = [];

document.querySelectorAll("#challanBody tr").forEach(row=>{

items.push({

product:
row.querySelector(".productName").value.trim(),

brand:
row.querySelector(".productBrand").value.trim(),

qty:
Number(
row.querySelector(".productQty").value
) || 0,

remark:
row.querySelector(".remark").value.trim()

});

});

try{

await updateDoc(

doc(db,"challan",id),

{

customer:
customerName.value,

company:
companyName.value,

phone:
phoneNumber.value,

challanNo:
challanNo.value,

date:
challanDate.value,

invoiceRef:
invoiceRef.value,

items:items,

updatedAt:
new Date()

}

);

alert("✅ Challan Updated Successfully");

document.getElementById("challanId").value = "";

loadChallanHistory();

generateDate();

generateChallanNumber();

challanBody.innerHTML="";

addChallanRow();

customerName.value="";
companyName.value="";
phoneNumber.value="";
invoiceRef.value="";

if(typeof calculateTotalQty==="function"){

calculateTotalQty();

}

return true;

}

catch(error){

console.error(error);

alert("❌ Update Failed");

return false;

}

}


//==================================================
// END PART-6
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-7
// Total Qty Calculation
//==================================================


//==================================================
// TOTAL QTY
//==================================================

function calculateTotalQty(){

let total = 0;

document
.querySelectorAll(".productQty")
.forEach(input=>{

total += Number(input.value) || 0;

});

const totalQty =
document.getElementById("totalQty");

if(totalQty){

totalQty.innerText = total;

}

}



//==================================================
// AUTO UPDATE TOTAL
//==================================================

document.addEventListener(
"input",
(e)=>{

if(
e.target.classList.contains("productQty")
){

calculateTotalQty();

}

});



//==================================================
// END PART-7
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-8
// PDF Download + Print
//==================================================


//==================================================
// HTML ELEMENTS
//==================================================

const downloadChallanPDF =
document.getElementById("downloadChallanPDF");

const printChallan =
document.getElementById("printChallan");


//==================================================
// DOWNLOAD PDF
//==================================================

if(downloadChallanPDF){

downloadChallanPDF.addEventListener(
"click",
async()=>{

try{

const challanPaper =
document.querySelector(".invoice-paper");

if(!challanPaper){

alert("Challan Layout Not Found");

return;

}

const canvas =
await html2canvas(challanPaper,{

scale:2,

useCORS:true,

backgroundColor:"#ffffff",

scrollY:-window.scrollY

});

const image =
canvas.toDataURL("image/jpeg",1.0);

const { jsPDF } =
window.jspdf;

const pdf =
new jsPDF({

orientation:"portrait",

unit:"mm",

format:"a4"

});

const pageWidth =
pdf.internal.pageSize.getWidth();

const pageHeight =
pdf.internal.pageSize.getHeight();

const imgHeight =
(canvas.height * pageWidth) /
canvas.width;

pdf.addImage(

image,

"JPEG",

0,

0,

pageWidth,

Math.min(imgHeight,pageHeight)

);

pdf.save(

`Challan_${challanNo.value}.pdf`

);

}

catch(error){

console.error(error);

alert("❌ PDF Download Failed");

}

});

}


//==================================================
// PRINT CHALLAN
//==================================================

if(printChallan){

printChallan.addEventListener(
"click",
()=>{

window.print();

});

}


//==================================================
// END PART-8
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-9
// Clear Form + Auto Challan No
//==================================================


//==================================================
// AUTO CHALLAN NUMBER
//==================================================

function generateChallanNumber(){

const now = new Date();

const year =
now.getFullYear();

const month =
String(now.getMonth()+1).padStart(2,"0");

const day =
String(now.getDate()).padStart(2,"0");

const random =
Math.floor(
1000 + Math.random()*9000
);

challanNo.value =
`CH-${year}${month}${day}-${random}`;

challanDate.value =
now.toLocaleDateString();

}


//==================================================
// CLEAR FORM
//==================================================

function clearForm(){

document.getElementById("challanId").value = "";

customerName.value = "";

companyName.value = "";

phoneNumber.value = "";

invoiceRef.value = "";

challanBody.innerHTML = "";

addChallanRow();

calculateTotalQty();

generateChallanNumber();

}


//==================================================
// CLEAR BUTTON
//==================================================

const clearChallan =
document.getElementById("clearChallan");

if(clearChallan){

clearChallan.addEventListener(
"click",
()=>{

if(confirm("Clear this Challan?")){

clearForm();

}

});

}


//==================================================
// PAGE LOAD
//==================================================

window.addEventListener(
"load",
()=>{

generateChallanNumber();

if(challanBody.children.length===0){

addChallanRow();

}

calculateTotalQty();

loadChallanHistory();

});


//==================================================
// END PART-9
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// Part-10
// Final Initialization
//==================================================


//==================================================
// INITIALIZE SYSTEM
//==================================================

window.addEventListener("load", async()=>{

try{

// Generate New Challan No
if(typeof generateChallanNumber==="function"){

generateChallanNumber();

}

// Load History
if(typeof loadChallanHistory==="function"){

await loadChallanHistory();

}

// Add First Row
if(
challanBody &&
challanBody.children.length===0 &&
typeof addChallanRow==="function"
){

addChallanRow();

}

// Update Serial
if(typeof updateChallanSerial==="function"){

updateChallanSerial();

}

// Update Total Qty
if(typeof calculateTotalQty==="function"){

calculateTotalQty();

}

console.log("================================");
console.log("SHGT Challan System Ready");
console.log("All Modules Loaded Successfully");
console.log("================================");

}

catch(error){

console.error(
"Initialization Error:",
error
);

}

});


//==================================================
// GLOBAL ERROR HANDLER
//==================================================

window.addEventListener(
"error",
(event)=>{

console.error(
"Runtime Error:",
event.error
);

});


//==================================================
// END PART-10
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// Part-11
// Status + Export + Refresh
//==================================================


//==================================================
// EXPORT CHALLAN CSV
//==================================================

const exportChallanBtn =
document.getElementById("exportChallan");

if(exportChallanBtn){

exportChallanBtn.addEventListener(
"click",
async()=>{

try{

const snapshot =
await getDocs(
collection(db,"challan")
);

let csv =
"Challan No,Date,Customer,Company,Invoice,Status\n";

snapshot.forEach(docItem=>{

const data = docItem.data();

csv +=

`"${data.challanNo||""}",`+
`"${data.date||""}",`+
`"${data.customer||""}",`+
`"${data.company||""}",`+
`"${data.invoiceRef||""}",`+
`"${data.status||"Delivered"}"\n`;

});

const blob =
new Blob([csv],{
type:"text/csv"
});

const url =
URL.createObjectURL(blob);

const link =
document.createElement("a");

link.href = url;

link.download =
"SHGT_Challan_Backup.csv";

link.click();

URL.revokeObjectURL(url);

alert("✅ Challan Backup Exported");

}

catch(error){

console.error(error);

alert("❌ Export Failed");

}

});

}


//==================================================
// AUTO REFRESH
//==================================================

setInterval(()=>{

if(typeof loadChallanHistory==="function"){

loadChallanHistory();

}

},60000);


//==================================================
// READY
//==================================================

console.log(
"✅ Challan Part-11 Loaded"
);


//==================================================
// END PART-11
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// Part-12
// Final Ready + Validation
//==================================================


//==================================================
// REQUIRED ELEMENT CHECK
//==================================================

function challanElementCheck(){

const elements=[

"challanId",
"customerName",
"companyName",
"phoneNumber",
"challanNo",
"challanDate",
"invoiceRef",
"challanBody",
"totalQty",
"challanHistory",
"saveChallan",
"downloadChallanPDF",
"printChallan",
"clearChallan"

];

elements.forEach(id=>{

const el=document.getElementById(id);

if(!el){

console.warn("Missing Element:",id);

}else{

console.log("Element OK:",id);

}

});

}


//==================================================
// FIREBASE CONNECTION CHECK
//==================================================

async function firebaseCheck(){

try{

const snapshot=
await getDocs(collection(db,"challan"));

console.log(
"Firebase Connected"
);

console.log(
"Total Challan:",
snapshot.size
);

}

catch(error){

console.error(
"Firebase Error:",
error
);

}

}


//==================================================
// PAGE READY
//==================================================

window.addEventListener("load",async()=>{

challanElementCheck();

await firebaseCheck();

console.log("================================");
console.log("SHGT CHALLAN SYSTEM READY");
console.log("All Modules Loaded");
console.log("================================");

});


//==================================================
// GLOBAL ERROR HANDLER
//==================================================

window.addEventListener(
"error",
(event)=>{

console.error(
"Runtime Error:",
event.error
);

});


//==================================================
// END PART-12
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// Part-13
// Dashboard Sync + Low Stock Alert
//==================================================


//==================================================
// LOW STOCK CHECK
//==================================================

async function checkLowStock(){

try{

const snapshot =
await getDocs(collection(db,"stock"));

let lowItems=[];

snapshot.forEach(docItem=>{

const data=docItem.data();

const qty=Number(data.quantity)||0;

if(qty<=5){

lowItems.push({
name:data.productName||"",
qty:qty
});

}

});

if(lowItems.length){

console.warn("Low Stock Items:",lowItems);

}

}

catch(error){

console.error(
"Low Stock Check Error:",
error
);

}

}


//==================================================
// REFRESH ALL DATA
//==================================================

async function refreshDashboardData(){

if(typeof loadChallanHistory==="function"){

await loadChallanHistory();

}

if(typeof checkLowStock==="function"){

await checkLowStock();

}

}


//==================================================
// AUTO REFRESH
//==================================================

setInterval(refreshDashboardData,60000);


//==================================================
// RUN
//==================================================

refreshDashboardData();


//==================================================
// END PART-13
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// Part-14
// Duplicate Challan Check + Timestamp
//==================================================


//==================================================
// CHECK DUPLICATE CHALLAN NUMBER
//==================================================

async function checkDuplicateChallan(challanNumber){

const snapshot =
await getDocs(collection(db,"challan"));

let exists = false;

snapshot.forEach(item=>{

const data = item.data();

if(data.challanNo === challanNumber){

exists = true;

}

});

return exists;

}


//==================================================
// SAVE TIMESTAMP
//==================================================

function getCurrentTimestamp(){

return {

date : new Date().toLocaleDateString(),

time : new Date().toLocaleTimeString()

};

}


//==================================================
// READY
//==================================================

console.log("Part-14 Loaded");


//==================================================
// END PART-14
//==================================================

