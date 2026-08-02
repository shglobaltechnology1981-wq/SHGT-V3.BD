//==================================================
// SH GLOBAL TECHNOLOGY
// STOCK MANAGEMENT SYSTEM
// admin/stock.js
// Part-3
// Firebase Stock Module
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
addDoc,
getDocs,
deleteDoc,
doc,
query,
orderBy

}

from 
"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";





//==================================================
// HTML ELEMENT
//==================================================


const productName =
document.getElementById("productName");


const productCode =
document.getElementById("productCode");


const stockQty =
document.getElementById("stockQty");


const stockPrice =
document.getElementById("stockPrice");


const stockType =
document.getElementById("stockType");


const addStockBtn =
document.getElementById("addStockBtn");


const stockTable =
document.getElementById("stockTable");


const totalProduct =
document.getElementById("totalProduct");


const totalStock =
document.getElementById("totalStock");


const searchStock =
document.getElementById("searchStock");





//==================================================
// ADD STOCK
//==================================================


addStockBtn.addEventListener("click",async()=>{


try{


let qty =
Number(stockQty.value);



await addDoc(

collection(db,"stock"),

{


productName:
productName.value,


productCode:
productCode.value,


quantity:
qty,


price:
Number(stockPrice.value),


type:
stockType.value,


date:
new Date()


}


);



alert("Stock Saved Successfully");



clearForm();


loadStock();



}


catch(error){


console.log(error);


alert("Stock Save Error");


}



});






//==================================================
// LOAD STOCK
//==================================================


async function loadStock(){


stockTable.innerHTML="";


let total=0;

let count=0;



const q =
query(

collection(db,"stock"),

orderBy("date","desc")

);



const snapshot =
await getDocs(q);



snapshot.forEach((item)=>{


let data =
item.data();


count++;



if(data.type==="IN"){

total += data.quantity;

}

else{

total -= data.quantity;

}



stockTable.innerHTML += `


<tr>


<td>
${count}
</td>


<td>
${data.productName}
</td>


<td>
${data.productCode}
</td>


<td>
${data.quantity}
</td>


<td>
${data.price}
</td>


<td>
${data.type}
</td>


<td>


<button 
class="delete-btn"
onclick="deleteStock('${item.id}')">

Delete

</button>


</td>


</tr>


`;



});



totalProduct.innerHTML=count;


totalStock.innerHTML=total;



}






//==================================================
// DELETE STOCK
//==================================================


window.deleteStock = async(id)=>{


if(confirm("Delete Stock?")){


await deleteDoc(

doc(db,"stock",id)

);


loadStock();


}


};







//==================================================
// SEARCH STOCK
//==================================================


searchStock.addEventListener("keyup",()=>{


let value =
searchStock.value.toLowerCase();



let rows =
stockTable.querySelectorAll("tr");



rows.forEach(row=>{


let text =
row.innerText.toLowerCase();



if(text.includes(value)){


row.style.display="";


}

else{


row.style.display="none";


}



});



});






//==================================================
// CLEAR FORM
//==================================================


function clearForm(){


productName.value="";

productCode.value="";

stockQty.value="";

stockPrice.value="";


}




//==================================================
// START
//==================================================


loadStock();
