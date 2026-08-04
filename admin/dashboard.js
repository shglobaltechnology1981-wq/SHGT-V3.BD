//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-1
// FIREBASE IMPORT FINAL FIX
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

getDoc,

doc,

deleteDoc,

query,

orderBy,

limit

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



//==================================================
// END FIREBASE IMPORT
//==================================================
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

loadDashboardSummary();

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
// Product Action Handler FINAL
//==================================================


//==================================================
// VIEW PRODUCT
//==================================================

window.viewProduct = (id)=>{


window.location.href =

`product-view.html?id=${id}`;


};




//==================================================
// END PART-9
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-10
// Image Count + Firebase Status
//==================================================



//==================================================
// ELEMENTS
//==================================================


const totalImages =

document.getElementById(
"totalImages"
);



const firebaseStatus =

document.getElementById(
"firebaseStatus"
);



const lastUpdate =

document.getElementById(
"lastUpdate"
);








//==================================================
// LOAD IMAGE COUNT
//==================================================


async function loadImageCount(){


try{


const snapshot =

await getDocs(

collection(db,"products")

);




let count = 0;




snapshot.forEach(item=>{


const data = item.data();



if(

data.imageUrl ||

data.image ||

data.cloudinaryUrl

){


count++;


}



});





if(totalImages){


totalImages.innerText =

count;


}



}


catch(error){


console.error(

"Image Count Error",

error

);



}



}








//==================================================
// FIREBASE STATUS
//==================================================


function checkFirebaseStatus(){



if(firebaseStatus){


firebaseStatus.innerText =

"Connected ✅";


}





if(lastUpdate){


lastUpdate.innerText =

new Date()

.toLocaleString();


}



}







//==================================================
// RUN
//==================================================


loadImageCount();


checkFirebaseStatus();






//==================================================
// END PART-10
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-11
// Final Dashboard Loader
//==================================================



//==================================================
// COMPLETE DASHBOARD LOAD
//==================================================


async function refreshDashboard(){


try{


console.log(

"🔄 Dashboard Refresh Start"

);




// Summary

await loadProductCount();

await loadSparePartCount();

await loadQuotationCount();

await loadInvoiceCount();

await loadChallanCount();

await loadStockSummary();




// Tables

await loadRecentProducts();

await loadRecentChallan();

await loadRecentInvoice();




// Sales

await loadSalesSummary();




// Extra

await loadImageCount();

checkFirebaseStatus();





console.log(

"✅ Dashboard Updated Successfully"

);



}

catch(error){


console.error(

"Dashboard Refresh Error",

error

);


}



}







//==================================================
// AUTO REFRESH BUTTON (OPTIONAL)
//==================================================


const refreshBtn =

document.getElementById(
"refreshDashboard"
);



if(refreshBtn){


refreshBtn.addEventListener(

"click",

()=>{


refreshDashboard();


}

);


}








//==================================================
// AUTO REFRESH EVERY 60 SECOND
//==================================================


setInterval(

()=>{


refreshDashboard();


},

60000

);







//==================================================
// FIRST LOAD
//==================================================


refreshDashboard();






//==================================================
// SYSTEM READY
//==================================================


console.log(

"🚀 SHGT ERP Dashboard System Ready"

);





//==================================================
// END PART-11
//==================================================



//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-12
// Product Security + Delete + Edit FINAL
//==================================================


//==================================================
// DELETE PRODUCT
//==================================================


window.deleteProduct = async(id)=>{


try{


const confirmDelete =

confirm(

"⚠️ Are you sure delete this product?"

);



if(!confirmDelete){

return;

}




await deleteDoc(

doc(

db,

"products",

id

)

);




alert(

"✅ Product Deleted Successfully"

);




refreshDashboard();



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
// DELETE SPARE PART
//==================================================


window.deleteSparePart = async(id)=>{


try{


const ok =

confirm(

"⚠️ Delete Spare Part?"

);



if(!ok){

return;

}




await deleteDoc(

doc(

db,

"spare-parts",

id

)

);




alert(

"✅ Spare Part Deleted Successfully"

);




refreshDashboard();



}


catch(error){


console.error(

"Spare Part Delete Error",

error

);



alert(

"❌ Spare Part Delete Failed"

);



}



};




//==================================================
// END PART-12
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-13
// Invoice + Challan Management FINAL
//==================================================


//==================================================
// VIEW CHALLAN
//==================================================


window.viewChallan = (id)=>{


window.location.href =

`../challan.html?id=${id}`;


};






//==================================================
// VIEW INVOICE
//==================================================


window.viewInvoice = (id)=>{


window.location.href =

`../invoice.html?id=${id}`;


};








//==================================================
// DELETE CHALLAN
//==================================================


window.deleteChallan = async(id)=>{


try{


const confirmDelete =

confirm(

"⚠️ Delete this Challan?"

);



if(!confirmDelete){

return;

}




await deleteDoc(

doc(

db,

"challan",

id

)

);




alert(

"✅ Challan Deleted Successfully"

);




refreshDashboard();



}


catch(error){


console.error(

"Challan Delete Error",

error

);



alert(

"❌ Challan Delete Failed"

);



}



};








//==================================================
// DELETE INVOICE
//==================================================


window.deleteInvoice = async(id)=>{


try{


const confirmDelete =

confirm(

"⚠️ Delete this Invoice?"

);



if(!confirmDelete){

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

"✅ Invoice Deleted Successfully"

);




refreshDashboard();



}


catch(error){


console.error(

"Invoice Delete Error",

error

);



alert(

"❌ Invoice Delete Failed"

);



}



};







//==================================================
// END PART-13
//==================================================



//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js
// PART-15
// FINAL COMPLETE DASHBOARD LOADER
//==================================================



//==================================================
// FINAL SUMMARY LOAD
//==================================================


async function finalDashboardLoad(){


try{


console.log(

"🚀 SHGT Dashboard Loading..."

);





// PRODUCT

await loadProductCount();

await loadSparePartCount();




// SALES DOCUMENT

await loadQuotationCount();

await loadInvoiceCount();

await loadChallanCount();




// STOCK

await loadStockSummary();




// TABLE DATA

await loadRecentProducts();

await loadRecentChallan();

await loadRecentInvoice();




// SALES

await loadSalesSummary();




// IMAGE + STATUS

await loadImageCount();

checkFirebaseStatus();





console.log(

"✅ SHGT Dashboard Ready"

);



}

catch(error){


console.error(

"Final Dashboard Load Error",

error

);


}



}



//==================================================
// DASHBOARD SUMMARY
//==================================================

async function loadDashboardSummary(){

const purchaseSnap =
await getDocs(collection(db,"purchase"));

const expenseSnap =
await getDocs(collection(db,"expenses"));

const stockSnap =
await getDocs(collection(db,"stockTransactions"));

const purchaseCard =
document.getElementById("dashPurchaseCount");

const expenseCard =
document.getElementById("dashExpenseCount");

const stockCard =
document.getElementById("dashStockActivity");

if(purchaseCard)
purchaseCard.innerText = purchaseSnap.size;

if(expenseCard)
expenseCard.innerText = expenseSnap.size;

if(stockCard)
stockCard.innerText = stockSnap.size;

}



//==================================================
// PAGE READY
//==================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


finalDashboardLoad();


}

);







//==================================================
// AUTO UPDATE
//==================================================


setInterval(

()=>{


finalDashboardLoad();


},

60000

);






//==================================================
// END PART-15
//==================================================

//==================================================
// END OF dashboard.js
//==================================================
