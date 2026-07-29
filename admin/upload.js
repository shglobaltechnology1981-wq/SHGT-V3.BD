//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN PRODUCT UPLOAD
// upload.js Part-1
// Cloudinary + Firestore
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
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN UPLOAD SYSTEM
// upload.js Part-2
//==================================================


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


        if(data.model.toLowerCase() === model.toLowerCase()){

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


    const image =
    imageInput.files[0];


    if(!name || !model || !image){

        alert("Please complete all required fields.");

        return false;

    }


    return true;

}


//==============================================
// Update Upload Button
//==============================================

const submitBtn =
document.querySelector(
"#productForm button"
);



function loadingButton(status){


    if(status){

        submitBtn.disabled = true;

        submitBtn.innerHTML =

        `<i class="fas fa-spinner fa-spin"></i>
        Uploading...`;

    }

    else{

        submitBtn.disabled = false;

        submitBtn.innerHTML =

        `<i class="fas fa-save"></i>
        Save Product`;

    }

}


//==============================================
// Extra Protection
//==============================================

form.addEventListener("submit", async(e)=>{


    if(!validateForm()){

        e.preventDefault();

        return;

    }


    const model =
    document.getElementById("model").value;


    const duplicate =
    await checkDuplicateModel(model);



    if(duplicate){

        e.preventDefault();


        alert(
        "This Model Already Exists!"
        );


        return;

    }


});
