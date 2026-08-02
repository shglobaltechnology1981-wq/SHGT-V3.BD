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
// Part-2
// Load Invoice + Challan + Issue Data
//==================================================



//==================================================
// LOAD SALES REPORT
//==================================================


async function loadSalesReport(){


try{


salesTable.innerHTML="";


salesData=[];



let sl = 0;


let salesTotal = 0;


let invoiceCount = 0;


let todayTotal = 0;


let monthTotal = 0;




const today =

new Date()

.toISOString()

.split("T")[0];



const month =

new Date()

.getMonth();





//==================================================
// INVOICE COLLECTION
//==================================================


const invoiceSnapshot =

await getDocs(

collection(db,"invoice")

);



invoiceSnapshot.forEach(item=>{



const data = item.data();



let amount =

Number(data.grandTotal)||0;



salesData.push({

date:data.date,

type:"Invoice",

number:data.invoiceNo,

customer:data.customer,

amount:amount

});



});





//==================================================
// CHALLAN COLLECTION
//==================================================


const challanSnapshot =

await getDocs(

collection(db,"challan")

);



challanSnapshot.forEach(item=>{


const data = item.data();



let amount = 0;



(data.items || []).forEach(product=>{


amount +=

(Number(product.qty)||0) *

(Number(product.price)||0);



});




salesData.push({

date:data.date,

type:"Challan",

number:data.challanNo,

customer:data.customer,

amount:amount

});



});






//==================================================
// ISSUE COLLECTION
//==================================================


const issueSnapshot =

await getDocs(

collection(db,"issue")

);



issueSnapshot.forEach(item=>{


const data = item.data();



salesData.push({

date:data.date,

type:"Issue",

number:data.issueNo,

customer:data.customer,

amount:Number(data.amount)||0

});



});







//==================================================
// CREATE TABLE
//==================================================


salesData.forEach(data=>{


sl++;



salesTotal += data.amount;



if(data.date===today){


todayTotal += data.amount;


}





salesTable.innerHTML += `


<tr>


<td>

${sl}

</td>


<td>

${data.date || ""}

</td>


<td>

${data.type}

</td>


<td>

${data.number || ""}

</td>


<td>

${data.customer || ""}

</td>


<td>

৳ ${data.amount.toFixed(2)}

</td>


<td>


<button class="viewReportBtn">

View

</button>


</td>



</tr>


`;



});







//==================================================
// DASHBOARD UPDATE
//==================================================


if(totalSales)

totalSales.innerHTML =

salesTotal.toFixed(2);



if(todaySales)

todaySales.innerHTML =

todayTotal.toFixed(2);



if(monthlySales)

monthlySales.innerHTML =

salesTotal.toFixed(2);



if(totalInvoice)

totalInvoice.innerHTML =

invoiceSnapshot.size;



}



catch(error){


console.error(

"Sales Report Load Error",

error

);


}



}






//==================================================
// START LOAD
//==================================================


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
// SALES REPORT MANAGEMENT SYSTEM
// admin/sales-report.js
// Part-4
// Print + PDF + Final
//==================================================



//==================================================
// PRINT REPORT
//==================================================


if(printReport){


printReport.addEventListener(

"click",

()=>{


window.print();



}

);



}






//==================================================
// DOWNLOAD PDF REPORT
//==================================================


if(downloadReportPDF){


downloadReportPDF.addEventListener(

"click",

async()=>{


try{



const report =

document.querySelector(".table-box");



if(!report){


alert(

"Report Table Not Found"

);


return;

}





const canvas =

await html2canvas(

report,

{


scale:2,


backgroundColor:"#ffffff"


}

);





const imgData =

canvas.toDataURL(

"image/png"

);





const {jsPDF}=window.jspdf;



const pdf =

new jsPDF(

"p",

"mm",

"a4"

);





const width =

pdf.internal.pageSize.getWidth();



const height =

(canvas.height * width)

/

canvas.width;





pdf.addImage(

imgData,

"PNG",

0,

10,

width,

height

);





pdf.save(

"SHGT-Sales-Report.pdf"

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
// VIEW REPORT BUTTON
//==================================================


document.addEventListener(

"click",

(e)=>{


if(

e.target.classList.contains("viewReportBtn")

){


alert(

"Report Details Available In Invoice / Challan / Issue Module"

);



}



}

);







//==================================================
// FINAL READY
//==================================================


console.log(

"✅ SHGT Sales Report System Loaded Successfully"

);




//==================================================
// END PART-4
//==================================================

