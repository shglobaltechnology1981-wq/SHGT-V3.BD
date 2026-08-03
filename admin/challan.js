//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-1
// Firebase Import + HTML Elements
//==================================================


//==================================================
// FIREBASE
//==================================================

import { db } from "../js/firebase.js";

import {

collection,
addDoc,
getDocs,
getDoc,
updateDoc,
deleteDoc,
doc,
query,
orderBy,
limit

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


//==================================================
// CUSTOMER INFORMATION
//==================================================

const customerName =
document.getElementById("customerName");

const companyName =
document.getElementById("companyName");

const phoneNumber =
document.getElementById("phoneNumber");

const address =
document.getElementById("address");


//==================================================
// CHALLAN INFORMATION
//==================================================

const challanId =
document.getElementById("challanId");

const challanNo =
document.getElementById("challanNo");

const challanDate =
document.getElementById("challanDate");

const invoiceRef =
document.getElementById("invoiceRef");


//==================================================
// PRODUCT TABLE
//==================================================

const challanBody =
document.getElementById("challanBody");

const totalQty =
document.getElementById("totalQty");


//==================================================
// BUTTONS
//==================================================

const addChallanItem =
document.getElementById("addChallanItem");

const saveChallan =
document.getElementById("saveChallan");

const updateChallanBtn =
document.getElementById("updateChallan");

const clearChallan =
document.getElementById("clearChallan");

const printChallan =
document.getElementById("printChallan");

const downloadChallanPDF =
document.getElementById("downloadChallanPDF");

const exportChallan =
document.getElementById("exportChallan");


//==================================================
// HISTORY
//==================================================

const searchChallan =
document.getElementById("searchChallan");

const challanHistory =
document.getElementById("challanHistory");


//==================================================
// SYSTEM STATUS
//==================================================

console.log("==================================");
console.log("SH GLOBAL TECHNOLOGY");
console.log("CHALLAN MANAGEMENT SYSTEM");
console.log("Part-1 Loaded Successfully");
console.log("Firebase Connected");
console.log("==================================");


//==================================================
// END PART-1
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-2
// Auto Challan Number + Auto Date
//==================================================


//==================================================
// GENERATE TODAY DATE
//==================================================

function generateDate(){

const today = new Date();

challanDate.value =
today.toLocaleDateString("en-GB");

}


//==================================================
// GENERATE CHALLAN NUMBER
// FORMAT:
// CH-YYYYMMDD-XXXX
// Example:
// CH-20260803-1001
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
1000 + Math.random()*9000
);

challanNo.value =
`CH-${year}${month}${day}-${random}`;

}


//==================================================
// RESET FORM
//==================================================

function resetChallanForm(){

if(challanId)
challanId.value="";

if(customerName)
customerName.value="";

if(companyName)
companyName.value="";

if(phoneNumber)
phoneNumber.value="";

if(address)
address.value="";

if(invoiceRef)
invoiceRef.value="";

if(challanBody)
challanBody.innerHTML="";

if(totalQty)
totalQty.innerText="0";

generateDate();

generateChallanNumber();

}


//==================================================
// PAGE INITIALIZE
//==================================================

function initializeChallan(){

generateDate();

generateChallanNumber();

console.log("✅ New Challan Ready");

}


//==================================================
// PAGE LOAD
//==================================================

window.addEventListener(

"DOMContentLoaded",

()=>{

initializeChallan();

}

);


//==================================================
// END PART-2
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-3
// Add / Remove Product Row + Serial
//==================================================


//==================================================
// ADD NEW ROW
//==================================================

function addChallanRow(){

const row = document.createElement("tr");

row.innerHTML = `

<td class="slNo"></td>

<td>
<input
type="text"
class="productName"
placeholder="Product Name"
required>
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
type="button"
class="removeChallanItem">

✖

</button>

</td>

`;

challanBody.appendChild(row);

updateChallanSerial();

calculateTotalQty();

}


//==================================================
// UPDATE SERIAL
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
// REMOVE ROW
//==================================================

document.addEventListener(

"click",

(e)=>{

if(

e.target.classList.contains("removeChallanItem")

){

const rows =
challanBody.querySelectorAll("tr");

if(rows.length===1){

alert("At least one product is required.");

return;

}

e.target.closest("tr").remove();

updateChallanSerial();

calculateTotalQty();

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

if(challanBody.children.length===0){

addChallanRow();

}


//==================================================
// READY
//==================================================

console.log("✅ Part-3 Loaded");


//==================================================
// END PART-3
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-4
// Total Qty + Collect Items + Validation
//==================================================


//==================================================
// TOTAL QUANTITY
//==================================================

function calculateTotalQty(){

let total = 0;

document
.querySelectorAll(".productQty")
.forEach(input=>{

total += Number(input.value) || 0;

});

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

}

);


//==================================================
// COLLECT CHALLAN ITEMS
//==================================================

function collectChallanItems(){

const items = [];

const rows =

challanBody.querySelectorAll("tr");

rows.forEach(row=>{

const product =

row.querySelector(".productName")
.value.trim();

const brand =

row.querySelector(".productBrand")
.value.trim();

const qty =

Number(

row.querySelector(".productQty")
.value

) || 0;

const remark =

row.querySelector(".remark")
.value.trim();

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
// FORM VALIDATION
//==================================================

function validateChallan(){

if(

customerName.value.trim()===""

){

alert("Customer Name Required");

customerName.focus();

return false;

}

if(

companyName.value.trim()===""

){

alert("Company Name Required");

companyName.focus();

return false;

}

const items =

collectChallanItems();

if(items.length===0){

alert("Please Add Product");

return false;

}

for(const item of items){

if(item.qty<=0){

alert(

"Quantity Must Be Greater Than Zero"

);

return false;

}

}

return true;

}


//==================================================
// READY
//==================================================

console.log(

"✅ Part-4 Loaded"

);


//==================================================
// END PART-4
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-5
// Save Challan To Firebase
//==================================================


//==================================================
// SAVE CHALLAN
//==================================================

if(saveChallan){

saveChallan.addEventListener(

"click",

async()=>{

try{

// Validation
if(!validateChallan()){

return;

}


// Collect Items
const items =
collectChallanItems();


// Save To Firestore
await addDoc(

collection(db,"challan"),

{

challanNo:
challanNo.value,

challanDate:
challanDate.value,

invoiceRef:
invoiceRef.value,

customer:
customerName.value.trim(),

company:
companyName.value.trim(),

phone:
phoneNumber.value.trim(),

address:
address.value.trim(),

items:items,

totalQty:
Number(totalQty.innerText)||0,

status:"Delivered",

createdAt:new Date(),

updatedAt:new Date()

}

);


// Update Stock
if(typeof updateStockAfterDelivery==="function"){

await updateStockAfterDelivery(items);

}


// Refresh Dashboard
if(typeof refreshDashboard==="function"){

await refreshDashboard();

}


// Reload History
if(typeof loadChallanHistory==="function"){

await loadChallanHistory();

}


// Clear Form
resetChallanForm();


// Add First Row
addChallanRow();


// Success
alert("✅ Challan Saved Successfully");

console.log("✅ Challan Saved");

}

catch(error){

console.error(

"Save Challan Error:",

error

);

alert("❌ Challan Save Failed");

}

});

}


//==================================================
// READY
//==================================================

console.log("✅ Part-5 Loaded");


//==================================================
// END PART-5
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-6
// Stock Auto OUT + Low Stock Alert
//==================================================


//==================================================
// UPDATE STOCK AFTER DELIVERY
//==================================================

async function updateStockAfterDelivery(items){

try{

const snapshot =
await getDocs(collection(db,"stock"));

for(const item of items){

let found = false;

snapshot.forEach(async(stockDoc)=>{

const stockData = stockDoc.data();

if(

stockData.productName === item.product ||

stockData.productName?.toLowerCase() ===
item.product.toLowerCase()

){

found = true;

const currentQty =
Number(stockData.quantity) || 0;

let newQty =
currentQty - Number(item.qty);

if(newQty < 0){

newQty = 0;

}

await updateDoc(

doc(db,"stock",stockDoc.id),

{

quantity:newQty,

lastDelivery:new Date(),

updatedAt:new Date()

}

);


//====================================
// LOW STOCK ALERT
//====================================

if(newQty <= 5){

console.warn(

`⚠️ Low Stock : ${stockData.productName}
(Current : ${newQty})`

);

}

}

});


if(!found){

console.warn(

`❌ Product Not Found In Stock :
${item.product}`

);

}

}

console.log("✅ Stock Updated");

}

catch(error){

console.error(

"Stock Update Error:",

error

);

}

}


//==================================================
// READY
//==================================================

console.log("✅ Part-6 Loaded");


//==================================================
// END PART-6
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-7
// Challan History + Search
//==================================================


//==================================================
// LOAD CHALLAN HISTORY
//==================================================

async function loadChallanHistory(){

if(!challanHistory) return;

try{

challanHistory.innerHTML="";

const q =
query(
collection(db,"challan"),
orderBy("createdAt","desc"),
limit(100)
);

const snapshot =
await getDocs(q);

if(snapshot.empty){

challanHistory.innerHTML=`

<tr>

<td colspan="7">

No Challan Found

</td>

</tr>

`;

return;

}

snapshot.forEach((docItem)=>{

const data = docItem.data();

challanHistory.innerHTML += `

<tr>

<td>${data.challanNo||""}</td>

<td>${data.challanDate||""}</td>

<td>${data.customer||""}</td>

<td>${data.company||""}</td>

<td>${data.totalQty||0}</td>

<td>${data.status||"Delivered"}</td>

<td>

<button
class="viewChallanBtn"
data-id="${docItem.id}">

👁

</button>

<button
class="editChallanBtn"
data-id="${docItem.id}">

✏️

</button>

<button
class="deleteChallanBtn"
data-id="${docItem.id}">

🗑️

</button>

</td>

</tr>

`;

});

}

catch(error){

console.error(

"Load Challan Error:",

error

);

}

}


//==================================================
// SEARCH CHALLAN
//==================================================

if(searchChallan){

searchChallan.addEventListener(

"keyup",

()=>{

const keyword =
searchChallan.value.toLowerCase();

document
.querySelectorAll("#challanHistory tr")
.forEach(row=>{

row.style.display =

row.innerText
.toLowerCase()
.includes(keyword)

?

""

:

"none";

});

}

);

}


//==================================================
// AUTO LOAD
//==================================================

window.addEventListener(

"DOMContentLoaded",

()=>{

loadChallanHistory();

}

);


//==================================================
// READY
//==================================================

console.log("✅ Part-7 Loaded");


//==================================================
// END PART-7
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-8
// View + Edit + Delete Challan
//==================================================


//==================================================
// VIEW / EDIT CHALLAN
//==================================================

document.addEventListener(

"click",

async(e)=>{

if(

e.target.classList.contains("viewChallanBtn") ||

e.target.classList.contains("editChallanBtn")

){

try{

const id =

e.target.dataset.id;

const snap =

await getDoc(

doc(db,"challan",id)

);

if(!snap.exists()){

alert("Challan Not Found");

return;

}

const data =

snap.data();

challanId.value = id;

challanNo.value =
data.challanNo || "";

challanDate.value =
data.challanDate || "";

invoiceRef.value =
data.invoiceRef || "";

customerName.value =
data.customer || "";

companyName.value =
data.company || "";

phoneNumber.value =
data.phone || "";

address.value =
data.address || "";

challanBody.innerHTML = "";

(data.items || []).forEach(item=>{

const row =

document.createElement("tr");

row.innerHTML = `

<td class="slNo"></td>

<td>

<input
type="text"
class="productName"
value="${item.product || ""}">

</td>

<td>

<input
type="text"
class="productBrand"
value="${item.brand || ""}">

</td>

<td>

<input
type="number"
class="productQty"
value="${item.qty || 1}"
min="1">

</td>

<td>

<input
type="text"
class="remark"
value="${item.remark || ""}">

</td>

<td>

<button
type="button"
class="removeChallanItem">

✖

</button>

</td>

`;

challanBody.appendChild(row);

});

updateChallanSerial();

calculateTotalQty();

window.scrollTo({

top:0,

behavior:"smooth"

});

}

catch(error){

console.error(

"View/Edit Error:",

error

);

}

}

});


//==================================================
// DELETE CHALLAN
//==================================================

document.addEventListener(

"click",

async(e)=>{

if(

e.target.classList.contains("deleteChallanBtn")

){

const id =

e.target.dataset.id;

const ok =

confirm(

"Delete this Challan?"

);

if(!ok){

return;

}

try{

await deleteDoc(

doc(db,"challan",id)

);

alert(

"✅ Challan Deleted"

);

loadChallanHistory();

if(typeof refreshDashboard==="function"){

refreshDashboard();

}

}

catch(error){

console.error(

"Delete Error:",

error

);

alert(

"❌ Delete Failed"

);

}

}

});


//==================================================
// READY
//==================================================

console.log("✅ Part-8 Loaded");


//==================================================
// END PART-8
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-9
// Update Challan (Firestore)
//==================================================


//==================================================
// UPDATE CHALLAN
//==================================================

async function updateChallan(){

try{

const id = challanId.value;

if(!id){

alert("No Challan Selected");

return false;

}

if(!validateChallan()){

return false;

}

const items =
collectChallanItems();

await updateDoc(

doc(db,"challan",id),

{

challanNo:
challanNo.value,

challanDate:
challanDate.value,

invoiceRef:
invoiceRef.value,

customer:
customerName.value.trim(),

company:
companyName.value.trim(),

phone:
phoneNumber.value.trim(),

address:
address.value.trim(),

items:items,

totalQty:
Number(totalQty.innerText)||0,

updatedAt:
new Date()

}

);

alert("✅ Challan Updated Successfully");

if(typeof loadChallanHistory==="function"){

await loadChallanHistory();

}

if(typeof refreshDashboard==="function"){

await refreshDashboard();

}

resetChallanForm();

addChallanRow();

return true;

}

catch(error){

console.error(

"Update Error:",

error

);

alert("❌ Challan Update Failed");

return false;

}

}


//==================================================
// SAVE / UPDATE BUTTON
//==================================================

if(saveChallan){

saveChallan.addEventListener(

"click",

async()=>{

if(challanId.value){

await updateChallan();

return;

}

// New Challan Save
// Part-5 Save Function will run

}

);

}


//==================================================
// READY
//==================================================

console.log("✅ Part-9 Loaded");


//==================================================
// END PART-9
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-10
// Print + PDF + Clear Form
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

backgroundColor:"#ffffff",

scrollY:-window.scrollY

});

const image =

canvas.toDataURL("image/jpeg",1.0);

const { jsPDF } = window.jspdf;

const pdf = new jsPDF({

orientation:"portrait",

unit:"mm",

format:"a4"

});

const pageWidth =
pdf.internal.pageSize.getWidth();

const pageHeight =
pdf.internal.pageSize.getHeight();

const imageHeight =
(canvas.height * pageWidth) /
canvas.width;

pdf.addImage(

image,

"JPEG",

0,

0,

pageWidth,

Math.min(imageHeight,pageHeight)

);

pdf.save(

`${challanNo.value}.pdf`

);

}

catch(error){

console.error(

"PDF Error:",

error

);

alert("❌ PDF Download Failed");

}

});

}


//==================================================
// CLEAR FORM
//==================================================

if(clearChallan){

clearChallan.addEventListener(

"click",

()=>{

const ok =

confirm(

"Clear this Challan?"

);

if(!ok){

return;

}

resetChallanForm();

addChallanRow();

calculateTotalQty();

console.log("✅ Challan Cleared");

}

);

}


//==================================================
// READY
//==================================================

console.log("✅ Part-10 Loaded");


//==================================================
// END PART-10
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-11
// Export CSV + Auto Refresh + Dashboard Sync
//==================================================


//==================================================
// EXPORT CHALLAN CSV
//==================================================

const exportChallan =
document.getElementById("exportChallan");

if(exportChallan){

exportChallan.addEventListener(

"click",

async()=>{

try{

const snapshot =
await getDocs(
collection(db,"challan")
);

let csv =
"Challan No,Date,Customer,Company,Phone,Total Qty,Status\n";

snapshot.forEach(docItem=>{

const data =
docItem.data();

csv +=

`"${data.challanNo||""}",`+

`"${data.challanDate||""}",`+

`"${data.customer||""}",`+

`"${data.company||""}",`+

`"${data.phone||""}",`+

`"${data.totalQty||0}",`+

`"${data.status||"Delivered"}"\n`;

});

const blob =
new Blob([csv],{

type:"text/csv"

});

const url =
URL.createObjectURL(blob);

const a =
document.createElement("a");

a.href = url;

a.download =
"SHGT_Challan_Report.csv";

a.click();

URL.revokeObjectURL(url);

alert("✅ CSV Export Successful");

}

catch(error){

console.error(

"Export Error:",

error

);

alert("❌ Export Failed");

}

});

}


//==================================================
// AUTO REFRESH HISTORY
//==================================================

setInterval(

()=>{

if(typeof loadChallanHistory==="function"){

loadChallanHistory();

}

},

60000

);


//==================================================
// DASHBOARD REFRESH
//==================================================

async function refreshDashboardSummary(){

try{

if(typeof refreshDashboard==="function"){

await refreshDashboard();

}

}

catch(error){

console.error(

"Dashboard Refresh Error:",

error

);

}

}


//==================================================
// LOW STOCK CHECK
//==================================================

async function checkLowStock(){

try{

const snapshot =
await getDocs(
collection(db,"stock")
);

snapshot.forEach(docItem=>{

const data =
docItem.data();

const qty =
Number(data.quantity)||0;

if(qty<=5){

console.warn(

`⚠️ Low Stock : ${data.productName} (${qty})`

);

}

});

}

catch(error){

console.error(

"Low Stock Error:",

error

);

}

}


//==================================================
// PAGE LOAD
//==================================================

window.addEventListener(

"load",

async()=>{

await checkLowStock();

await refreshDashboardSummary();

console.log("✅ Part-11 Loaded");

}

);


//==================================================
// END PART-11
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-12
// Final Initialization + Firebase Check
//==================================================


//==================================================
// REQUIRED ELEMENT CHECK
//==================================================

function checkRequiredElements(){

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
"printChallan",
"downloadChallanPDF",
"clearChallan"

];

elements.forEach(id=>{

const el=document.getElementById(id);

if(el){

console.log("✅",id);

}else{

console.warn("❌ Missing:",id);

}

});

}



//==================================================
// FIREBASE CONNECTION CHECK
//==================================================

async function checkFirebase(){

try{

const snapshot=

await getDocs(

collection(db,"challan")

);

console.log("🔥 Firebase Connected");

console.log(

"📄 Total Challan:",

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
// INITIALIZE SYSTEM
//==================================================

async function initializeChallanSystem(){

try{

checkRequiredElements();

await checkFirebase();

if(typeof loadChallanHistory==="function"){

await loadChallanHistory();

}

if(challanBody && challanBody.children.length===0){

addChallanRow();

}

updateChallanSerial();

calculateTotalQty();

console.log("================================");

console.log("🚀 SHGT CHALLAN SYSTEM READY");

console.log("Version : 1.0 FINAL");

console.log("================================");

}

catch(error){

console.error(

"Initialization Error:",

error

);

}

}



//==================================================
// PAGE READY
//==================================================

window.addEventListener(

"DOMContentLoaded",

initializeChallanSystem

);



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

}

);



//==================================================
// FINAL READY
//==================================================

console.log("✅ Part-12 Loaded");


//==================================================
// END PART-12
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-13
// Dashboard Statistics + Auto Refresh + Final Sync
//==================================================


//==================================================
// DASHBOARD SUMMARY
//==================================================

async function loadChallanSummary(){

try{

const snapshot =
await getDocs(
collection(db,"challan")
);

let totalChallan = 0;
let totalQty = 0;

snapshot.forEach(docItem=>{

const data = docItem.data();

totalChallan++;

totalQty += Number(data.totalQty) || 0;

});

const totalChallanEl =
document.getElementById("totalChallan");

if(totalChallanEl){

totalChallanEl.innerText =
totalChallan;

}

const totalDeliveryQtyEl =
document.getElementById("totalDeliveryQty");

if(totalDeliveryQtyEl){

totalDeliveryQtyEl.innerText =
totalQty;

}

console.log("✅ Challan Summary Updated");

}

catch(error){

console.error(

"Summary Error:",

error

);

}

}



//==================================================
// RECENT CHALLAN
//==================================================

async function loadRecentChallan(){

try{

const table =
document.getElementById("recentChallan");

if(!table){

return;

}

table.innerHTML = "";

const q =
query(

collection(db,"challan"),

orderBy("createdAt","desc"),

limit(5)

);

const snapshot =
await getDocs(q);

snapshot.forEach(docItem=>{

const data = docItem.data();

table.innerHTML += `

<tr>

<td>${data.challanNo}</td>

<td>${data.customer}</td>

<td>${data.totalQty}</td>

<td>${data.status}</td>

</tr>

`;

});

}

catch(error){

console.error(error);

}

}



//==================================================
// REFRESH ALL
//==================================================

async function refreshAll(){

await loadChallanHistory();

await loadChallanSummary();

await loadRecentChallan();

if(typeof checkLowStock==="function"){

await checkLowStock();

}

}



//==================================================
// AUTO REFRESH
//==================================================

setInterval(

refreshAll,

60000

);



//==================================================
// PAGE LOAD
//==================================================

window.addEventListener(

"load",

async()=>{

await refreshAll();

console.log("🚀 SHGT Challan Final Ready");

}

);



//==================================================
// END PART-13
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-14
// Data Backup + Import JSON + System Health Check
//==================================================


//==================================================
// EXPORT JSON BACKUP
//==================================================

const exportJsonBtn =
document.getElementById("exportJson");

if(exportJsonBtn){

exportJsonBtn.addEventListener(

"click",

async()=>{

try{

const snapshot =
await getDocs(
collection(db,"challan")
);

const backup = [];

snapshot.forEach(docItem=>{

backup.push({

id:docItem.id,

...docItem.data()

});

});

const blob =
new Blob(

[
JSON.stringify(
backup,
null,
2
)
],

{
type:"application/json"
}

);

const url =
URL.createObjectURL(blob);

const link =
document.createElement("a");

link.href = url;

link.download =
"SHGT_Challan_Backup.json";

link.click();

URL.revokeObjectURL(url);

alert("✅ JSON Backup Exported");

}

catch(error){

console.error(error);

alert("❌ Backup Failed");

}

});

}


//==================================================
// IMPORT JSON
//==================================================

const importJson =
document.getElementById("importJson");

if(importJson){

importJson.addEventListener(

"change",

async(e)=>{

try{

const file =
e.target.files[0];

if(!file){

return;

}

const text =
await file.text();

const data =
JSON.parse(text);

console.log(

"Imported Records:",

data.length

);

alert(

"✅ JSON File Loaded Successfully"

);

}

catch(error){

console.error(error);

alert("❌ Invalid JSON File");

}

});

}


//==================================================
// SYSTEM HEALTH CHECK
//==================================================

async function systemHealthCheck(){

try{

const challan =
await getDocs(
collection(db,"challan")
);

const stock =
await getDocs(
collection(db,"stock")
);

console.log("================================");

console.log("🟢 SYSTEM HEALTH");

console.log(

"📄 Challan :",

challan.size

);

console.log(

"📦 Stock :",

stock.size

);

console.log(

"🔥 Firebase : Connected"

);

console.log("================================");

}

catch(error){

console.error(

"System Health Error:",

error

);

}

}


//==================================================
// AUTO HEALTH CHECK
//==================================================

setInterval(

systemHealthCheck,

300000

);


//==================================================
// PAGE LOAD
//==================================================

window.addEventListener(

"load",

()=>{

systemHealthCheck();

console.log(

"✅ Part-14 Loaded"

);

}

);


//==================================================
// END PART-14
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// CHALLAN MANAGEMENT SYSTEM
// challan.js
// PART-15
// Final Production Loader
//==================================================


//==================================================
// FINAL INITIALIZATION
//==================================================

async function initializeSystem(){

try{

console.log("================================");
console.log("🚀 SHGT Challan System Starting...");
console.log("================================");


//----------------------------------
// Generate Challan No
//----------------------------------

if(typeof generateChallanNumber==="function"){

generateChallanNumber();

}


//----------------------------------
// Add First Row
//----------------------------------

if(

challanBody &&

challanBody.children.length===0

){

addChallanRow();

}


//----------------------------------
// Update Serial
//----------------------------------

if(typeof updateChallanSerial==="function"){

updateChallanSerial();

}


//----------------------------------
// Total Qty
//----------------------------------

if(typeof calculateTotalQty==="function"){

calculateTotalQty();

}


//----------------------------------
// Load History
//----------------------------------

if(typeof loadChallanHistory==="function"){

await loadChallanHistory();

}


//----------------------------------
// Dashboard
//----------------------------------

if(typeof loadChallanSummary==="function"){

await loadChallanSummary();

}

if(typeof loadRecentChallan==="function"){

await loadRecentChallan();

}


//----------------------------------
// Stock Check
//----------------------------------

if(typeof checkLowStock==="function"){

await checkLowStock();

}


//----------------------------------
// Firebase
//----------------------------------

if(typeof checkFirebase==="function"){

await checkFirebase();

}


console.log("================================");
console.log("✅ SHGT CHALLAN SYSTEM READY");
console.log("Version : 2.0 FINAL");
console.log("Developer : SH GLOBAL TECHNOLOGY");
console.log("================================");

}

catch(error){

console.error(

"Initialization Error:",

error

);

}

}


//==================================================
// AUTO REFRESH
//==================================================

setInterval(

async()=>{

try{

if(typeof loadChallanHistory==="function"){

await loadChallanHistory();

}

if(typeof loadChallanSummary==="function"){

await loadChallanSummary();

}

if(typeof loadRecentChallan==="function"){

await loadRecentChallan();

}

}

catch(error){

console.error(

"Auto Refresh Error:",

error

);

}

},

60000

);


//==================================================
// PAGE READY
//==================================================

window.addEventListener(

"DOMContentLoaded",

initializeSystem

);


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

alert(

"System Error. Check Browser Console."

);

}

);


//==================================================
// UNHANDLED PROMISE
//==================================================

window.addEventListener(

"unhandledrejection",

(event)=>{

console.error(

"Promise Error:",

event.reason

);

}

);


//==================================================
// SYSTEM INFO
//==================================================

console.log("================================");
console.log("SH GLOBAL TECHNOLOGY");
console.log("CHALLAN MANAGEMENT SYSTEM");
console.log("Production Version : 2.0");
console.log("Status : READY");
console.log("================================");


//==================================================
// END PART-15
//==================================================
