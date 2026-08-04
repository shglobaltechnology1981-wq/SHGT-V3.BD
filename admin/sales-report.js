//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT MANAGEMENT SYSTEM
// admin/sales-report.js
// Part-1
// Firebase + Elements Setup
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
getDocs

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";




//==================================================
// DASHBOARD ELEMENT
//==================================================


const totalSales =

document.getElementById("totalSales");


const todaySales =

document.getElementById("todaySales");


const monthlySales =

document.getElementById("monthlySales");


const totalInvoice =

document.getElementById("totalInvoice");





//==================================================
// FILTER ELEMENT
//==================================================


const fromDate =

document.getElementById("fromDate");


const toDate =

document.getElementById("toDate");


const reportType =

document.getElementById("reportType");


const searchReport =

document.getElementById("searchReport");





//==================================================
// TABLE ELEMENT
//==================================================


const salesTable =

document.getElementById("salesTable");





//==================================================
// SEARCH
//==================================================


const searchSales =

document.getElementById("searchSales");





//==================================================
// BUTTON
//==================================================


const printReport =

document.getElementById("printReport");


const downloadReportPDF =

document.getElementById("downloadReportPDF");





//==================================================
// GLOBAL VARIABLE
//==================================================


let salesData = [];





//==================================================
// DATE DEFAULT
//==================================================


function setDefaultDate(){


const today =

new Date()

.toISOString()

.split("T")[0];



if(fromDate)

fromDate.value = today;



if(toDate)

toDate.value = today;



}





//==================================================
// INITIAL LOAD
//==================================================


setDefaultDate();





console.log(

"✅ SHGT Sales Report Part-1 Loaded"

);



//==================================================
// END PART-1
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT MANAGEMENT SYSTEM
// admin/sales-report.js
// PART-2
// LOAD SALES REPORT FINAL
//==================================================

async function loadSalesReport(){

try{

salesTable.innerHTML="";

salesData=[];

let sl=0;

let salesTotal=0;

let todayTotal=0;

let monthTotal=0;

const today=
new Date().toISOString().split("T")[0];

const currentMonth=
new Date().getMonth();

const currentYear=
new Date().getFullYear();


//==================================================
// LOAD INVOICE
//==================================================

const invoiceSnapshot=

await getDocs(
collection(db,"invoice")
);


invoiceSnapshot.forEach(doc=>{

const data=doc.data();

const amount=

Number(
data.grandTotal||
data.total||
data.amount||
0
);

const invoiceDate=

data.invoiceDate||
data.date||
"";

salesData.push({

date:invoiceDate,

type:"Invoice",

number:data.invoiceNo||"",

customer:
data.customer||
data.customerName||
"",

amount:amount

});

});


//==================================================
// LOAD CHALLAN
//==================================================

const challanSnapshot=

await getDocs(
collection(db,"challan")
);

challanSnapshot.forEach(doc=>{

const data=doc.data();

let amount=0;

(data.items||[]).forEach(item=>{

amount +=
(Number(item.qty)||0)*
(Number(item.price)||0);

});

salesData.push({

date:data.challanDate||
data.date||
"",

type:"Challan",

number:data.challanNo||"",

customer:
data.customer||
data.customerName||
"",

amount:amount

});

});


//==================================================
// LOAD ISSUE
//==================================================

const issueSnapshot=

await getDocs(
collection(db,"issue")
);

issueSnapshot.forEach(doc=>{

const data=doc.data();

salesData.push({

date:data.issueDate||
data.date||
"",

type:"Issue",

number:data.issueNo||"",

customer:
data.customer||
data.customerName||
"",

amount:Number(data.grandTotal||data.amount||0)

});

});


//==================================================
// SORT BY DATE
//==================================================

salesData.sort((a,b)=>

new Date(b.date)-new Date(a.date)

);


//==================================================
// TABLE
//==================================================

salesData.forEach(item=>{

sl++;

salesTotal += item.amount;

const d = new Date(item.date);

if(item.date === today){

todayTotal += item.amount;

}

if(

d.getMonth() === currentMonth &&

d.getFullYear() === currentYear

){

monthTotal += item.amount;

}

salesTable.innerHTML += `

<tr>

<td>

${sl}

</td>

<td>

${item.date}

</td>

<td>

${item.type}

</td>

<td>

${item.number}

</td>

<td>

${item.customer}

</td>

<td>

৳ ${item.amount.toFixed(2)}

</td>

<td>

${createViewButton(item.number)}

</td>

</tr>

`;

});

//==================================================
// SUMMARY
//==================================================

if(totalSales)

totalSales.innerHTML=

salesTotal.toFixed(2);

if(todaySales)

todaySales.innerHTML=

todayTotal.toFixed(2);

if(monthlySales)

monthlySales.innerHTML=

monthTotal.toFixed(2);

if(totalInvoice)

totalInvoice.innerHTML=

invoiceSnapshot.size;

}

catch(error){

console.error(

"Sales Report Error",

error

);

}

}

loadSalesReport();


//==================================================
// END PART-2
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT MANAGEMENT SYSTEM
// admin/sales-report.js
// Part-3
// Filter + Search System
//==================================================



//==================================================
// FILTER REPORT
//==================================================


function filterSalesReport(){


let filteredData = salesData;



//==============================
// TYPE FILTER
//==============================


if(reportType.value !== "all"){


filteredData = filteredData.filter(item=>{


return item.type.toLowerCase()

===

reportType.value.toLowerCase();



});


}






//==============================
// DATE FILTER
//==============================


if(fromDate.value){


filteredData = filteredData.filter(item=>{


return item.date >= fromDate.value;



});


}




if(toDate.value){


filteredData = filteredData.filter(item=>{


return item.date <= toDate.value;



});


}







//==============================
// SEARCH FILTER
//==============================


const keyword =

searchSales.value.toLowerCase();



if(keyword){


filteredData = filteredData.filter(item=>{


let text =

(

item.customer +

" " +

item.number +

" " +

item.type

)

.toLowerCase();



return text.includes(keyword);



});



}






displayFilteredReport(filteredData);



}








//==================================================
// DISPLAY FILTER RESULT
//==================================================


function displayFilteredReport(data){



salesTable.innerHTML="";



let sl = 0;


let total = 0;




data.forEach(item=>{


sl++;


total += Number(item.amount)||0;



salesTable.innerHTML += `


<tr>


<td>

${sl}

</td>



<td>

${item.date || ""}

</td>



<td>

${item.type}

</td>



<td>

${item.number || ""}

</td>



<td>

${item.customer || ""}

</td>



<td>

৳ ${Number(item.amount).toFixed(2)}

</td>



<td>


<button class="viewReportBtn">

View

</button>


</td>



</tr>



`;



});





if(totalSales)

totalSales.innerHTML =

total.toFixed(2);



}







//==================================================
// SEARCH BUTTON
//==================================================


if(searchReport){


searchReport.addEventListener(

"click",

()=>{


filterSalesReport();



}

);



}







//==================================================
// LIVE SEARCH
//==================================================


if(searchSales){


searchSales.addEventListener(

"keyup",

()=>{


filterSalesReport();



}

);



}






//==================================================
// END PART-3
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT
// PART-4
// PRINT + PDF
//==================================================

// ELEMENTS
const printReportBtn =
document.getElementById("printReport");

const downloadPDFBtn =
document.getElementById("downloadPDF");


//==================================================
// PRINT REPORT
//==================================================

if(printReportBtn){

printReportBtn.addEventListener(

"click",

()=>{

window.print();

}

);

}


//==================================================
// DOWNLOAD PDF
//==================================================

if(downloadPDFBtn){

downloadPDFBtn.addEventListener(

"click",

async()=>{

try{

const report =

document.querySelector(".table-box");

if(!report){

alert("Report Not Found");

return;

}

const canvas =

await html2canvas(report,{

scale:2,

useCORS:true,

backgroundColor:"#ffffff"

});

const imgData =

canvas.toDataURL("image/png");

const { jsPDF } = window;

const pdf =

new jsPDF("p","mm","a4");

const pageWidth =

pdf.internal.pageSize.getWidth();

const pageHeight =

(canvas.height * pageWidth)

/ canvas.width;

pdf.addImage(

imgData,

"PNG",

0,

0,

pageWidth,

pageHeight

);

pdf.save(

"Sales_Report.pdf"

);

}

catch(error){

console.error(

"PDF Error",

error

);

alert(

"PDF Download Failed"

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
// SALES REPORT MANAGEMENT SYSTEM
// PART-5
// CSV EXPORT
//==================================================

//==================================================
// EXPORT BUTTON
//==================================================

const exportCSV =
document.getElementById(
"exportCSV"
);


//==================================================
// EXPORT CSV
//==================================================

if(exportCSV){

exportCSV.addEventListener(

"click",

()=>{

if(salesData.length===0){

alert("No Data Found");

return;

}

let csv =

"SL,Date,Type,Invoice No,Customer,Amount\n";

salesData.forEach((item,index)=>{

csv +=

`${index+1},${item.date},${item.type},${item.number},${item.customer},${item.amount}\n`;

});

const blob =

new Blob(

[csv],

{

type:"text/csv"

}

);

const url =

URL.createObjectURL(blob);

const a =

document.createElement("a");

a.href = url;

a.download =

"SHGT-Sales-Report.csv";

a.click();

URL.revokeObjectURL(url);

});

}

//==================================================
// END PART-5
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT MANAGEMENT SYSTEM
// PART-6
// REFRESH + VIEW
//==================================================

//==================================================
// REFRESH REPORT
//==================================================

const refreshReport =
document.getElementById(
"refreshReport"
);

if(refreshReport){

refreshReport.addEventListener(

"click",

async()=>{

await loadSalesReport();

alert(
"✅ Sales Report Refreshed"
);

}

);

}


//==================================================
// VIEW INVOICE
//==================================================

window.viewInvoice=(invoiceNo)=>{

window.location.href=

`../invoice.html?invoiceNo=${invoiceNo}`;

};


//==================================================
// TABLE BUTTON UPDATE
//==================================================

function createViewButton(invoiceNo){

return `

<button

class="action-btn"

onclick="viewInvoice('${invoiceNo}')">

👁 View

</button>

`;

}


//==================================================
// AUTO REFRESH
//==================================================

setInterval(

()=>{

loadSalesReport();

},

60000

);


//==================================================
// FIRST LOAD
//==================================================

document.addEventListener(

"DOMContentLoaded",

()=>{

loadSalesReport();

}

);


//==================================================
// END PART-6
//==================================================


