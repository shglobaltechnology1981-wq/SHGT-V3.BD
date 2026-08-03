//==================================================
// SH GLOBAL TECHNOLOGY
// STOCK MANAGEMENT SYSTEM
// admin/stock-management/stock.js
// PART-20 FILE-3
// Firebase + Stock Balance System
//==================================================


//==================================================
// FIREBASE IMPORT
//==================================================


import { db } from "../../js/firebase.js";


import {

collection,
getDocs

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";




//==================================================
// ELEMENTS
//==================================================


const stockBody =
document.getElementById(
"stockBody"
);


const totalProduct =
document.getElementById(
"totalProduct"
);


const totalStockIn =
document.getElementById(
"totalStockIn"
);


const totalStockOut =
document.getElementById(
"totalStockOut"
);


const lowStock =
document.getElementById(
"lowStock"
);





let stockData=[];




//==================================================
// LOAD STOCK DATA
//==================================================


async function loadStock(){


try{


stockData=[];



const productSnap =
await getDocs(

collection(
db,
"products"
)

);



const stockSnap =
await getDocs(

collection(
db,
"stockTransactions"
)

);



let stockMap={};



// Product Load


productSnap.forEach(doc=>{


let data =
doc.data();


stockMap[data.name]={


name:data.name,

category:
data.category || "-",

opening:
Number(data.stock || 0),

stockIn:0,

stockOut:0


};


});





// Transaction Load


stockSnap.forEach(doc=>{


let data =
doc.data();



if(
stockMap[data.product]
){


if(data.type=="IN"){


stockMap[data.product]
.stockIn +=
Number(data.qty);



}



if(data.type=="OUT"){


stockMap[data.product]
.stockOut +=
Number(data.qty);



}



}



});






Object.values(stockMap)

.forEach(item=>{


item.balance =

item.opening

+

item.stockIn

-

item.stockOut;



stockData.push(item);


});





displayStock(stockData);


updateSummary();



console.log(
"✅ Stock Loaded"
);


}


catch(error){


console.error(
"Stock Load Error:",
error
);


}



}




//==================================================
// DISPLAY STOCK TABLE
//==================================================


function displayStock(data){



if(!stockBody)
return;



stockBody.innerHTML="";



data.forEach((item,index)=>{


let status="";



if(item.balance<=0){


status=
`<span class="stock-out">
Out Of Stock
</span>`;


}

else if(item.balance<=5){


status=
`<span class="stock-low">
Low Stock
</span>`;


}

else{


status=
`<span class="stock-ok">
Available
</span>`;


}




stockBody.innerHTML += `


<tr>

<td>${index+1}</td>

<td>${item.name}</td>

<td>${item.category}</td>

<td>${item.opening}</td>

<td>${item.stockIn}</td>

<td>${item.stockOut}</td>

<td>${item.balance}</td>

<td>${status}</td>


</tr>


`;



});


}




//==================================================
// DASHBOARD SUMMARY
//==================================================


function updateSummary(){



let in
