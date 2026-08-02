//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-1
// Firebase + Elements + Auto Challan No
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
addDoc,
getDocs,
deleteDoc,
doc

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";




//==================================================
// HTML ELEMENTS
//==================================================


// Customer

const customerName =
document.getElementById("customerName");


const companyName =
document.getElementById("companyName");


const phoneNumber =
document.getElementById("phoneNumber");




// Challan Info

const challanNo =
document.getElementById("challanNo");


const challanDate =
document.getElementById("challanDate");


const invoiceRef =
document.getElementById("invoiceRef");




// Product

const challanBody =
document.getElementById("challanBody");


const addChallanItem =
document.getElementById("addChallanItem");




// Buttons

const saveChallan =
document.getElementById("saveChallan");


const printChallan =
document.getElementById("printChallan");


const downloadChallanPDF =
document.getElementById("downloadChallanPDF");


const clearChallan =
document.getElementById("clearChallan");




// History

const challanHistory =
document.getElementById("challanHistory");


const searchChallan =
document.getElementById("searchChallan");





//==================================================
// AUTO DATE
//==================================================


function generateDate(){


const today = new Date();



challanDate.value =

today.toLocaleDateString("en-GB");



}





//==================================================
// AUTO CHALLAN NUMBER
// FORMAT:
// DC-20260803-1234
//==================================================


function generateChallanNumber(){


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




challanNo.value =

"DC-" +

year +

month +

day +

"-" +

random;



}





//==================================================
// INITIAL LOAD
//==================================================


generateDate();


generateChallanNumber();




//==================================================
// READY
//==================================================


console.log(

"SHGT Challan System Part-1 Loaded"

);


//==================================================
// END PART-1
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-2
// Add Item + Row Management
//==================================================



//==================================================
// ADD CHALLAN ITEM ROW
//==================================================


function addChallanRow(){


const row = document.createElement("tr");



row.innerHTML = `

<td class="slNo"></td>


<td>

<input

type="text"

class="productName"

placeholder="Product Name">

</td>



<td>

<input

type="text"

class="productBrand"

placeholder="Brand">

</td>



<td>

<input

type="number"

class="productQty"

value="1"

min="1">

</td>




<td>

<input

type="text"

class="remark"

placeholder="Remark">

</td>




<td>

<button

class="removeChallanItem">

✖

</button>

</td>


`;



challanBody.appendChild(row);



updateChallanSerial();



}




//==================================================
// SERIAL NUMBER
//==================================================


function updateChallanSerial(){


const rows =

challanBody.querySelectorAll("tr");



rows.forEach((row,index)=>{


row.querySelector(".slNo").innerText =

index + 1;



});


}




//==================================================
// REMOVE ITEM
//==================================================


document.addEventListener(

"click",

(e)=>{



if(

e.target.classList.contains("removeChallanItem")

){



e.target

.closest("tr")

.remove();



updateChallanSerial();



}



}

);




//==================================================
// ADD BUTTON
//==================================================


if(addChallanItem){


addChallanItem.addEventListener(

"click",

()=>{


addChallanRow();


}

);


}





//==================================================
// FIRST ROW
//==================================================


addChallanRow();





//==================================================
// END PART-2
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-3
// Save Challan + Stock OUT
//==================================================



//==================================================
// COLLECT CHALLAN ITEMS
//==================================================


function collectChallanItems(){


let items = [];



const rows =

challanBody.querySelectorAll("tr");



rows.forEach(row=>{



const product =

row.querySelector(".productName").value.trim();



const brand =

row.querySelector(".productBrand").value.trim();



const qty =

Number(

row.querySelector(".productQty").value

) || 0;



const remark =

row.querySelector(".remark").value.trim();




if(product){



items.push({


product,

brand,

qty,

remark


});



}



});



return items;



}




//==================================================
// UPDATE STOCK AFTER DELIVERY
//==================================================


async function updateStockAfterDelivery(items){



for(const item of items){



const snapshot =

await getDocs(

collection(db,"stock")

);





for(const stockItem of snapshot){



const data =

stockItem.data();




if(

data.productName === item.product

){



let oldQty =

Number(data.quantity) || 0;



let newQty =

oldQty - item.qty;




await updateDoc(

doc(

db,

"stock",

stockItem.id

),

{


quantity:newQty,


lastDelivery:new Date()



}

);



break;



}



}



}



}






//==================================================
// SAVE CHALLAN
//==================================================


if(saveChallan){



saveChallan.addEventListener(

"click",

async()=>{



try{



const items =

collectChallanItems();



if(items.length===0){


alert(

"Please add product item"

);


return;


}




await addDoc(

collection(db,"challan"),

{


challanNo:

challanNo.value,



date:

challanDate.value,



invoiceRef:

invoiceRef.value,



customer:

customerName.value,



company:

companyName.value,



phone:

phoneNumber.value,



items:items,



createdAt:

new Date()



}


);




// Stock Reduce

await updateStockAfterDelivery(items);





alert(

"✅ Challan Saved Successfully"

);



generateDate();


generateChallanNumber();



}



catch(error){



console.error(error);



alert(

"❌ Challan Save Failed"

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
// challan.js
// Part-4
// History + Search + Delete + View
//==================================================



//==================================================
// LOAD CHALLAN HISTORY
//==================================================


async function loadChallanHistory(){


if(!challanHistory) return;



try{


challanHistory.innerHTML = "";



const snapshot =

await getDocs(

collection(db,"challan")

);




if(snapshot.empty){


challanHistory.innerHTML = `

<tr>

<td colspan="5">

No Challan Found

</td>

</tr>

`;

return;


}




snapshot.forEach((item)=>{



const data = item.data();



challanHistory.innerHTML += `


<tr>


<td>

${data.challanNo || ""}

</td>


<td>

${data.date || ""}

</td>


<td>

${data.customer || ""}

</td>


<td>

${data.company || ""}

</td>


<td>



<button

class="viewChallanBtn"

data-id="${item.id}">

👁 View

</button>



<button

class="deleteChallanBtn"

data-id="${item.id}">

🗑 Delete

</button>



</td>



</tr>



`;



});



}

catch(error){


console.error(error);



}



}





//==================================================
// SEARCH CHALLAN
//==================================================


if(searchChallan){


searchChallan.addEventListener(

"keyup",

()=>{


const keyword =

searchChallan.value.toLowerCase();



document

.querySelectorAll("#challanHistory tr")

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
// DELETE CHALLAN
//==================================================


document.addEventListener(

"click",

async(e)=>{


if(

e.target.classList.contains("deleteChallanBtn")

){



const id =

e.target.dataset.id;



const confirmDelete =

confirm(

"Delete Challan?"

);



if(!confirmDelete)

return;




await deleteDoc(

doc(

db,

"challan",

id

)

);




alert(

"✅ Challan Deleted"

);



loadChallanHistory();



}



}

);







//==================================================
// VIEW CHALLAN
//==================================================


document.addEventListener(

"click",

async(e)=>{


if(

e.target.classList.contains("viewChallanBtn")

){



const id =

e.target.dataset.id;




const ref =

doc(

db,

"challan",

id

);



const snap =

await getDoc(ref);



if(snap.exists()){



const data =

snap.data();




challanNo.value =

data.challanNo || "";



challanDate.value =

data.date || "";



invoiceRef.value =

data.invoiceRef || "";



customerName.value =

data.customer || "";



companyName.value =

data.company || "";



phoneNumber.value =

data.phone || "";





challanBody.innerHTML="";





(data.items || []).forEach(item=>{



const row =

document.createElement("tr");



row.innerHTML = `


<td class="slNo"></td>



<td>

<input

class="productName"

value="${item.product || ""}">

</td>



<td>

<input

class="productBrand"

value="${item.brand || ""}">

</td>



<td>

<input

class="productQty"

type="number"

value="${item.qty || 1}">

</td>



<td>

<input

class="remark"

value="${item.remark || ""}">

</td>



<td>

<button

class="removeChallanItem">

✖

</button>

</td>



`;



challanBody.appendChild(row);



});




updateChallanSerial();




window.scrollTo({

top:0,

behavior:"smooth"

});



}



}



}

);





//==================================================
// AUTO LOAD
//==================================================


loadChallanHistory();




//==================================================
// END PART-4
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// challan.js
// Part-5
// PDF + Print + Clear + Final Ready
//==================================================



//==================================================
// PRINT CHALLAN
//==================================================


if(printChallan){


printChallan.addEventListener(

"click",

()=>{


window.print();


}

);


}





//==================================================
// DOWNLOAD PDF
//==================================================


if(downloadChallanPDF){


downloadChallanPDF.addEventListener(

"click",

async()=>{


try{


const challanPaper =

document.querySelector(".invoice-paper");



if(!challanPaper){


alert(

"Challan Layout Not Found"

);


return;

}



const canvas =

await html2canvas(

challanPaper,

{


scale:2,


useCORS:true,


backgroundColor:"#ffffff"



}

);




const image =

canvas.toDataURL(

"image/jpeg",

1.0

);





const {

jsPDF

}=window.jspdf;




const pdf =

new jsPDF({

orientation:"portrait",

unit:"mm",

format:"a4"

});





const width =

pdf.internal.pageSize.getWidth();



const height =

(canvas.height * width)

/

canvas.width;





pdf.addImage(

image,

"JPEG",

0,

0,

width,

height

);





pdf.save(

challanNo.value +

".pdf"

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
// CLEAR CHALLAN
//==================================================


if(clearChallan){



clearChallan.addEventListener(

"click",

()=>{


const ok =

confirm(

"Clear Challan?"

);



if(!ok)

return;




customerName.value="";


companyName.value="";


phoneNumber.value="";


invoiceRef.value="";



challanBody.innerHTML="";



addChallanRow();



generateDate();


generateChallanNumber();



}

);


}






//==================================================
// PAGE LOAD
//==================================================


window.addEventListener(

"load",

()=>{


loadChallanHistory();


}

);






//==================================================
// FINAL READY
//==================================================


console.log(

"✅ SHGT Challan System Loaded Successfully"

);



//==================================================
// END PART-5
//==================================================
