//==================================================
// SH GLOBAL TECHNOLOGY
// STOCK BALANCE
// stock-balance.js
// PART-43
//==================================================

import { db }

from "../../js/firebase.js";

import {

collection,
getDocs

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



//==================================================
// HTML ELEMENTS
//==================================================

const stockTable =
document.getElementById("stockBalanceBody");

const totalProducts =
document.getElementById("totalProducts");

const totalQty =
document.getElementById("totalQty");

const lowStock =
document.getElementById("lowStock");

const searchStock =
document.getElementById("searchStock");




//==================================================
// LOAD STOCK BALANCE
//==================================================

async function loadStockBalance(){

stockTable.innerHTML="";

let totalProductCount=0;

let totalQuantity=0;

let lowStockCount=0;



const purchaseSnap =
await getDocs(
collection(db,"purchase")
);

const salesSnap =
await getDocs(
collection(db,"sales")
);

const issueSnap =
await getDocs(
collection(db,"issue")
);



//==================================================
// PRODUCT OBJECT
//==================================================

const stock={};




//==================================================
// PURCHASE
//==================================================

purchaseSnap.forEach(doc=>{

const data=doc.data();

if(!data.items) return;

data.items.forEach(item=>{

if(!stock[item.product]){

stock[item.product]={

purchase:0,

sales:0,

issue:0

};

}

stock[item.product].purchase+=
Number(item.qty)||0;

});

});




//==================================================
// SALES
//==================================================

salesSnap.forEach(doc=>{

const data=doc.data();

if(!data.items) return;

data.items.forEach(item=>{

if(!stock[item.product]){

stock[item.product]={

purchase:0,

sales:0,

issue:0

};

}

stock[item.product].sales+=
Number(item.qty)||0;

});

});




//==================================================
// ISSUE
//==================================================

issueSnap.forEach(doc=>{

const data=doc.data();

if(!data.items) return;

data.items.forEach(item=>{

if(!stock[item.product]){

stock[item.product]={

purchase:0,

sales:0,

issue:0

};

}

stock[item.product].issue+=
Number(item.qty)||0;

});

});




//==================================================
// CREATE TABLE
//==================================================

let sl=1;

Object.keys(stock).forEach(product=>{

const purchase=
stock[product].purchase;

const sales=
stock[product].sales;

const issue=
stock[product].issue;

const balance=
purchase-sales-issue;

totalProductCount++;

totalQuantity+=balance;

let status="In Stock";

let badge="green";

if(balance<=10){

status="Low Stock";

badge="orange";

lowStockCount++;

}

if(balance<=0){

status="Out of Stock";

badge="red";

}

stockTable.innerHTML+=`

<tr>

<td>${sl++}</td>

<td>${product}</td>

<td>${purchase}</td>

<td>${sales}</td>

<td>${issue}</td>

<td>${balance}</td>

<td>

<span class="${badge}">

${status}

</span>

</td>

</tr>

`;

});




//==================================================
// SUMMARY
//==================================================

totalProducts.innerText=
totalProductCount;

totalQty.innerText=
totalQuantity;

lowStock.innerText=
lowStockCount;

}



//==================================================
// PAGE LOAD
//==================================================

loadStockBalance();




//==================================================
// SEARCH
//==================================================

searchStock.addEventListener(

"keyup",

()=>{

const filter=
searchStock.value.toLowerCase();

const rows=
stockTable.querySelectorAll("tr");

rows.forEach(row=>{

const text=
row.innerText.toLowerCase();

row.style.display=

text.includes(filter)

?

""

:

"none";

});

});


//==================================================
// END PART-43
//==================================================
