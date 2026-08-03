//==================================================
// SH GLOBAL TECHNOLOGY
// EXPENSE DASHBOARD
// expense-dashboard.js
// PART-39
//==================================================


import { db } from "../../js/firebase.js";


import {

collection,
getDocs

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



async function loadExpenseSummary(){


const snap =

await getDocs(

collection(
db,
"expenses"
)

);



let total=0;

let count=0;



snap.forEach(doc=>{


let data =
doc.data();



count++;


total +=

Number(
data.amount || 0
);



});



document.getElementById(
"totalExpense"
).innerText =
count;



document.getElementById(
"expenseAmount"
).innerText =
total;



}



loadExpenseSummary();


//==================================================
// END PART-39
//==================================================
