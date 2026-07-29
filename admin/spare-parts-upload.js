//==================================================
// SH GLOBAL TECHNOLOGY
// SPARE PARTS UPLOAD FINAL
// Cloudinary + Firebase Firestore
// Collection: spare-parts
//==================================================


import { uploadToCloudinary } 
from "../js/cloudinary.js";


import { db } 
from "../js/firebase.js";


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

const form = document.getElementById("partsForm");

const imageInput = document.getElementById("partImage");

const preview = document.getElementById("partPreview");

const message = document.getElementById("partMessage");

const submitBtn = document.querySelector("#partsForm button");




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
// Duplicate Part Number Check
//==============================================

async function checkDuplicatePart(partNumber){


const snapshot = await getDocs(

collection(db,"spare-parts")

);


let exists = false;



snapshot.forEach((item)=>{


const data = item.data();



if(
data.partNumber &&
data.partNumber.toLowerCase() === partNumber.toLowerCase()
){

exists = true;

}



});



return exists;


}





//==============================================
// Button Loading
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
Save Spare Part
`;

}


}




//==============================================
// Save Spare Part
//==============================================

form.addEventListener("submit", async(e)=>{


e.preventDefault();



try{


const partNumber =

document.getElementById("partNumber").value.trim();





if(partNumber){


const duplicate =

await checkDuplicatePart(partNumber);



if(duplicate){


alert(
"This Part Number Already Exists!"
);


return;


}


}





loadingButton(true);



message.innerHTML =
"Uploading Image...";



const file = imageInput.files[0];



const imageURL =

await uploadToCloudinary(file);





message.innerHTML =
"Saving Spare Part...";





await addDoc(

collection(db,"spare-parts"),

{


name:
document.getElementById("partName").value,


brand:
document.getElementById("partBrand").value,


category:
document.getElementById("partCategory").value,


model:
document.getElementById("partModel").value,


partNumber:partNumber,


price:
document.getElementById("partPrice").value,


description:
document.getElementById("partDescription").value,



image:imageURL,



status:"Available",


createdAt:
serverTimestamp()


}

);





message.innerHTML =

"✅ Spare Part Added Successfully";



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
