//==================================================
// SH GLOBAL TECHNOLOGY
// INVOICE STOCK SYNC SYSTEM
// invoice-stock-sync.js
// PART-24
// Invoice Save Auto Stock Out
//==================================================


import { db } from "./firebase.js";


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
// STOCK CHECK
//==================================================


async function checkProductStock(product){


let stock = 0;


const snap =

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



snap.forEach(doc=>{


let data =
doc.data();



if(data.type=="IN"){

stock += Number(data.qty);

}



if(data.type=="OUT"){

stock -= Number(data.qty);

}



});



return stock;


}




//==================================================
// AUTO STOCK OUT
//==================================================


export async function invoiceStockOut(items,invoiceNo,customer){



for(let item of items){



let available =

await checkProductStock(
item.name
);



if(item.qty > available){


throw new Error(

item.name+
" Stock Not Available"

);


}





await addDoc(

collection(
db,
"stockTransactions"
),

{


product:item.name,


qty:Number(item.qty),


type:"OUT",


invoiceNo:invoiceNo,


customer:customer,


date:
serverTimestamp()


}



);



}



console.log(
"✅ Invoice Stock Updated"
);



}





//==================================================
// END PART-24
//==================================================
