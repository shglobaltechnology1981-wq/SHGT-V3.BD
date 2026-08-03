//==================================================
// SH GLOBAL TECHNOLOGY
// QUOTATION SYSTEM
// quotation.js
// PART-1
//==================================================

import { db } from "../js/firebase.js";

import {

collection,

addDoc,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


//==================================================
// ELEMENTS
//==================================================

const quotationForm =
document.getElementById("quotationForm");

const quotationNo =
document.getElementById("quotationNo");

const quotationDate =
document.getElementById("quotationDate");

const customerName =
document.getElementById("customerName");

const companyName =
document.getElementById("companyName");

const mobile =
document.getElementById("mobile");

const address =
document.getElementById("address");

const grandTotal =
document.getElementById("grandTotal");


//==================================================
// SAVE QUOTATION
//==================================================

if(quotationForm){

quotationForm.addEventListener(

"submit",

async(e)=>{

e.preventDefault();

try{

await addDoc(

collection(db,"quotation"),

{

quotationNo: quotationNo.value,

date: quotationDate.value,

customer: customerName.value,

company: companyName.value,

mobile: mobile.value,

address: address.value,

grandTotal: Number(grandTotal.innerText)||0,

createdAt: serverTimestamp()

}

);

alert("✅ Quotation Saved Successfully");

quotationForm.reset();

grandTotal.innerText="0.00";

}

catch(error){

console.error(error);

alert("❌ Save Failed");

}

}

);

}

//==================================================
// END PART-1
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// QUOTATION SYSTEM
// quotation.js
// PART-2
// Add Item + Auto Total
//==================================================


//==================================================
// ELEMENTS
//==================================================

const addRow =
document.getElementById(
"addRow"
);

const quotationItems =
document.getElementById(
"quotationItems"
);



//==================================================
// ADD NEW ROW
//==================================================

if(addRow){

addRow.addEventListener(

"click",

()=>{

quotationItems.innerHTML += `

<tr>

<td>

<input
type="text"
class="product">

</td>

<td>

<input
type="number"
class="qty"
value="1"
min="1">

</td>

<td>

<input
type="number"
class="price"
value="0"
min="0">

</td>

<td>

<input
type="number"
class="total"
value="0"
readonly>

</td>

</tr>

`;

});

}



//==================================================
// AUTO CALCULATION
//==================================================

document.addEventListener(

"input",

(e)=>{

if(

e.target.classList.contains("qty") ||

e.target.classList.contains("price")

){

const row =
e.target.closest("tr");

const qty =

Number(
row.querySelector(".qty").value
) || 0;

const price =

Number(
row.querySelector(".price").value
) || 0;

const total =
qty * price;

row.querySelector(".total").value =
total.toFixed(2);

calculateGrandTotal();

}

}

);



//==================================================
// GRAND TOTAL
//==================================================

function calculateGrandTotal(){

let grand = 0;

document
.querySelectorAll(".total")
.forEach(item=>{

grand +=

Number(item.value)||0;

});

grandTotal.innerText =
grand.toFixed(2);

}



//==================================================
// END PART-2
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// QUOTATION SYSTEM
// quotation.js
// PART-3
// Save Items + Load List
//==================================================

import {

getDocs

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



//==================================================
// TABLE
//==================================================

const quotationTable =
document.getElementById(
"quotationTable"
);



//==================================================
// SAVE ITEMS ARRAY
//==================================================

if(quotationForm){

quotationForm.addEventListener(

"submit",

async(e)=>{

e.preventDefault();

try{

const items = [];

document.querySelectorAll(

"#quotationItems tr"

).forEach(row=>{

items.push({

product:

row.querySelector(".product").value,

qty:

Number(
row.querySelector(".qty").value
),

price:

Number(
row.querySelector(".price").value
),

total:

Number(
row.querySelector(".total").value
)

});

});

await addDoc(

collection(db,"quotation"),

{

quotationNo:

quotationNo.value,

date:

quotationDate.value,

customer:

customerName.value,

company:

companyName.value,

mobile:

mobile.value,

address:

address.value,

items,

grandTotal:

Number(grandTotal.innerText),

createdAt:

serverTimestamp()

}

);

alert(

"✅ Quotation Saved"

);

quotationForm.reset();

quotationItems.innerHTML="";

grandTotal.innerText="0.00";

loadQuotationList();

}

catch(error){

console.error(

error

);

alert(

"❌ Save Failed"

);

}

}

);

}



//==================================================
// LOAD QUOTATION LIST
//==================================================

async function loadQuotationList(){

if(!quotationTable)

return;

quotationTable.innerHTML="";

const snapshot =

await getDocs(

collection(db,"quotation")

);

snapshot.forEach(docItem=>{

const data =

docItem.data();

quotationTable.innerHTML += `

<tr>

<td>

${data.quotationNo}

</td>

<td>

${data.date}

</td>

<td>

${data.customer}

</td>

<td>

${Number(
data.grandTotal
).toFixed(2)}

</td>

<td>

<button
onclick="viewQuotation('${docItem.id}')">

View

</button>

</td>

</tr>

`;

});

}



//==================================================
// RUN
//==================================================

loadQuotationList();



//==================================================
// END PART-3
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// QUOTATION SYSTEM
// quotation.js
// PART-4
// View + Delete + Print
//==================================================


//==================================================
// VIEW QUOTATION
//==================================================

window.viewQuotation = async(id)=>{

try{

const snapshot =
await getDoc(
doc(db,"quotation",id)
);

if(!snapshot.exists()){

alert("Quotation Not Found");

return;

}

const data =
snapshot.data();

alert(

"Quotation No : " + data.quotationNo +

"\nCustomer : " + data.customer +

"\nGrand Total : " + data.grandTotal +

" BDT"

);

}

catch(error){

console.error(error);

}

};



//==================================================
// DELETE QUOTATION
//==================================================

window.deleteQuotation = async(id)=>{

try{

const ok =

confirm(
"Delete this quotation?"
);

if(!ok) return;

await deleteDoc(

doc(db,"quotation",id)

);

alert(
"✅ Quotation Deleted"
);

loadQuotationList();

}

catch(error){

console.error(error);

alert(
"❌ Delete Failed"
);

}

};



//==================================================
// PRINT
//==================================================

window.printQuotation = ()=>{

window.print();

};



//==================================================
// UPDATE ACTION BUTTON
//==================================================

async function loadQuotationList(){

if(!quotationTable) return;

quotationTable.innerHTML="";

const snapshot =

await getDocs(

collection(db,"quotation")

);

snapshot.forEach(docItem=>{

const data = docItem.data();

quotationTable.innerHTML += `

<tr>

<td>${data.quotationNo}</td>

<td>${data.date}</td>

<td>${data.customer}</td>

<td>${Number(data.grandTotal).toFixed(2)}</td>

<td>

<button onclick="viewQuotation('${docItem.id}')">

👁 View

</button>

<button onclick="deleteQuotation('${docItem.id}')">

🗑 Delete

</button>

<button onclick="printQuotation()">

🖨 Print

</button>

</td>

</tr>

`;

});

}



//==================================================
// END PART-4
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// QUOTATION SYSTEM
// quotation.js
// PART-5
// Search + Filter + PDF + Edit
//==================================================


//==================================================
// ELEMENTS
//==================================================

const searchQuotation =
document.getElementById(
"searchQuotation"
);

const fromDate =
document.getElementById(
"fromDate"
);

const toDate =
document.getElementById(
"toDate"
);

const downloadPDF =
document.getElementById(
"downloadPDF"
);



//==================================================
// SEARCH
//==================================================

if(searchQuotation){

searchQuotation.addEventListener(

"keyup",

()=>{

const value =
searchQuotation.value.toLowerCase();

const rows =
quotationTable.querySelectorAll("tr");

rows.forEach(row=>{

row.style.display =

row.innerText
.toLowerCase()
.includes(value)

?

""

:

"none";

});

}

);

}



//==================================================
// DATE FILTER
//==================================================

window.filterQuotation = ()=>{

const start =
fromDate.value;

const end =
toDate.value;

const rows =
quotationTable.querySelectorAll("tr");

rows.forEach(row=>{

const date =
row.cells[1]?.innerText || "";

if(

(!start || date>=start) &&

(!end || date<=end)

){

row.style.display="";

}

else{

row.style.display="none";

}

});

};




//==================================================
// PDF DOWNLOAD
//==================================================

if(downloadPDF){

downloadPDF.addEventListener(

"click",

()=>{

window.print();

}

);

}



//==================================================
// EDIT
//==================================================

window.editQuotation=(id)=>{

window.location.href=

`edit-quotation.html?id=${id}`;

};



//==================================================
// END PART-5
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// QUOTATION SYSTEM
// quotation.js
// PART-6 FINAL
// Auto Number + Dashboard Update
//==================================================


//==================================================
// AUTO QUOTATION NUMBER
//==================================================

async function generateQuotationNo(){

const snapshot =
await getDocs(
collection(db,"quotation")
);

const nextNo =
snapshot.size + 1;

quotationNo.value =
"QT-" +
String(nextNo).padStart(5,"0");

}

generateQuotationNo();



//==================================================
// DUPLICATE CHECK
//==================================================

async function quotationExists(no){

const snapshot =
await getDocs(
collection(db,"quotation")
);

let found = false;

snapshot.forEach(doc=>{

if(doc.data().quotationNo===no){

found=true;

}

});

return found;

}



//==================================================
// EXPORT CSV
//==================================================

window.exportQuotationCSV=()=>{

let csv =

"Quotation No,Date,Customer,Total\n";

const rows =
quotationTable.querySelectorAll("tr");

rows.forEach(row=>{

const cols =
row.querySelectorAll("td");

if(cols.length>=4){

csv +=

`${cols[0].innerText},${cols[1].innerText},${cols[2].innerText},${cols[3].innerText}\n`;

}

});

const blob =
new Blob([csv],{
type:"text/csv"
});

const a =
document.createElement("a");

a.href =
URL.createObjectURL(blob);

a.download =
"quotation-report.csv";

a.click();

};



//==================================================
// REFRESH DASHBOARD
//==================================================

function refreshDashboardData(){

if(window.opener){

window.opener.location.reload();

}

}



//==================================================
// AFTER SAVE
//==================================================

setTimeout(()=>{

refreshDashboardData();

},1000);



//==================================================
// SYSTEM READY
//==================================================

console.log(
"✅ SHGT Quotation System Ready"
);


//==================================================
// END PART-6
//==================================================

