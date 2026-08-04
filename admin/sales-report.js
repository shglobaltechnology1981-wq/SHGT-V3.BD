//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT MANAGEMENT SYSTEM
// admin/sales-report.js
// Part-1
// Firebase + Elements Setup
//==================================================


import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

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

const invoiceDate =

data.invoiceDate ||
data.date ||
"";

salesData.push({

id: doc.id,

date: invoiceDate,

type: "Invoice",

number: data.invoiceNo || "",

customer:
data.customer ||
data.customerName ||
"",

amount: amount

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

${createActionButtons(item.id,item.number)}

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
//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT MANAGEMENT SYSTEM
// PART-7
// VIEW + EDIT + DELETE + AUTO REFRESH
//==================================================

//==================================================
// VIEW INVOICE
//==================================================

window.viewInvoice = (invoiceNo)=>{

window.location.href =

`../invoice.html?invoiceNo=${invoiceNo}`;

};


//==================================================
// EDIT INVOICE
//==================================================

window.editInvoice = (invoiceNo)=>{

window.location.href =

`../invoice.html?edit=${invoiceNo}`;

};


//==================================================
// DELETE INVOICE
//==================================================

window.deleteInvoice = async(id)=>{

try{

const ok = confirm(

"⚠️ Delete this Invoice?"

);

if(!ok){

return;

}

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

await loadSalesReport();

}

catch(error){

console.error(

"Delete Invoice Error",

error

);

alert(

"❌ Delete Failed"

);

}

};


//==================================================
// ACTION BUTTON
//==================================================

function createActionButtons(id,invoiceNo){

return `

<button
class="action-btn view"
onclick="viewInvoice('${invoiceNo}')">

👁 View

</button>

<button
class="action-btn edit"
onclick="editInvoice('${invoiceNo}')">

✏ Edit

</button>

<button
class="action-btn delete"
onclick="deleteInvoice('${id}')">

🗑 Delete

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

30000

);


//==================================================
// FIRST LOAD
//==================================================

document.addEventListener(

"DOMContentLoaded",

()=>{

loadSalesReport();

});


//==================================================
// END PART-7
//=================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT
// PART-8
// EXPORT EXCEL
//==================================================

const exportExcel =

document.getElementById(
"exportExcel"
);

if(exportExcel){

exportExcel.addEventListener(

"click",

()=>{

if(salesData.length===0){

alert("No Sales Data");

return;

}

const excelData =

salesData.map((item,index)=>({

SL:index+1,

Date:item.date,

Type:item.type,

Invoice:item.number,

Customer:item.customer,

Amount:item.amount

}));

const worksheet =

XLSX.utils.json_to_sheet(excelData);

const workbook =

XLSX.utils.book_new();

XLSX.utils.book_append_sheet(

workbook,

worksheet,

"Sales Report"

);

XLSX.writeFile(

workbook,

"SHGT_Sales_Report.xlsx"

);

}

);

}

//==================================================
// END PART-8
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT
// PART-9
// MONTHLY SALES CHART
//==================================================

async function loadSalesChart(){

try{

const snapshot =
await getDocs(collection(db,"invoice"));

const monthlySales =
Array(12).fill(0);

snapshot.forEach(doc=>{

const data = doc.data();

if(!data.createdAt) return;

const date =

new Date(data.createdAt.seconds*1000);

const month =

date.getMonth();

const amount =

Number(
data.grandTotal||
data.total||
data.amount||
0
);

monthlySales[month] += amount;

});

const ctx =

document.getElementById(
"salesChart"
);

if(!ctx) return;

new Chart(ctx,{

type:"bar",

data:{

labels:[

"Jan","Feb","Mar","Apr",

"May","Jun","Jul","Aug",

"Sep","Oct","Nov","Dec"

],

datasets:[{

label:"Monthly Sales (BDT)",

data:monthlySales,

borderWidth:1

}]

},

options:{

responsive:true,

maintainAspectRatio:false

}

});

}

catch(error){

console.error(

"Sales Chart Error",

error

);

}

}

loadSalesChart();

//==================================================
// END PART-9
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT
// PART-10
// TOP SELLING PRODUCTS
//==================================================

const topProductsTable =
document.getElementById(
"topProductsTable"
);

async function loadTopProducts(){

try{

if(!topProductsTable) return;

topProductsTable.innerHTML="";

const snapshot =
await getDocs(
collection(db,"invoice")
);

const productMap = {};

snapshot.forEach(doc=>{

const data = doc.data();

if(!data.items) return;

data.items.forEach(item=>{

const name =
item.product ||
item.productName ||
"Unknown Product";

const qty =
Number(item.qty)||0;

const total =
Number(item.total)||0;

if(!productMap[name]){

productMap[name]={

qty:0,

amount:0

};

}

productMap[name].qty += qty;

productMap[name].amount += total;

});

});

const products =
Object.entries(productMap)

.sort((a,b)=>

b[1].qty-a[1].qty

)

.slice(0,10);

let sl=1;

products.forEach(([name,value])=>{

topProductsTable.innerHTML += `

<tr>

<td>${sl++}</td>

<td>${name}</td>

<td>${value.qty}</td>

<td>৳ ${value.amount.toFixed(2)}</td>

</tr>

`;

});

}

catch(error){

console.error(

"Top Products Error",

error

);

}

}

loadTopProducts();

//==================================================
// END PART-10
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT
// PART-11
// TOP CUSTOMERS
//==================================================

const topCustomersTable =
document.getElementById(
"topCustomersTable"
);

async function loadTopCustomers(){

try{

if(!topCustomersTable) return;

topCustomersTable.innerHTML="";

const snapshot =

await getDocs(
collection(db,"invoice")
);

const customerMap = {};

snapshot.forEach(doc=>{

const data = doc.data();

const customer =

data.customer ||

data.customerName ||

"Unknown";

const amount =

Number(

data.grandTotal ||

data.total ||

data.amount ||

0

);

if(!customerMap[customer]){

customerMap[customer]={

invoice:0,

amount:0

};

}

customerMap[customer].invoice++;

customerMap[customer].amount += amount;

});

const customers =

Object.entries(customerMap)

.sort((a,b)=>

b[1].amount-a[1].amount

)

.slice(0,10);

let sl=1;

customers.forEach(([name,value])=>{

topCustomersTable.innerHTML += `

<tr>

<td>${sl++}</td>

<td>${name}</td>

<td>${value.invoice}</td>

<td>৳ ${value.amount.toFixed(2)}</td>

</tr>

`;

});

}

catch(error){

console.error(

"Top Customers Error",

error

);

}

}

loadTopCustomers();

//==================================================
// END PART-11
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT
// PART-12
// DUE CUSTOMER REPORT
//==================================================

const dueCustomerTable =
document.getElementById(
"dueCustomerTable"
);

async function loadDueCustomers(){

try{

if(!dueCustomerTable) return;

dueCustomerTable.innerHTML="";

const snapshot =
await getDocs(
collection(db,"invoice")
);

let sl=1;

snapshot.forEach(doc=>{

const data=doc.data();

const customer=

data.customer||
data.customerName||
"Unknown";

const total=

Number(
data.grandTotal||
data.total||
0
);

const paid=

Number(
data.paid||
0
);

const due=

total-paid;

const status=

due>0

?

"🔴 Due"

:

"🟢 Paid";

dueCustomerTable.innerHTML+=`

<tr>

<td>${sl++}</td>

<td>${customer}</td>

<td>৳ ${total.toFixed(2)}</td>

<td>৳ ${paid.toFixed(2)}</td>

<td>৳ ${due.toFixed(2)}</td>

<td>${status}</td>

</tr>

`;

});

}

catch(error){

console.error(

"Due Customer Error",

error

);

}

}

loadDueCustomers();


//==================================================
// AUTO REFRESH
//==================================================

loadSalesReport();

loadSalesChart();

loadTopProducts();

loadTopCustomers();

loadDueCustomers();

loadProfitReport();

setInterval(()=>{

loadSalesReport();

loadSalesChart();

loadTopProducts();

loadTopCustomers();

loadDueCustomers();

loadProfitReport();

},60000);


//==================================================
// END PART-13
//==================================================
//==================================================
// END PART-12
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT
// PART-13
// MONTHLY PROFIT REPORT
//==================================================

const profitReportTable =
document.getElementById(
"profitReportTable"
);

async function loadProfitReport(){

try{

if(!profitReportTable) return;

profitReportTable.innerHTML="";

const invoiceSnap =
await getDocs(
collection(db,"invoice")
);

const expenseSnap =
await getDocs(
collection(db,"expenses")
);

const monthNames=[

"January","February","March","April",

"May","June","July","August",

"September","October","November","December"

];

const salesData=Array(12).fill(0);

const expenseData=Array(12).fill(0);

//==============================
// SALES
//==============================

invoiceSnap.forEach(doc=>{

const data=doc.data();

const date=new Date(

data.invoiceDate||
data.date||
new Date()

);

const month=date.getMonth();

salesData[month]+=Number(

data.grandTotal||
data.total||
0

);

});

//==============================
// EXPENSE
//==============================

expenseSnap.forEach(doc=>{

const data=doc.data();

const date=new Date(

data.date||
new Date()

);

const month=date.getMonth();

expenseData[month]+=Number(

data.amount||
0

);

});

//==============================
// TABLE
//==============================

for(let i=0;i<12;i++){

const profit=

salesData[i]-expenseData[i];

profitReportTable.innerHTML+=`

<tr>

<td>${monthNames[i]}</td>

<td>৳ ${salesData[i].toFixed(2)}</td>

<td>৳ ${expenseData[i].toFixed(2)}</td>

<td>

<b>

৳ ${profit.toFixed(2)}

</b>

</td>

</tr>

`;

}

}

catch(error){

console.error(

"Profit Report Error",

error

);

}

}

loadProfitReport();

//==================================================
// END PART-13
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// SALES REPORT
// PART-14
// SALES ANALYTICS
//==================================================

async function loadAnalytics(){

try{

const invoiceSnap =
await getDocs(collection(db,"invoice"));

const expenseSnap =
await getDocs(collection(db,"expenses"));

let productMap={};

let customerMap={};

let totalQty=0;

let totalSales=0;

let totalExpense=0;

//======================
// SALES
//======================

invoiceSnap.forEach(doc=>{

const data=doc.data();

const customer=

data.customer||
data.customerName||
"Unknown";

const amount=

Number(

data.grandTotal||
data.total||
0

);

totalSales+=amount;

customerMap[customer]=

(customerMap[customer]||0)+amount;

if(data.items){

data.items.forEach(item=>{

const name=

item.product||
item.productName||
"Unknown";

const qty=

Number(item.qty)||0;

productMap[name]=

(productMap[name]||0)+qty;

totalQty+=qty;

});

}

});

//======================
// EXPENSE
//======================

expenseSnap.forEach(doc=>{

const data=doc.data();

totalExpense+=

Number(data.amount)||0;

});

//======================
// BEST PRODUCT
//======================

const bestProduct=

Object.keys(productMap)

.sort((a,b)=>

productMap[b]-productMap[a]

)[0]||"-";

//======================
// BEST CUSTOMER
//======================

const bestCustomer=

Object.keys(customerMap)

.sort((a,b)=>

customerMap[b]-customerMap[a]

)[0]||"-";

//======================
// UPDATE UI
//======================

document.getElementById(

"bestProduct"

).innerText=

bestProduct;

document.getElementById(

"bestCustomer"

).innerText=

bestCustomer;

document.getElementById(

"totalSoldQty"

).innerText=

totalQty;

document.getElementById(

"netProfit"

).innerText=

(totalSales-totalExpense)

.toFixed(2);

}

catch(error){

console.error(

"Analytics Error",

error

);

}

}

loadAnalytics();

//==================================================
// SH GLOBAL TECHNOLOGY
// Sales Report Module
// Part-15 CORRECTED
//==================================================


import { db } from "../js/firebase.js";


import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



// HTML ELEMENT

const reportTable = document.getElementById("reportTable");
const totalSale = document.getElementById("totalSale");



// LOAD SALES REPORT

async function loadSalesReport(){

    try{

        reportTable.innerHTML = "";

        let totalAmount = 0;



        // LOAD INVOICE

        const invoiceQuery = query(
            collection(db,"invoice"),
            orderBy("date","desc")
        );


        const invoiceSnapshot = await getDocs(invoiceQuery);



        invoiceSnapshot.forEach((doc)=>{


            const data = doc.data();


            const amount = Number(
                data.grandTotal ||
                data.total ||
                data.amount ||
                0
            );


            totalAmount += amount;



            reportTable.innerHTML += `

            <tr>

            <td>${data.invoiceNo || "-"}</td>

            <td>${data.customerName || data.customer || "-"}</td>

            <td>${data.date || data.invoiceDate || "-"}</td>

            <td>৳ ${amount}</td>


            <td>
            <button onclick="printInvoice('${doc.id}')">
            🖨 Print
            </button>
            </td>


            </tr>

            `;


        });





        // LOAD CHALLAN


        const challanSnapshot = await getDocs(
            collection(db,"challan")
        );



        challanSnapshot.forEach((doc)=>{


            const data = doc.data();



            reportTable.innerHTML += `


            <tr>

            <td>${data.challanNo || "-"}</td>

            <td>${data.customerName || "-"}</td>

            <td>${data.date || "-"}</td>

            <td>Challan</td>


            <td>

            <button onclick="printChallan('${doc.id}')">

            🖨 Print

            </button>

            </td>


            </tr>


            `;


        });




        if(totalSale){

            totalSale.innerHTML =
            "৳ " + totalAmount;

        }



    }
    catch(error){

        console.error(
            "Sales Report Error:",
            error
        );

    }

}





window.printInvoice = function(id){

    window.location.href =
    "invoice-print.html?id="+id;

};



window.printChallan = function(id){

    window.location.href =
    "challan-print.html?id="+id;

};




// START

loadSalesReport();
