//==================================================
// SH GLOBAL TECHNOLOGY
// SPARE PARTS MANAGEMENT FINAL
// Firebase Firestore
// Collection: spare-parts
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
getDocs,
deleteDoc,
doc

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



//==============================================
// HTML Elements
//==============================================

const partsList = 
document.getElementById("partsList");


const searchParts =
document.getElementById("searchParts");



let allParts = [];



//==============================================
// Load Spare Parts
//==============================================

async function loadParts(){


try{


const snapshot = await getDocs(

collection(db,"spare-parts")

);



allParts = [];



snapshot.forEach((item)=>{


allParts.push({

id:item.id,

...item.data()

});


});



displayParts(allParts);



}

catch(error){


console.error(error);


partsList.innerHTML =

`
<tr>

<td colspan="7">

❌ Spare Parts Loading Failed

</td>

</tr>
`;

}


}




//==============================================
// Display Spare Parts
//==============================================

function displayParts(parts){


partsList.innerHTML="";



parts.forEach((part)=>{


partsList.innerHTML +=

`

<tr>


<td>

<img src="${part.image || '../images/no-image.png'}"

width="70"

height="70"

style="object-fit:cover;border-radius:8px;">

</td>



<td>${part.name || ""}</td>


<td>${part.brand || ""}</td>


<td>${part.model || ""}</td>


<td>${part.partNumber || ""}</td>


<td>${part.category || ""}</td>



<td>



<button

class="edit-btn"

data-id="${part.id}">

<i class="fas fa-edit"></i>

Edit

</button>




<button

class="delete-btn"

data-id="${part.id}">

<i class="fas fa-trash"></i>

Delete

</button>



</td>


</tr>

`;



});


}






//==============================================
// Search Spare Parts
//==============================================

searchParts.addEventListener("keyup",()=>{


const value =

searchParts.value.toLowerCase();



const filtered = allParts.filter(part=>{


return (

(part.name || "")
.toLowerCase()
.includes(value)

||

(part.brand || "")
.toLowerCase()
.includes(value)

||

(part.partNumber || "")
.toLowerCase()
.includes(value)

);


});



displayParts(filtered);



});






//==============================================
// Delete Spare Part
//==============================================

document.addEventListener("click",async(e)=>{


if(e.target.closest(".delete-btn")){


const id =

e.target.closest(".delete-btn").dataset.id;



const confirmDelete = confirm(

"Delete this spare part?"

);



if(confirmDelete){


await deleteDoc(

doc(db,"spare-parts",id)

);



alert(
"✅ Spare Part Deleted"
);



loadParts();



}


}


});






//==============================================
// Edit Spare Part
//==============================================

document.addEventListener("click",(e)=>{


if(e.target.closest(".edit-btn")){


const id =

e.target.closest(".edit-btn").dataset.id;



location.href =

`edit-spare-part.html?id=${id}`;


}


});





//==============================================
// Start
//==============================================

loadParts();


//==================================================
// END
//==================================================
