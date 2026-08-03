//==================================================
// SH GLOBAL TECHNOLOGY
// EXPENSE MANAGEMENT
// expense.js
// PART-36
//==================================================


import { db } from "../../js/firebase.js";


import {

collection,
addDoc,
serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



const saveExpense =

document.getElementById(
"saveExpense"
);



saveExpense?.addEventListener(

"click",

async()=>{


let title =

document.getElementById(
"expenseTitle"
).value;



let amount =

Number(

document.getElementById(
"expenseAmount"
).value

);



let category =

document.getElementById(
"expenseCategory"
).value;



let note =

document.getElementById(
"expenseNote"
).value;




await addDoc(

collection(
db,
"expenses"
),

{


title,

amount,

category,

note,

date:
serverTimestamp()


}

);



alert(
"Expense Saved"
);



}

);



//==================================================
// END PART-36
//==================================================
