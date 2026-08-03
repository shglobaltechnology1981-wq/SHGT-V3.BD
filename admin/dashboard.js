//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// FINAL ERP VERSION
// PART-1
// Firebase + Login Check + Elements
//==================================================



//==================================================
// FIREBASE IMPORT
//==================================================


import { auth, db } 
from "../js/firebase.js";



import {

onAuthStateChanged,

signOut

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";



import {

collection,

getDocs,

query,

orderBy,

limit

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";





//==================================================
// HTML ELEMENTS
//==================================================


const logoutBtn =

document.getElementById(
"logoutBtn"
);



const adminEmail =

document.getElementById(
"adminEmail"
);



const loginUser =

document.getElementById(
"loginUser"
);



const dashboardDate =

document.getElementById(
"dashboardDate"
);







//==================================================
// LOGIN CHECK
//==================================================


onAuthStateChanged(

auth,

(user)=>{


if(user){


if(adminEmail){

adminEmail.innerText =
user.email;

}



if(loginUser){

loginUser.innerText =
user.email;

}



}

else{


window.location.href =
"login.html";


}



}

);






//==================================================
// LOGOUT
//==================================================


if(logoutBtn){


logoutBtn.addEventListener(

"click",

async()=>{


await signOut(auth);


window.location.href =
"login.html";


}


);


}






//==================================================
// DATE
//==================================================


if(dashboardDate){


dashboardDate.innerText =

new Date()

.toLocaleString();


}





//==================================================
// END PART-1
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-2
// Product + Spare Parts Summary
//==================================================



//==================================================
// ELEMENTS
//==================================================


const totalProducts =

document.getElementById(
"totalProducts"
);



const totalParts =

document.getElementById(
"totalParts"
);







//==================================================
// LOAD PRODUCT COUNT
//==================================================


async function loadProductCount(){


try{


const snapshot =

await getDocs(

collection(db,"products")

);



if(totalProducts){

totalProducts.innerText =

snapshot.size;

}



}


catch(error){


console.error(

"Product Count Error",

error

);


}



}








//==================================================
// LOAD SPARE PART COUNT
//==================================================


async function loadSparePartCount(){


try{


const snapshot =

await getDocs(

collection(db,"spare-parts")

);



if(totalParts){


totalParts.innerText =

snapshot.size;


}



}


catch(error){


console.error(

"Spare Parts Count Error",

error

);


}



}







//==================================================
// RUN
//==================================================


loadProductCount();


loadSparePartCount();





//==================================================
// END PART-2
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-3
// Quotation + Invoice + Challan Summary
//==================================================



//==================================================
// ELEMENTS
//==================================================


const totalQuotation =

document.getElementById(
"totalQuotation"
);



const totalInvoice =

document.getElementById(
"totalInvoice"
);



const totalChallan =

document.getElementById(
"totalChallan"
);






//==================================================
// LOAD QUOTATION COUNT
//==================================================


async function loadQuotationCount(){


try{


const snapshot =

await getDocs(

collection(db,"quotation")

);



if(totalQuotation){


totalQuotation.innerText =

snapshot.size;


}



}


catch(error){


console.error(

"Quotation Count Error",

error

);


}



}








//==================================================
// LOAD INVOICE COUNT
//==================================================


async function loadInvoiceCount(){


try{


const snapshot =

await getDocs(

collection(db,"invoice")

);



if(totalInvoice){


totalInvoice.innerText =

snapshot.size;


}



}


catch(error){


console.error(

"Invoice Count Error",

error

);


}



}








//==================================================
// LOAD CHALLAN COUNT
//==================================================


async function loadChallanCount(){


try{


const snapshot =

await getDocs(

collection(db,"challan")

);



if(totalChallan){


totalChallan.innerText =

snapshot.size;


}



}


catch(error){


console.error(

"Challan Count Error",

error

);


}



}







//==================================================
// RUN
//==================================================


loadQuotationCount();


loadInvoiceCount();


loadChallanCount();






//==================================================
// END PART-3
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-4
// Stock Summary + Low Stock Alert
//==================================================



//==================================================
// ELEMENTS
//==================================================


const totalStock =

document.getElementById(
"totalStock"
);



const lowStock =

document.getElementById(
"lowStock"
);



const lowStockTable =

document.getElementById(
"lowStockTable"
);






//==================================================
// LOAD STOCK SUMMARY
//==================================================


async function loadStockSummary(){


try{


const snapshot =

await getDocs(

collection(db,"stock")

);




let total = 0;

let low = 0;





if(lowStockTable){

lowStockTable.innerHTML="";

}






snapshot.forEach(item=>{


const data = item.data();



const qty =

Number(data.quantity)||0;



total += qty;





if(qty <= 5){


low++;





if(lowStockTable){



lowStockTable.innerHTML += `

<tr>

<td>

${data.productName || ""}

</td>


<td>

${data.brand || ""}

</td>


<td>

${qty}

</td>


<td>

⚠️ Low Stock

</td>


</tr>

`;



}



}




});







if(totalStock){


totalStock.innerText =

total;


}




if(lowStock){


lowStock.innerText =

low;


}



}


catch(error){


console.error(

"Stock Summary Error",

error

);


}



}







//==================================================
// RUN
//==================================================


loadStockSummary();





//==================================================
// END PART-4
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-5
// Recent Products Load
// Cloudinary Image Support
//==================================================



//==================================================
// ELEMENT
//==================================================


const recentProducts =

document.getElementById(
"recentProducts"
);






//==================================================
// LOAD RECENT PRODUCTS
//==================================================


async function loadRecentProducts(){


try{


if(!recentProducts)

return;



recentProducts.innerHTML="";





const q =

query(

collection(db,"products"),

orderBy(

"createdAt",

"desc"

),

limit(10)

);






const snapshot =

await getDocs(q);






if(snapshot.empty){


recentProducts.innerHTML = `

<tr>

<td colspan="7">

No Product Found

</td>

</tr>

`;

return;


}






snapshot.forEach(item=>{


const data = item.data();





// Cloudinary Image

const productImage =

data.imageUrl ||

data.image ||

data.cloudinaryUrl ||

"../images/no-image.png";







const productName =

data.name ||

data.productName ||

"";







const stockQty =

data.stock ||

data.quantity ||

0;







recentProducts.innerHTML += `

<tr>



<td>

<img

src="${productImage}"

alt="Product Image"

loading="lazy"

onerror="this.src='../images/no-image.png'">

</td>




<td>

${productName}

</td>





<td>

${data.brand || ""}

</td>





<td>

${data.category || ""}

</td>





<td>

${stockQty}

</td>





<td>

${data.status || "Active"}

</td>





<td>



<button

class="action-btn edit"

onclick="editProduct('${item.id}')">

✏ Edit

</button>




<button

class="action-btn delete"

onclick="deleteProduct('${item.id}')">

🗑 Delete

</button>



</td>



</tr>

`;





});



}


catch(error){


console.error(

"Recent Product Error",

error

);


}



}








//==================================================
// END PART-5
//==================================================
       
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-6
// Recent Challan + Invoice
//==================================================



//==================================================
// ELEMENTS
//==================================================


const recentChallan =

document.getElementById(
"recentChallan"
);



const recentInvoice =

document.getElementById(
"recentInvoice"
);






//==================================================
// LOAD RECENT CHALLAN
//==================================================


async function loadRecentChallan(){


try{


if(!recentChallan)

return;



recentChallan.innerHTML="";



const q =

query(

collection(db,"challan"),

orderBy(

"createdAt",

"desc"

),

limit(10)

);




const snapshot =

await getDocs(q);





if(snapshot.empty){


recentChallan.innerHTML = `

<tr>

<td colspan="5">

No Challan Found

</td>

</tr>

`;

return;


}





snapshot.forEach(item=>{


const data = item.data();



recentChallan.innerHTML += `

<tr>


<td>

${data.challanNo || ""}

</td>


<td>

${data.date || data.challanDate || ""}

</td>


<td>

${data.customer || data.customerName || ""}

</td>


<td>

${data.company || data.companyName || ""}

</td>


<td>


<button

class="action-btn"

onclick="viewChallan('${item.id}')">

View

</button>


</td>


</tr>

`;



});



}

catch(error){


console.error(

"Challan Load Error",

error

);


}



}








//==================================================
// LOAD RECENT INVOICE
//==================================================


async function loadRecentInvoice(){


try{


if(!recentInvoice)

return;



recentInvoice.innerHTML="";




const q =

query(

collection(db,"invoice"),

orderBy(

"createdAt",

"desc"

),

limit(10)

);




const snapshot =

await getDocs(q);





if(snapshot.empty){


recentInvoice.innerHTML = `

<tr>

<td colspan="5">

No Invoice Found

</td>

</tr>

`;

return;


}





snapshot.forEach(item=>{


const data = item.data();



recentInvoice.innerHTML += `

<tr>


<td>

${data.invoiceNo || ""}

</td>


<td>

${data.date || ""}

</td>


<td>

${data.customer || data.customerName || ""}

</td>


<td>

${data.amount || data.total || 0}

</td>


<td>


<button

class="action-btn"

onclick="viewInvoice('${item.id}')">

View

</button>


</td>


</tr>

`;



});



}


catch(error){


console.error(

"Invoice Load Error",

error

);


}



}








//==================================================
// RUN
//==================================================


loadRecentChallan();


loadRecentInvoice();





//==================================================
// END PART-6
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-7
// Sales Summary
//==================================================



//==================================================
// ELEMENTS
//==================================================


const todaySales =

document.getElementById(
"todaySales"
);



const monthlySales =

document.getElementById(
"monthlySales"
);



const grandSales =

document.getElementById(
"grandSales"
);



const totalSales =

document.getElementById(
"totalSales"
);






//==================================================
// LOAD SALES SUMMARY
//==================================================


async function loadSalesSummary(){


try{


const snapshot =

await getDocs(

collection(db,"invoice")

);





let total = 0;

let today = 0;

let month = 0;





const now = new Date();


const todayDate =

now.toLocaleDateString();



const currentMonth =

now.getMonth();



const currentYear =

now.getFullYear();







snapshot.forEach(item=>{


const data = item.data();




const amount =

Number(

data.amount ||

data.total ||

data.grandTotal ||

0

);





total += amount;






const invoiceDate =

data.createdAt ?

new Date(
data.createdAt.seconds * 1000
)

:

null;





if(invoiceDate){



if(

invoiceDate.toLocaleDateString()

=== todayDate

){

today += amount;

}



if(

invoiceDate.getMonth()

=== currentMonth &&

invoiceDate.getFullYear()

=== currentYear

){

month += amount;

}



}



});







if(todaySales){

todaySales.innerText =

today.toFixed(2);

}



if(monthlySales){

monthlySales.innerText =

month.toFixed(2);

}



if(grandSales){

grandSales.innerText =

total.toFixed(2);

}



if(totalSales){

totalSales.innerText =

total.toFixed(2);

}



}


catch(error){


console.error(

"Sales Summary Error",

error

);


}



}







//==================================================
// RUN
//==================================================


loadSalesSummary();





//==================================================
// END PART-7
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-8
// Mobile Menu + Dashboard Loader
//==================================================



//==================================================
// MOBILE MENU
//==================================================


const mobileMenuBtn =

document.getElementById(
"mobileMenuBtn"
);



const sidebar =

document.querySelector(
".sidebar"
);





if(mobileMenuBtn && sidebar){


mobileMenuBtn.addEventListener(

"click",

()=>{


sidebar.classList.toggle(
"active"
);


}

);


}








//==================================================
// DASHBOARD MAIN LOADER
//==================================================


async function loadDashboard(){


console.log(
"Loading Dashboard..."
);



try{



await loadProductCount();



await loadSparePartCount();



await loadQuotationCount();



await loadInvoiceCount();



await loadChallanCount();



await loadStockSummary();



await loadRecentProducts();



await loadRecentChallan();



await loadRecentInvoice();



await loadSalesSummary();





console.log(
"Dashboard Loaded Successfully"
);



}

catch(error){


console.error(

"Dashboard Load Error",

error

);


}



}







//==================================================
// AUTO REFRESH
//==================================================


setInterval(

()=>{


loadDashboard();


},

60000

);






//==================================================
// START DASHBOARD
//==================================================


loadDashboard();






//==================================================
// END PART-8
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-9
// Product Edit + Delete
//==================================================



//==================================================
// FIRESTORE DELETE IMPORT
//==================================================


import {

deleteDoc,

doc

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";







//==================================================
// DELETE PRODUCT
//==================================================


window.deleteProduct = async(id)=>{


try{


const confirmDelete =

confirm(

"Delete this Product?"

);



if(!confirmDelete)

return;





await deleteDoc(

doc(

db,

"products",

id

)

);





alert(

"✅ Product Deleted"

);





loadRecentProducts();



loadProductCount();



}



catch(error){


console.error(

"Delete Product Error",

error

);



alert(

"❌ Delete Failed"

);



}



};









//==================================================
// EDIT PRODUCT
//==================================================


window.editProduct = (id)=>{


window.location.href =

`edit-product.html?id=${id}`;



};







//==================================================
// VIEW CHALLAN
//==================================================


window.viewChallan = (id)=>{


window.location.href =

`challan.html?id=${id}`;



};







//==================================================
// VIEW INVOICE
//==================================================


window.viewInvoice = (id)=>{


window.location.href =

`invoice.html?id=${id}`;



};






//==================================================
// END PART-9
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-10
// Dashboard Security + Keyboard Protection
//==================================================


//==================================================
// DISABLE RIGHT CLICK
//==================================================

document.addEventListener(

"contextmenu",

(e)=>{

e.preventDefault();

}

);




//==================================================
// DISABLE F12
//==================================================

document.addEventListener(

"keydown",

(e)=>{

if(e.key==="F12"){

e.preventDefault();

}

}

);




//==================================================
// DISABLE CTRL + SHIFT + I
//==================================================

document.addEventListener(

"keydown",

(e)=>{

if(

e.ctrlKey &&

e.shiftKey &&

(e.key==="I" || e.key==="i")

){

e.preventDefault();

}

}

);




//==================================================
// DISABLE CTRL + SHIFT + J
//==================================================

document.addEventListener(

"keydown",

(e)=>{

if(

e.ctrlKey &&

e.shiftKey &&

(e.key==="J" || e.key==="j")

){

e.preventDefault();

}

}

);




//==================================================
// DISABLE CTRL + U
//==================================================

document.addEventListener(

"keydown",

(e)=>{

if(

e.ctrlKey &&

(e.key==="U" || e.key==="u")

){

e.preventDefault();

}

}

);




//==================================================
// DISABLE CTRL + SHIFT + C
//==================================================

document.addEventListener(

"keydown",

(e)=>{

if(

e.ctrlKey &&

e.shiftKey &&

(e.key==="C" || e.key==="c")

){

e.preventDefault();

}

}

);




//==================================================
// READY
//==================================================

console.log(

"Dashboard Security Enabled"

);


//==================================================
// END PART-10
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-11
// Firebase Connection Check + Global Error Handler
//==================================================


//==================================================
// FIREBASE CONNECTION CHECK
//==================================================

async function firebaseCheck(){

try{

const snapshot =

await getDocs(

collection(
db,
"products"
)

);

console.log(

"Firebase Connected Successfully"

);

console.log(

"Total Products :",

snapshot.size

);

}

catch(error){

console.error(

"Firebase Connection Failed",

error

);

}

}




//==================================================
// RUN FIREBASE CHECK
//==================================================

firebaseCheck();




//==================================================
// GLOBAL ERROR HANDLER
//==================================================

window.addEventListener(

"error",

(event)=>{

console.error(

"Dashboard Error:",

event.message

);

console.error(

event.error

);

}

);




//==================================================
// UNHANDLED PROMISE ERROR
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
// DASHBOARD READY
//==================================================

console.log("================================");

console.log("SH GLOBAL TECHNOLOGY");

console.log("ADMIN DASHBOARD READY");

console.log("Firebase Connected");

console.log("================================");




//==================================================
// END PART-11
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-12
// Export Product Backup CSV
//==================================================


//==================================================
// HTML ELEMENT
//==================================================

const exportProductBtn =
document.getElementById("exportProductBtn");


//==================================================
// EXPORT CSV
//==================================================

if(exportProductBtn){

exportProductBtn.addEventListener(

"click",

async()=>{

try{

const snapshot =

await getDocs(

collection(
db,
"products"
)

);


let csv =

"Name,Brand,Category,Status,Image\n";


snapshot.forEach((item)=>{

const data =
item.data();

csv +=

`"${data.name || ""}",`+

`"${data.brand || ""}",`+

`"${data.category || ""}",`+

`"${data.status || ""}",`+

`"${data.image || ""}"\n`;

});


const blob =

new Blob(

[csv],

{

type:"text/csv;charset=utf-8;"

}

);


const url =

URL.createObjectURL(blob);


const link =

document.createElement("a");


link.href = url;

link.download =

"SHGT_Product_Backup.csv";


document.body.appendChild(link);

link.click();

document.body.removeChild(link);

URL.revokeObjectURL(url);


alert(

"✅ Product Backup Export Successfully"

);


}

catch(error){

console.error(

"Export Error:",

error

);

alert(

"❌ Export Failed"

);

}

});

}



//==================================================
// READY
//==================================================

console.log(

"Product Backup Export Ready"

);


//==================================================
// END PART-12
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-13
// Final Ready Check + Dashboard Loader
//==================================================


//==================================================
// REQUIRED HTML ELEMENT CHECK
//==================================================

function dashboardElementCheck(){

const elements = [

"totalProducts",

"totalParts",

"totalQuotation",

"totalImages",

"productTable",

"sparePartTable",

"recentProducts",

"logoutBtn"

];


elements.forEach((id)=>{

const element =
document.getElementById(id);

if(element){

console.log(
"✔ Element Found:",
id
);

}else{

console.warn(
"✖ Missing Element:",
id
);

}

});

}



//==================================================
// WINDOW LOAD
//==================================================

window.addEventListener(

"load",

async()=>{

dashboardElementCheck();

await loadDashboard();

console.log("================================");
console.log(" SH GLOBAL TECHNOLOGY ");
console.log(" ADMIN DASHBOARD READY ");
console.log(" All Modules Loaded Successfully ");
console.log("================================");

}

);




//==================================================
// AUTO REFRESH
//==================================================

setInterval(

()=>{

loadDashboard();

},

60000

);




//==================================================
// PAGE TITLE
//==================================================

document.title =
"SHGT Admin Dashboard";




//==================================================
// READY
//==================================================

console.log(
"Dashboard Final Check Ready"
);


//==================================================
// END PART-13
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-14
// Spare Parts Display + Image Load FINAL
//==================================================


//==================================================
// HTML ELEMENT
//==================================================

const sparePartTable =
document.getElementById("sparePartTable");


//==================================================
// LOAD SPARE PARTS TABLE
//==================================================

async function loadSparePartsTable(){

    try{

        const snapshot = await getDocs(
            collection(db,"spare-parts")
        );


        if(sparePartTable){

            sparePartTable.innerHTML = "";


            snapshot.forEach((item)=>{

                const part = item.data();


                sparePartTable.innerHTML += `

                <tr>


                    <td>

                        <img
                        src="${part.image || ''}"
                        alt="${part.name || 'Spare Part'}"
                        width="60"
                        height="60"
                        style="
                        object-fit:cover;
                        border-radius:8px;
                        "
                        onerror="this.style.display='none';">

                    </td>


                    <td>
                        ${part.name || ""}
                    </td>


                    <td>
                        ${part.brand || ""}
                    </td>


                    <td>
                        ${part.model || ""}
                    </td>


                    <td>
                        ${part.stock || 0}
                    </td>


                </tr>

                `;


            });


        }


        console.log(
            "Spare Parts Loaded:",
            snapshot.size
        );


    }


    catch(error){

        console.error(
            "Spare Parts Load Error:",
            error
        );

    }

}


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-14
// Spare Parts Display + Image Load FINAL
//==================================================


//==================================================
// HTML ELEMENT
//==================================================

const sparePartTable =
document.getElementById("sparePartTable");


//==================================================
// LOAD SPARE PARTS TABLE
//==================================================

async function loadSparePartsTable(){

try{

const snapshot =
await getDocs(

collection(
db,
"spare-parts"
)

);


if(!sparePartTable){

return;

}


sparePartTable.innerHTML = "";


snapshot.forEach((item)=>{

const part =
item.data();


sparePartTable.innerHTML += `

<tr>

<td>

<img

src="${part.image || '../images/no-image.png'}"

alt="${part.name || 'Spare Part'}"

width="60"

height="60"

style="
width:60px;
height:60px;
object-fit:cover;
border-radius:8px;
"

onerror="this.src='../images/no-image.png'"

>

</td>

<td>

${part.name || ""}

</td>

<td>

${part.brand || ""}

</td>

<td>

${part.model || ""}

</td>

<td>

${part.stock || 0}

</td>

</tr>

`;

});


console.log(

"Spare Parts Loaded:",

snapshot.size

);


}

catch(error){

console.error(

"Spare Parts Load Error:",

error

);

}

}



//==================================================
// LOAD FROM DASHBOARD
//==================================================

if(typeof loadDashboard==="function"){

loadDashboard();

}



//==================================================
// READY
//==================================================

console.log(
"SHGT Spare Parts Module Ready"
);


//==================================================
// END PART-14
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-15
// Invoice + Challan + Stock + Issue + Sales Summary
//==================================================


//==================================================
// HTML ELEMENTS
//==================================================

const totalInvoice =
document.getElementById("totalInvoice");


const totalChallan =
document.getElementById("totalChallan");


const totalStock =
document.getElementById("totalStock");


const totalIssue =
document.getElementById("totalIssue");


const totalSales =
document.getElementById("totalSales");


const lowStock =
document.getElementById("lowStock");



//==================================================
// LOAD INVOICE COUNT
//==================================================

async function loadInvoiceCount(){

try{

const snapshot =
await getDocs(
collection(db,"invoice")
);

if(totalInvoice){

totalInvoice.innerText =
snapshot.size;

}

}

catch(error){

console.error(
"Invoice Count Error:",
error
);

}

}




//==================================================
// LOAD CHALLAN COUNT
//==================================================

async function loadChallanCount(){

try{

const snapshot =
await getDocs(
collection(db,"challan")
);

if(totalChallan){

totalChallan.innerText =
snapshot.size;

}

}

catch(error){

console.error(
"Challan Count Error:",
error
);

}

}




//==================================================
// LOAD STOCK SUMMARY
//==================================================

async function loadStockSummary(){

try{

const snapshot =
await getDocs(
collection(db,"stock")
);

let stockTotal = 0;

let low = 0;

snapshot.forEach((item)=>{

const data =
item.data();

const qty =
Number(data.quantity)||0;

if(data.type==="IN"){

stockTotal += qty;

}else{

stockTotal -= qty;

}

if(qty<=5){

low++;

}

});

if(totalStock){

totalStock.innerText =
stockTotal;

}

if(lowStock){

lowStock.innerText =
low;

}

}

catch(error){

console.error(
"Stock Summary Error:",
error
);

}

}




//==================================================
// LOAD ISSUE + SALES SUMMARY
//==================================================

async function loadIssueSales(){

try{

const snapshot =
await getDocs(
collection(db,"issue")
);

let issue = 0;

let sales = 0;

snapshot.forEach((item)=>{

const data =
item.data();

issue++;

sales +=
Number(data.amount)||0;

});

if(totalIssue){

totalIssue.innerText =
issue;

}

if(totalSales){

totalSales.innerText =
"৳ " + sales.toFixed(2);

}

}

catch(error){

console.error(
"Issue/Sales Error:",
error
);

}

}




//==================================================
// LOAD ALL SUMMARY
//==================================================

async function loadDashboardSummary(){

await loadInvoiceCount();

await loadChallanCount();

await loadStockSummary();

await loadIssueSales();

}




//==================================================
// RUN SUMMARY
//==================================================

loadDashboardSummary();




//==================================================
// READY
//==================================================

console.log(
"Dashboard Summary Ready"
);


//==================================================
// END PART-15
//==================================================

//==================================================
// END OF dashboard.js
//==================================================
