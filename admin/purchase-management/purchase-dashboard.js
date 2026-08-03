//==================================================
// SH GLOBAL TECHNOLOGY
// PURCHASE DASHBOARD
// purchase-dashboard.js
// PART-33
//==================================================


import { db } from "../../js/firebase.js";


import {

collection,
getDocs

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



async function loadPurchaseSummary(){


const snap =

await getDocs(

collection(
db,
"purchase"
)

);



let totalPurchase = 0;

let totalAmount = 0;



snap.forEach(doc=>{


let data =
doc.data();


totalPurchase++;


totalAmount +=

Number(
data.total || 0
);



});



document.getElementById(
"totalPurchase"
).innerText =
totalPurchase;



document.getElementById(
"totalPurchaseAmount"
).innerText =
totalAmount;



}



loadPurchaseSummary();


//==================================================
// END PART-33
//==================================================
