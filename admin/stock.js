//==================================================
// SH GLOBAL TECHNOLOGY
// STOCK MANAGEMENT SYSTEM
// admin/stock.js
// Replace Final
// Part-1
// Firebase + Elements Setup
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc,
query,
orderBy

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";





//==================================================
// HTML ELEMENT
//==================================================


// Product

const productName =
document.getElementById("productName");


const productCode =
document.getElementById("productCode");


// Quantity

const stockQty =
document.getElementById("stockQty");


// Price

const stockPrice =
document.getElementById("stockPrice");


// Type

const stockType =
document.getElementById("stockType");


// Button

const addStockBtn =
document.getElementById("addStockBtn");


// Table

const stockTable =
document.getElementById("stockTable");


// Dashboard

const totalProduct =
document.getElementById("totalProduct");


const totalStock =
document.getElementById("totalStock");


const lowStock =
document.getElementById("lowStock");


// Search

const searchStock =
document.getElementById("searchStock");




//==================================================
// GLOBAL
//==================================================


let stockList = [];




//==================================================
// READY
//==================================================


console.log(

"✅ SHGT Stock System Replace Final Part-1 Loaded"

);


//==================================================
// END PART-1
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// STOCK MANAGEMENT SYSTEM
// admin/stock.js
// Replace Final
// Part-2
// Save Stock + Product Wise Update
//==================================================



//==================================================
// SAVE STOCK
//==================================================


if(addStockBtn){


addStockBtn.addEventListener(

"click",

async()=>{


try{


const name =

productName.value.trim();



const code =

productCode.value.trim();



const qty =

Number(stockQty.value) || 0;



const price =

Number(stockPrice.value) || 0;



const type =

stockType.value;




if(!name || qty<=0){


alert(

"Please Enter Product & Quantity"

);


return;


}




//======================================
// CHECK EXISTING PRODUCT
//======================================


const snapshot =

await getDocs(

collection(db,"stock")

);



let found = false;



for(const item of snapshot){



const data =

item.data();




if(

data.productName === name &&

data.productCode === code

){



let oldQty =

Number(data.quantity) || 0;



let newQty;



if(type==="IN"){


newQty = oldQty + qty;


}

else{


newQty = oldQty - qty;


}




await updateDoc(

doc(

db,

"stock",

item.id

),

{


quantity:newQty,


price:price,


type:type,


updatedAt:new Date()



}

);



found = true;



break;



}



}





//======================================
// NEW PRODUCT
//======================================


if(!found){



await addDoc(

collection(db,"stock"),

{


productName:name,


productCode:code,


quantity:

type==="IN"

?

qty

:

0,



price:price,


type:type,


date:new Date(),


updatedAt:new Date()



}

);



}




alert(

"✅ Stock Saved Successfully"

);



clearStockForm();


loadStock();



}



catch(error){


console.error(error);


alert(

"❌ Stock Save Failed"

);


}



}


);


}





//==================================================
// CLEAR FORM
//==================================================


function clearStockForm(){


productName.value="";


productCode.value="";


stockQty.value="";


stockPrice.value="";


stockType.value="IN";


}




//==================================================
// END PART-2
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// STOCK MANAGEMENT SYSTEM
// admin/stock.js
// Replace Final
// Part-3
// Load Stock + Dashboard
//==================================================



//==================================================
// LOAD STOCK
//==================================================


async function loadStock(){


try{


stockTable.innerHTML="";


stockList=[];


let productCount = 0;


let totalQty = 0;


let lowCount = 0;




const q = query(

collection(db,"stock"),

orderBy("updatedAt","desc")

);



const snapshot =

await getDocs(q);




snapshot.forEach((item)=>{


const data = item.data();


stockList.push({

id:item.id,

...data

});



productCount++;



let qty =

Number(data.quantity) || 0;



totalQty += qty;



if(qty <= 5){


lowCount++;


}




stockTable.innerHTML += `


<tr>


<td>

${productCount}

</td>



<td>

${data.productName || ""}

</td>



<td>

${data.productCode || ""}

</td>



<td>

${qty}

</td>



<td>

৳ ${data.price || 0}

</td>



<td>

${data.type || ""}

</td>



<td>


<button

class="edit-btn"

onclick="editStock('${item.id}')">

Edit

</button>



<button

class="delete-btn"

onclick="deleteStock('${item.id}')">

Delete

</button>



</td>



</tr>


`;




});




// Dashboard Update


if(totalProduct)

totalProduct.innerHTML = productCount;



if(totalStock)

totalStock.innerHTML = totalQty;



if(lowStock)

lowStock.innerHTML = lowCount;



}



catch(error){


console.error(

"Load Stock Error",

error

);


}



}





//==================================================
// DELETE STOCK
//==================================================


window.deleteStock = async(id)=>{


const confirmDelete =

confirm(

"Delete this Stock?"

);



if(!confirmDelete)

return;



try{


await deleteDoc(

doc(

db,

"stock",

id

)

);



alert(

"✅ Stock Deleted"

);



loadStock();



}

catch(error){


console.error(error);


alert(

"Delete Failed"

);


}



};






//==================================================
// START LOAD
//==================================================


loadStock();




//==================================================
// END PART-3
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// STOCK MANAGEMENT SYSTEM
// admin/stock.js
// Replace Final
// Part-4
// Search + Edit + Final
//==================================================



//==================================================
// SEARCH STOCK
//==================================================


if(searchStock){


searchStock.addEventListener(

"keyup",

()=>{


const value =

searchStock.value.toLowerCase();



const rows =

stockTable.querySelectorAll("tr");



rows.forEach(row=>{



const text =

row.innerText.toLowerCase();



if(text.includes(value)){


row.style.display="";


}

else{


row.style.display="none";


}



});



}


);


}





//==================================================
// EDIT STOCK
//==================================================


window.editStock = async(id)=>{


try{


const stockRef =

doc(

db,

"stock",

id

);



const snapshot =

await getDocs(

collection(db,"stock")

);



snapshot.forEach(item=>{


if(item.id===id){



const data = item.data();



productName.value =

data.productName || "";



productCode.value =

data.productCode || "";



stockQty.value =

data.quantity || 0;



stockPrice.value =

data.price || 0;



stockType.value =

data.type || "IN";



}

});



alert(

"Edit Mode Loaded"

);



}

catch(error){


console.error(error);



alert(

"Edit Load Failed"

);


}



};






//==================================================
// AUTO REFRESH
//==================================================


window.addEventListener(

"load",

()=>{


loadStock();



}

);






//==================================================
// FINAL READY
//==================================================


console.log(

"✅ SHGT Stock Management Final Loaded Successfully"

);



//==================================================
// END PART-4
//==================================================


