//==================================================
// SH GLOBAL TECHNOLOGY
// EXPENSE REPORT
// expense-report.js
// PART-38
//==================================================


import { db } from "../../js/firebase.js";


import {

collection,
getDocs

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



const expenseBody =

document.getElementById(
"expenseBody"
);




async function loadExpenseReport(){


const snap =

await getDocs(

collection(
db,
"expenses"
)

);



expenseBody.innerHTML="";



let sl=1;



snap.forEach(doc=>{


let data =
doc.data();



expenseBody.innerHTML += `


<tr>

<td>${sl++}</td>

<td>${data.title || "-"}</td>

<td>${data.category || "-"}</td>

<td>${data.amount || 0}</td>

<td>${data.note || "-"}</td>

<td>${data.date || "-"}</td>

</tr>


`;



});



}



loadExpenseReport();



//==================================================
// END PART-38
//==================================================
