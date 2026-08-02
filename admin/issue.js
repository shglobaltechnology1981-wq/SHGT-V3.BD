//==================================================
// SH GLOBAL TECHNOLOGY
// ISSUE SALE MANAGEMENT SYSTEM
// admin/issue.js
// Part-1
// Firebase + Elements + Auto Issue No
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";





//==================================================
// HTML ELEMENT
//==================================================


// Dashboard

const totalIssue =
document.getElementById("totalIssue");


const todayIssue =
document.getElementById("todayIssue");


const totalAmount =
document.getElementById("totalAmount");




// Issue Info

const issueNo =
document.getElementById("issueNo");


const customerName =
document.getElementById("customerName");


const companyName =
document.getElementById("companyName");


const phoneNumber =
document.getElementById("phoneNumber");


const issueDate =
document.getElementById("issueDate");





// Product Table

const issueTable =
document.getElementById("issueTable");


const addIssueItem =
document.getElementById("addIssueItem");




// Buttons

const saveIssue =
document.getElementById("saveIssue");


const printIssue =
document.getElementById("printIssue");


const clearIssue =
document.getElementById("clearIssue");




// History

const issueHistory =
document.getElementById("issueHistory");


const searchIssue =
document.getElementById("searchIssue");






//==================================================
// GLOBAL VARIABLE
//==================================================


let issueItems = [];





//==================================================
// AUTO ISSUE NUMBER
// FORMAT:
// IS-20260803-1234
//==================================================


function generateIssueNumber(){


const now = new Date();



const year =

now.getFullYear();



const month =

String(now.getMonth()+1)

.padStart(2,"0");



const day =

String(now.getDate())

.padStart(2,"0");



const random =

Math.floor(

1000 +

Math.random()*9000

);




issueNo.value =


"IS-" +

year +

month +

day +

"-" +

random;



}





//==================================================
// AUTO DATE
//==================================================


function setIssueDate(){


const today =

new Date()

.toISOString()

.split("T")[0];



issueDate.value = today;



}





//==================================================
// INITIAL LOAD
//==================================================


generateIssueNumber();


setIssueDate();





console.log(

"✅ SHGT Issue System Part-1 Loaded"

);



//==================================================
// END PART-1
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ISSUE SALE MANAGEMENT SYSTEM
// admin/issue.js
// Part-2
// Product Row + Stock Check
//==================================================



//==================================================
// ADD ISSUE ITEM ROW
//==================================================


async function addIssueRow(){


const row = document.createElement("tr");



row.innerHTML = `

<td class="slNo">

</td>



<td>

<input

type="text"

class="issueProduct"

placeholder="Product Name">

</td>



<td>

<input

type="number"

class="availableStock"

readonly

value="0">

</td>



<td>

<input

type="number"

class="issueQty"

value="1"

min="1">

</td>



<td>

<input

type="number"

class="issuePrice"

value="0"

min="0">

</td>



<td>

<input

type="number"

class="issueTotal"

readonly

value="0">

</td>



<td>

<button

class="removeIssueItem">

✖

</button>

</td>


`;



issueTable.appendChild(row);



updateIssueSerial();



}





//==================================================
// SERIAL UPDATE
//==================================================


function updateIssueSerial(){


const rows =

issueTable.querySelectorAll("tr");



rows.forEach((row,index)=>{


row.querySelector(".slNo").innerText =

index+1;



});


}





//==================================================
// CHECK AVAILABLE STOCK
//==================================================


document.addEventListener(

"input",

async(e)=>{



if(

e.target.classList.contains("issueProduct")

){



const row =

e.target.closest("tr");



const product =

e.target.value.trim();



if(!product)

return;



const snapshot =

await getDocs(

collection(db,"stock")

);



snapshot.forEach(item=>{


const data = item.data();



if(

data.productName === product

){



row.querySelector(".availableStock").value =

data.quantity || 0;



row.querySelector(".issuePrice").value =

data.price || 0;



}



});



calculateIssueTotal(row);



}



});






//==================================================
// TOTAL CALCULATION
//==================================================


function calculateIssueTotal(row){


const qty =

Number(

row.querySelector(".issueQty").value

)||0;



const price =

Number(

row.querySelector(".issuePrice").value

)||0;



row.querySelector(".issueTotal").value =

(qty * price).toFixed(2);



}






document.addEventListener(

"input",

(e)=>{


if(

e.target.classList.contains("issueQty") ||

e.target.classList.contains("issuePrice")

){



calculateIssueTotal(

e.target.closest("tr")

);



}



});






//==================================================
// REMOVE ROW
//==================================================


document.addEventListener(

"click",

(e)=>{


if(

e.target.classList.contains("removeIssueItem")

){


e.target

.closest("tr")

.remove();



updateIssueSerial();



}



});






//==================================================
// ADD BUTTON
//==================================================


if(addIssueItem){


addIssueItem.addEventListener(

"click",

()=>{


addIssueRow();


}

);


}





//==================================================
// FIRST ROW
//==================================================


addIssueRow();





//==================================================
// END PART-2
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ISSUE SALE MANAGEMENT SYSTEM
// admin/issue.js
// Part-3
// Save Issue + Stock OUT
//==================================================



//==================================================
// COLLECT ISSUE ITEMS
//==================================================


function collectIssueItems(){


let items = [];


const rows =

issueTable.querySelectorAll("tr");



rows.forEach(row=>{


const product =

row.querySelector(".issueProduct").value.trim();



const stock =

Number(

row.querySelector(".availableStock").value

) || 0;



const qty =

Number(

row.querySelector(".issueQty").value

) || 0;



const price =

Number(

row.querySelector(".issuePrice").value

) || 0;



const total =

Number(

row.querySelector(".issueTotal").value

) || 0;



if(product){


items.push({

product,

stock,

qty,

price,

total

});


}



});


return items;


}






//==================================================
// STOCK OUT UPDATE
//==================================================


async function updateStockOut(items){



const snapshot =

await getDocs(

collection(db,"stock")

);




for(const issue of items){



snapshot.forEach(async(stockItem)=>{



const data =

stockItem.data();




if(

data.productName === issue.product

){



let currentQty =

Number(data.quantity) || 0;



let balance =

currentQty - issue.qty;



if(balance < 0){

balance = 0;

}



await updateDoc(

doc(

db,

"stock",

stockItem.id

),

{


quantity:balance,


type:"OUT",


updatedAt:new Date()



}

);



}



});



}



}







//==================================================
// SAVE ISSUE
//==================================================


if(saveIssue){


saveIssue.addEventListener(

"click",

async()=>{


try{



const items =

collectIssueItems();



if(items.length===0){


alert(

"Please add product"

);


return;

}




let amount = 0;



items.forEach(item=>{


amount += item.total;



});






await addDoc(

collection(db,"issue"),

{


issueNo:

issueNo.value,


date:

issueDate.value,


customer:

customerName.value,


company:

companyName.value,


phone:

phoneNumber.value,


items:items,


amount:amount,


createdAt:new Date()



}

);






// Stock Minus

await updateStockOut(items);






alert(

"✅ Issue Saved Successfully"

);





generateIssueNumber();


setIssueDate();



}


catch(error){


console.error(error);


alert(

"❌ Issue Save Failed"

);



}



}


);



}




//==================================================
// END PART-3
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ISSUE SALE MANAGEMENT SYSTEM
// admin/issue.js
// Part-4
// History + Search + Delete + Dashboard
//==================================================



//==================================================
// LOAD ISSUE HISTORY
//==================================================


async function loadIssueHistory(){


try{


issueHistory.innerHTML="";


let count = 0;

let amount = 0;

let todayCount = 0;




const snapshot =

await getDocs(

collection(db,"issue")

);





snapshot.forEach((item)=>{



const data =

item.data();



count++;



amount +=

Number(data.amount) || 0;




// Today Count

const today =

new Date()

.toISOString()

.split("T")[0];



if(data.date === today){


todayCount++;


}





issueHistory.innerHTML += `


<tr>


<td>

${data.issueNo || ""}

</td>



<td>

${data.date || ""}

</td>



<td>

${data.customer || ""}

</td>



<td>

৳ ${data.amount || 0}

</td>



<td>



<button

class="viewIssueBtn"

data-id="${item.id}">

👁 View

</button>



<button

class="deleteIssueBtn"

data-id="${item.id}">

🗑 Delete

</button>



</td>



</tr>


`;



});





if(totalIssue)

totalIssue.innerHTML = count;



if(totalAmount)

totalAmount.innerHTML = amount.toFixed(2);



if(todayIssue)

todayIssue.innerHTML = todayCount;



}



catch(error){


console.error(

"History Load Error",

error

);


}



}





//==================================================
// SEARCH ISSUE
//==================================================


if(searchIssue){


searchIssue.addEventListener(

"keyup",

()=>{


const keyword =

searchIssue.value.toLowerCase();



document

.querySelectorAll("#issueHistory tr")

.forEach(row=>{


const text =

row.innerText.toLowerCase();



row.style.display =

text.includes(keyword)

?

""

:

"none";



});


}

);


}





//==================================================
// DELETE ISSUE
//==================================================


document.addEventListener(

"click",

async(e)=>{


if(

e.target.classList.contains("deleteIssueBtn")

){



const id =

e.target.dataset.id;



const ok =

confirm(

"Delete Issue?"

);



if(!ok)

return;



await deleteDoc(

doc(

db,

"issue",

id

)

);



alert(

"✅ Issue Deleted"

);



loadIssueHistory();



}



}

);






//==================================================
// AUTO LOAD
//==================================================


loadIssueHistory();





//==================================================
// END PART-4
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ISSUE SALE MANAGEMENT SYSTEM
// admin/issue.js
// Part-5
// View + Print + Clear + Final
//==================================================



//==================================================
// VIEW ISSUE
//==================================================


document.addEventListener(

"click",

async(e)=>{


if(

e.target.classList.contains("viewIssueBtn")

){



const id =

e.target.dataset.id;



try{



const snapshot =

await getDocs(

collection(db,"issue")

);





snapshot.forEach((item)=>{



if(item.id === id){



const data =

item.data();




issueNo.value =

data.issueNo || "";



issueDate.value =

data.date || "";



customerName.value =

data.customer || "";



companyName.value =

data.company || "";



phoneNumber.value =

data.phone || "";




issueTable.innerHTML = "";





(data.items || []).forEach(item=>{



const row =

document.createElement("tr");




row.innerHTML = `



<td class="slNo"></td>



<td>

<input

class="issueProduct"

value="${item.product || ""}">

</td>




<td>

<input

class="availableStock"

value="${item.stock || 0}"

readonly>

</td>




<td>

<input

class="issueQty"

type="number"

value="${item.qty || 1}">

</td>




<td>

<input

class="issuePrice"

type="number"

value="${item.price || 0}">

</td>




<td>

<input

class="issueTotal"

value="${item.total || 0}"

readonly>

</td>




<td>

<button

class="removeIssueItem">

✖

</button>

</td>



`;



issueTable.appendChild(row);



});




updateIssueSerial();




window.scrollTo({

top:0,

behavior:"smooth"

});



}



});



}

catch(error){



console.error(error);



alert(

"View Issue Failed"

);



}



}



});







//==================================================
// PRINT ISSUE
//==================================================


if(printIssue){



printIssue.addEventListener(

"click",

()=>{


window.print();



}

);



}







//==================================================
// CLEAR ISSUE
//==================================================


if(clearIssue){



clearIssue.addEventListener(

"click",

()=>{



const ok =

confirm(

"Clear Issue Form?"

);



if(!ok)

return;




customerName.value="";


companyName.value="";


phoneNumber.value="";



issueTable.innerHTML="";



addIssueRow();



generateIssueNumber();



setIssueDate();



}

);



}






//==================================================
// FINAL READY
//==================================================


console.log(

"✅ SHGT Issue Sale System Loaded Successfully"

);



//==================================================
// END PART-5
//==================================================
