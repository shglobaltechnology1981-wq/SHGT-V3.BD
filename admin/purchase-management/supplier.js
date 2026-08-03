//==================================================
// SH GLOBAL TECHNOLOGY
// SUPPLIER MANAGEMENT
// supplier.js
// PART-28
//==================================================


import { db } from "../../js/firebase.js";


import {

collection,
addDoc,
getDocs

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



const saveSupplier =

document.getElementById(
"saveSupplier"
);



saveSupplier?.addEventListener(

"click",

async()=>{


let name =

document.getElementById(
"supplierName"
).value;



let mobile =

document.getElementById(
"supplierMobile"
).value;



let address =

document.getElementById(
"supplierAddress"
).value;



await addDoc(

collection(
db,
"suppliers"
),

{


name,

mobile,

address,

due:0


}

);



alert(
"Supplier Added"
);



});




// LOAD SUPPLIER


async function loadSupplier(){


const list =

document.getElementById(
"supplierList"
);



if(!list)
return;



let snap =

await getDocs(

collection(
db,
"suppliers"
)

);



list.innerHTML="";



snap.forEach(doc=>{


let data =
doc.data();



list.innerHTML += `

<tr>

<td>${data.name}</td>

<td>${data.mobile}</td>

<td>${data.address}</td>

<td>${data.due}</td>

</tr>

`;


});


}



loadSupplier();


//==================================================
// END PART-28
//==================================================
