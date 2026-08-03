//==================================================
// SH GLOBAL TECHNOLOGY
// PURCHASE MANAGEMENT
// purchase.js
// PART-27
//==================================================

import { db } from "../../js/firebase.js";

import {
collection,
addDoc,
serverTimestamp
}
from
"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



const savePurchase =
document.getElementById("savePurchase");



function generatePurchaseNo(){

return "PUR-" + Date.now();

}



savePurchase?.addEventListener(
"click",
async()=>{


let purchaseNo =
generatePurchaseNo();


let supplier =
document.getElementById("supplierName").value;


let mobile =
document.getElementById("supplierMobile").value;


let product =
document.getElementById("productName").value;


let qty =
Number(
document.getElementById("purchaseQty").value
);


let rate =
Number(
document.getElementById("purchaseRate").value
);



let total =
qty * rate;



await addDoc(

collection(db,"purchase"),

{

purchaseNo,

supplier,

mobile,

product,

qty,

rate,

total,

date:serverTimestamp()

}

);



// STOCK IN

await addDoc(

collection(db,"stockTransactions"),

{

product,

qty,

type:"IN",

source:"Purchase",

purchaseNo,

date:serverTimestamp()

}

);



alert("Purchase Saved");


}

);
