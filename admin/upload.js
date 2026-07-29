//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN PRODUCT UPLOAD
// upload.js Part-1
// Cloudinary + Firestore
//==================================================


import { db } from "../js/firebase.js";

import {

collection,
addDoc,
serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


//==============================================
// Cloudinary Configuration
//==============================================

const cloudName = "YOUR_CLOUD_NAME";

const uploadPreset = "YOUR_UPLOAD_PRESET";


//==============================================
// HTML Elements
//==============================================

const form = document.getElementById("productForm");

const imageInput = document.getElementById("image");

const preview = document.getElementById("preview");

const message = document.getElementById("message");


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
// Upload Image Cloudinary
//==============================================

async function uploadImage(file){


const formData = new FormData();


formData.append(
"file",
file
);


formData.append(
"upload_preset",
uploadPreset
);



const response = await fetch(

`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,

{

method:"POST",

body:formData

}

);



const data = await response.json();


return data.secure_url;


}


//==============================================
// Save Product
//==============================================

form.addEventListener("submit",async(e)=>{


e.preventDefault();


try{


message.innerHTML="Uploading Image...";


const file=imageInput.files[0];


const imageURL = await uploadImage(file);



message.innerHTML="Saving Product...";



await addDoc(

collection(db,"products"),

{


name:document.getElementById("name").value,

brand:document.getElementById("brand").value,

category:document.getElementById("category").value,

model:document.getElementById("model").value,

price:document.getElementById("price").value,

description:document.getElementById("description").value,


image:imageURL,


status:"Available",

featured:false,


createdAt:serverTimestamp()


}

);



message.innerHTML=
"✅ Product Added Successfully";


form.reset();

preview.innerHTML="";


}

catch(error){


console.error(error);


message.innerHTML=
"❌ Upload Failed";


}


});
