//==================================================
// SH GLOBAL TECHNOLOGY
// EDIT SPARE PART FINAL
// Firebase + Cloudinary
// Collection: spare-parts
//==================================================


import { db } from "../js/firebase.js";

import { uploadToCloudinary }
from "../js/cloudinary.js";


import {

doc,
getDoc,
updateDoc

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";




//==============================================
// Get Spare Part ID
//==============================================

const urlParams =
new URLSearchParams(
window.location.search
);


const partId =
urlParams.get("id");




//==============================================
// HTML Elements
//==============================================

const form =
document.getElementById("editPartForm");


const message =
document.getElementById("editPartMessage");


const imageInput =
document.getElementById("editPartImage");


const oldImage =
document.getElementById("oldPartImage");


const preview =
document.getElementById("newPartPreview");





//==============================================
// Load Spare Part
//==============================================

async function loadPart(){


if(!partId){

alert("Spare Part ID Missing");

return;

}



const partRef =
doc(db,"spare-parts",partId);



const snapshot =
await getDoc(partRef);



if(snapshot.exists()){


const data =
snapshot.data();



document.getElementById("editPartName").value =
data.name || "";


document.getElementById("editPartBrand").value =
data.brand || "";


document.getElementById("editPartCategory").value =
data.category || "";


document.getElementById("editPartModel").value =
data.model || "";


document.getElementById("editPartNumber").value =
data.partNumber || "";


document.getElementById("editPartPrice").value =
data.price || "";


document.getElementById("editPartDescription").value =
data.description || "";



oldImage.innerHTML = `

<img src="${data.image}"

width="200"

style="border-radius:10px;">

`;



}


}






//==============================================
// Image Preview
//==============================================

imageInput.addEventListener("change",()=>{


const file =
imageInput.files[0];


if(file){


const reader =
new FileReader();



reader.onload=(e)=>{


preview.innerHTML = `

<img src="${e.target.result}"

width="200"

style="border-radius:10px;">

`;

};



reader.readAsDataURL(file);


}


});






//==============================================
// Update Spare Part
//==============================================

form.addEventListener("submit",async(e)=>{


e.preventDefault();



try{


message.innerHTML =
"Updating Spare Part...";



let imageURL = null;



const file =
imageInput.files[0];



if(file){


message.innerHTML =
"Uploading New Image...";


imageURL =
await uploadToCloudinary(file);


}





const updateData = {


name:
document.getElementById("editPartName").value,


brand:
document.getElementById("editPartBrand").value,


category:
document.getElementById("editPartCategory").value,


model:
document.getElementById("editPartModel").value,


partNumber:
document.getElementById("editPartNumber").value,


price:
document.getElementById("editPartPrice").value,


description:
document.getElementById("editPartDescription").value,


updatedAt:
new Date()


};





if(imageURL){


updateData.image = imageURL;


}





await updateDoc(

doc(db,"spare-parts",partId),

updateData

);





message.innerHTML =

"✅ Spare Part Updated Successfully";





setTimeout(()=>{


location.href="spare-parts.html";


},1500);



}



catch(error){


console.error(error);


message.innerHTML =

"❌ Update Failed";


}



});





//==============================================
// Start
//==============================================

loadPart();


//==================================================
// END
//==================================================
