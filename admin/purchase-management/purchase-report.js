//==================================================
// SH GLOBAL TECHNOLOGY
// PURCHASE REPORT
// purchase-report.js
// PART-32
//==================================================


import { db } from "../../js/firebase.js";


import {

collection,
getDocs

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



const purchaseBody =

document.getElementById(
"purchaseBody"
);



async function loadPurchaseReport(){



const snap =

await getDocs(

collection(
db,
"purchase"
)

);



purchaseBody.innerHTML="";



let sl=1;



snap.forEach(doc=>{


let data =
doc.data();



purchaseBody.innerHTML += `


<tr>

<td>${sl++}</td>

<td>${data.purchaseNo || "-"}</td>

<td>${data.supplier || "-"}</td>

<td>${data.product || "-"}</td>

<td>${data.qty || 0}</td>

<td>${data.total || 0}</td>

<td>${data.date || "-"}</td>


</tr>


`;



});



}



loadPurchaseReport();


//==================================================
// END PART-32
//==================================================
