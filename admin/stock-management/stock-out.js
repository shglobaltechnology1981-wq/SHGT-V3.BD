//==================================================
// SH GLOBAL TECHNOLOGY
// STOCK MANAGEMENT SYSTEM
// admin/stock-management/stock-out.js
// PART-23
// Stock Out Entry + Firebase Save
//==================================================


import { db } from "../../js/firebase.js";


import {

collection,
addDoc,
getDocs,
query,
where,
serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";




//==================================================
// ELEMENT
//==================================================


const saveStockOutBtn =

document.getElementById(
"saveStockOut"
);





//==================================================
// CHECK AVAILABLE STOCK
//==================================================


async function checkStock(product){


let balance = 0;



const productSnap =

await getDocs(

query(

collection(
db,
"stockTransactions"
),

where(
"product",
"==",
product
)

)

);




productSnap.forEach(doc=>{


let data =
doc.data();



if(data.type=="IN"){


balance += Number(data.qty);


}



if(data.type=="OUT"){


balance -= Number(data.qty);


}



});



return balance;


}





//==================================================
// SAVE STOCK OUT
//==================================================


async function saveStockOut(){



try{



const product =

document.getElementById(
"outProduct"
)
.value;



const customer =

document.getElementById(
"customerName"
)
.value;



const invoice =

document.getElementById(
"invoiceNo"
)
.value;



const qty =

Number(

document.getElementById(
"outQuantity"
)
.value

);




if(!product || !qty){


alert(
"Product and Quantity Required"
);


return;


}




// Check Stock


const available =

await checkStock(product);



if(qty > available){


alert(

"Not Enough Stock Available"

);


return;


}




// Save OUT Transaction


await addDoc(

collection(
db,
"stockTransactions"
),

{


product:product,


qty:qty,


type:"OUT",


customer:customer,


invoiceNo:invoice,


date:
serverTimestamp()


}

);




alert(
"Stock Out Saved Successfully"
);





// Clear Form


document.getElementById(
"outProduct"
).value="";


document.getElementById(
"customerName"
).value="";


document.getElementById(
"invoiceNo"
).value="";


document.getElementById(
"outQuantity"
).value="";




console.log(
"✅ STOCK OUT COMPLETE"
);



}



catch(error){


console.error(

"Stock Out Error:",

error

);



alert(
"Stock Out Failed"
);


}


}





//==================================================
// BUTTON
//==================================================


if(saveStockOutBtn){


saveStockOutBtn.addEventListener(

"click",

saveStockOut

);


}




console.log(
"🚀 SHGT STOCK OUT MODULE READY"
);



//==================================================
// END PART-23
//==================================================
