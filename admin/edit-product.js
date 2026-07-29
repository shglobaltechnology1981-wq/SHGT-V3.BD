//==================================================
// SH GLOBAL TECHNOLOGY
// EDIT PRODUCT FINAL
// Firebase + Cloudinary
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
// Get Product ID
//==============================================

const urlParams = new URLSearchParams(
window.location.search
);


const productId = urlParams.get("id");



//==============================================
// HTML Elements
//==============================================

const form =
document.getElementById("editProductForm");


const message =
document.getElementById("editMessage");


const imageInput =
document.getElementById("editImage");


const oldImage =
document.getElementById("oldImage");


const newPreview =
document.getElementById("newPreview");





//==============================================
// Load Product Data
//==============================================

async function loadProduct(){


if(!productId){

alert("Product ID Missing");

return;

}


const productRef =
doc(db,"products",productId);



const snapshot =
await getDoc(productRef);



if(snapshot.exists()){


const data = snapshot.data();



document.getElementById("editName").value =
data.name || "";


document.getElementById("editBrand").value =
data.brand || "";


document.getElementById("editCategory").value =
data.category || "";


document.getElementById("editModel").value =
data.model || "";


document.getElementById("editPrice").value =
data.price || "";


document.getElementById("editDescription").value =
data.description || "";



oldImage.innerHTML = `

<img src="${data.image}"

width="200"

style="border-radius:10px;">

`;



}



}






//==============================================
// New Image Preview
//==============================================

imageInput.addEventListener("change",()=>{


const file =
imageInput.files[0];


if(file){


const reader =
new FileReader();



reader.onload=(e)=>{


newPreview.innerHTML = `

<img src="${e.target.result}"

width="200"

style="border-radius:10px;">

`;

};



reader.readAsDataURL(file);


}


});






//==============================================
// Update Product
//==============================================

form.addEventListener("submit",async(e)=>{


e.preventDefault();



try{


message.innerHTML =
"Updating Product...";



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
document.getElementById("editName").value,


brand:
document.getElementById("editBrand").value,


category:
document.getElementById("editCategory").value,


model:
document.getElementById("editModel").value,


price:
document.getElementById("editPrice").value,


description:
document.getElementById("editDescription").value,


updatedAt:
new Date()


};





if(imageURL){


updateData.image = imageURL;


}






await updateDoc(

doc(db,"products",productId),

updateData

);





message.innerHTML =

"✅ Product Updated Successfully";



setTimeout(()=>{


location.href="products.html";


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

loadProduct();


//==================================================
// END
//==================================================
