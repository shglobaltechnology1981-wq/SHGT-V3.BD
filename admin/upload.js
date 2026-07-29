//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN PRODUCT UPLOAD FINAL
// Cloudinary + Firebase Firestore
//==================================================


import { uploadToCloudinary } from "../js/cloudinary.js";

import { db } from "../js/firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



//==============================================
// HTML Elements
//==============================================

const form = document.getElementById("productForm");

const imageInput = document.getElementById("image");

const preview = document.getElementById("preview");

const message = document.getElementById("message");

const submitBtn = document.querySelector("#productForm button");



//==============================================
// Image Preview
//==============================================

imageInput.addEventListener("change",()=>{


const file = imageInput.files[0];


if(file){


const reader = new FileReader();


reader.onload = (e)=>{


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
// Duplicate Model Check
//==============================================

async function checkDuplicateModel(model){


const snapshot = await getDocs(

collection(db,"products")

);


let exists = false;


snapshot.forEach((item)=>{


const data = item.data();


if(
data.model &&
data.model.toLowerCase() === model.toLowerCase()
){

exists = true;

}


});


return exists;


}




//==============================================
// Form Validation
//==============================================

function validateForm(){


const name =
document.getElementById("name").value.trim();


const model =
document.getElementById("model").value.trim();


const file =
imageInput.files[0];



if(!name || !model || !file){


alert(
"Please complete all required fields."
);


return false;


}


return true;


}





//==============================================
// Loading Button
//==============================================

function loadingButton(status){


if(status){


submitBtn.disabled = true;


submitBtn.innerHTML =

`
<i class="fas fa-spinner fa-spin"></i>
Uploading...
`;


}

else{


submitBtn.disabled = false;


submitBtn.innerHTML =

`
<i class="fas fa-save"></i>
Save Product
`;


}


}





//==============================================
// Save Product
//==============================================

form.addEventListener("submit", async(e)=>{


e.preventDefault();



try{


if(!validateForm()) return;



const model =

document.getElementById("model").value.trim();





const duplicate =

await checkDuplicateModel(model);





if(duplicate){


alert(
"This Model Already Exists!"
);


return;


}





loadingButton(true);



message.innerHTML =
"Uploading Image...";



const file = imageInput.files[0];



const imageURL =

await uploadToCloudinary(file);





message.innerHTML =
"Saving Product...";





await addDoc(

collection(db,"products"),

{


name:
document.getElementById("name").value,


brand:
document.getElementById("brand").value,


category:
document.getElementById("category").value,


model:model,


price:
document.getElementById("price").value,


description:
document.getElementById("description").value,



image:imageURL,



status:"Available",


featured:false,



createdAt:
serverTimestamp()


}

);





message.innerHTML =

"✅ Product Added Successfully";




form.reset();


preview.innerHTML="";



}

catch(error){


console.error(error);



message.innerHTML =

"❌ Upload Failed";


}


finally{


loadingButton(false);


}



});


//==================================================
// END
//==================================================
