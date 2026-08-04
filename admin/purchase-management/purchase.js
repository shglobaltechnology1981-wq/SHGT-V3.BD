//==================================================
// SH GLOBAL TECHNOLOGY
// PURCHASE MANAGEMENT
// purchase.js
// PART-1
//==================================================


import { db }

from

"../../js/firebase.js";


import {

collection,
getDocs,
addDoc,
serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";




//==================================================
// HTML ELEMENTS
//==================================================

const purchaseForm =
document.getElementById("purchaseForm");

const purchaseNo =
document.getElementById("purchaseNo");

const purchaseDate =
document.getElementById("purchaseDate");

const supplier =
document.getElementById("supplier");

const purchaseBody =
document.getElementById("purchaseBody");

const addRow =
document.getElementById("addRow");




//==================================================
// AUTO DATE
//==================================================

purchaseDate.value =
new Date().toISOString().split("T")[0];




//==================================================
// PURCHASE NUMBER
//==================================================

function generatePurchaseNo(){

const now =
new Date();

purchaseNo.value =
"PUR-" +

now.getFullYear() +

String(now.getMonth()+1)
.padStart(2,"0") +

String(now.getDate())
.padStart(2,"0") +

"-" +

Math.floor(
1000+Math.random()*9000
);

}

generatePurchaseNo();




//==================================================
// LOAD SUPPLIERS
//==================================================

async function loadSuppliers(){

supplier.innerHTML =

'<option value="">Select Supplier</option>';

const snap =
await getDocs(
collection(db,"suppliers")
);

snap.forEach(doc=>{

const data =
doc.data();

supplier.innerHTML += `

<option value="${data.name}">

${data.name}

</option>

`;

});

}

loadSuppliers();




//==================================================
// ADD ROW
//==================================================

addRow.addEventListener(

"click",

()=>{

const rowCount =
purchaseBody.rows.length + 1;

purchaseBody.insertAdjacentHTML(

"beforeend",

`

<tr>

<td>${rowCount}</td>

<td>

<input
type="text"
class="productName"
required>

</td>

<td>

<select class="unit">

<option>PCS</option>

<option>SET</option>

<option>BOX</option>

<option>KG</option>

</select>

</td>

<td>

<input
type="number"
class="qty"
value="1"
min="1">

</td>

<td>

<input
type="number"
class="price"
value="0">

</td>

<td>

<input
type="number"
class="total"
value="0"
readonly>

</td>

<td>

<button
type="button"
class="removeRow">

🗑

</button>

</td>

</tr>

`

);

});


//==================================================
// END PART-1
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// PURCHASE MANAGEMENT
// purchase.js
// PART-2
//==================================================


//==================================================
// REMOVE ROW
//==================================================

purchaseBody.addEventListener(

"click",

(e)=>{

if(

e.target.classList.contains("removeRow") ||

e.target.closest(".removeRow")

){

const rows =
purchaseBody.querySelectorAll("tr");

if(rows.length<=1){

alert("Minimum one item required.");

return;

}

e.target.closest("tr").remove();

updateSerial();

calculateSummary();

}

});




//==================================================
// UPDATE SERIAL
//==================================================

function updateSerial(){

const rows =
purchaseBody.querySelectorAll("tr");

rows.forEach((row,index)=>{

row.cells[0].innerText =
index+1;

});

}




//==================================================
// CALCULATE ITEM TOTAL
//==================================================

purchaseBody.addEventListener(

"input",

(e)=>{

if(

e.target.classList.contains("qty") ||

e.target.classList.contains("price")

){

const row =
e.target.closest("tr");

const qty =
Number(
row.querySelector(".qty").value
) || 0;

const price =
Number(
row.querySelector(".price").value
) || 0;

row.querySelector(".total").value =
(qty*price).toFixed(2);

calculateSummary();

}

});




//==================================================
// SUMMARY CALCULATION
//==================================================

const subTotal =
document.getElementById("subTotal");

const discount =
document.getElementById("discount");

const transport =
document.getElementById("transport");

const grandTotal =
document.getElementById("grandTotal");

const paidAmount =
document.getElementById("paidAmount");

const dueAmount =
document.getElementById("dueAmount");



function calculateSummary(){

let subtotalValue = 0;

document
.querySelectorAll(".total")
.forEach(item=>{

subtotalValue +=
Number(item.value) || 0;

});

subTotal.value =
subtotalValue.toFixed(2);

const discountValue =
Number(discount.value) || 0;

const transportValue =
Number(transport.value) || 0;

const grand =
subtotalValue
- discountValue
+ transportValue;

grandTotal.value =
grand.toFixed(2);

const paid =
Number(paidAmount.value) || 0;

dueAmount.value =
(grand-paid).toFixed(2);

}




//==================================================
// LIVE UPDATE
//==================================================

discount.addEventListener(
"input",
calculateSummary
);

transport.addEventListener(
"input",
calculateSummary
);

paidAmount.addEventListener(
"input",
calculateSummary
);

calculateSummary();


//==================================================
// END PART-2
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// PURCHASE MANAGEMENT
// purchase.js
// PART-3
// SAVE PURCHASE
//==================================================


//==================================================
// SAVE PURCHASE
//==================================================

purchaseForm.addEventListener(

"submit",

async(e)=>{

e.preventDefault();

try{

const items=[];

document
.querySelectorAll("#purchaseBody tr")
.forEach(row=>{

items.push({

product:

row.querySelector(".productName").value,

unit:

row.querySelector(".unit").value,

qty:

Number(
row.querySelector(".qty").value
),

price:

Number(
row.querySelector(".price").value
),

total:

Number(
row.querySelector(".total").value
)

});

});



await addDoc(

collection(db,"purchase"),

{

purchaseNo:
purchaseNo.value,

purchaseDate:
purchaseDate.value,

supplier:
supplier.value,

invoiceNo:
document.getElementById("invoiceNo").value,

remarks:
document.getElementById("remarks").value,

paymentMethod:
document.getElementById("paymentMethod").value,

status:
document.getElementById("purchaseStatus").value,

subTotal:
Number(subTotal.value),

discount:
Number(discount.value),

transport:
Number(transport.value),

grandTotal:
Number(grandTotal.value),

paid:
Number(paidAmount.value),

due:
Number(dueAmount.value),

items,

createdAt:
serverTimestamp()

}

);



//==================================================
// STOCK UPDATE
//==================================================

for(const item of items){

await addDoc(

collection(db,"stockTransactions"),

{

type:"Purchase",

purchaseNo:
purchaseNo.value,

supplier:
supplier.value,

product:
item.product,

unit:
item.unit,

qty:
item.qty,

price:
item.price,

total:
item.total,

date:
purchaseDate.value,

createdAt:
serverTimestamp()

}

);

}



//==================================================
// SUCCESS
//==================================================

alert(

"Purchase Saved Successfully."

);



purchaseForm.reset();



purchaseDate.value =

new Date()

.toISOString()

.split("T")[0];



generatePurchaseNo();

calculateSummary();

loadSuppliers();

}
catch(error){

console.error(error);

alert(

"Purchase Save Failed."

);

}

});



//==================================================
// END PART-3
//==================================================



