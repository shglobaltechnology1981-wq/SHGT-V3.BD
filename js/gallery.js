//==================================================
// SH GLOBAL TECHNOLOGY
// FINAL GALLERY.JS
// PART-1
//==================================================

import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
orderBy
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const galleryContainer =
document.getElementById("gallery-list");

let allProducts = [];

async function loadGallery(){

if(!galleryContainer){

console.log("Gallery Container Not Found");

return;

}

galleryContainer.innerHTML=`

<div class="loading">

<h2>Loading Gallery...</h2>

</div>

`;

try{

const q=query(

collection(db,"products"),

orderBy("createdAt","desc")

);

const snapshot=await getDocs(q);

console.log("Gallery Products:",snapshot.size);

allProducts=[];

snapshot.forEach((doc)=>{

allProducts.push({

id:doc.id,

...doc.data()

});

});

renderGallery(allProducts);

}

catch(error){

console.error(error);

galleryContainer.innerHTML=`

<div class="error">

<h2>❌ Gallery Loading Failed</h2>

<p>${error.message}</p>

</div>

`;

}

}
//==================================================
// PART-2
// RENDER GALLERY
//==================================================

function renderGallery(products){

if(products.length===0){

galleryContainer.innerHTML=`

<div class="error">

<h2>No Products Found</h2>

</div>

`;

return;

}

let html="";

products.forEach((product)=>{

html+=`

<div class="card">

<img

src="${product.image || 'images/no-image.png'}"

alt="${product.name || ''}"

onclick="openGalleryImage('${product.image}')"

style="width:100%;height:220px;object-fit:contain;cursor:pointer;">

<h3>${product.name || ""}</h3>

<p>${product.brand || ""}</p>

<a

href="product.html?id=${product.id}"

class="whatsapp-btn">

View Details

</a>

</div>

`;

});

galleryContainer.innerHTML=html;

}
//==================================================
// PART-3
// LIGHTBOX + START
//==================================================

// Create Lightbox
const lightbox = document.createElement("div");

lightbox.innerHTML = `

<div id="lightbox-bg"
style="
display:none;
position:fixed;
left:0;
top:0;
width:100%;
height:100%;
background:rgba(0,0,0,.9);
justify-content:center;
align-items:center;
z-index:99999;
">

<img
id="lightbox-image"
style="
max-width:90%;
max-height:90%;
border-radius:10px;
box-shadow:0 0 20px #000;
">

</div>

`;

document.body.appendChild(lightbox);

const lightboxBG =
document.getElementById("lightbox-bg");

const lightboxImage =
document.getElementById("lightbox-image");

window.openGalleryImage=function(image){

lightboxImage.src=image;

lightboxBG.style.display="flex";

};

lightboxBG.addEventListener("click",()=>{

lightboxBG.style.display="none";

});


//==================================================
// START
//==================================================

loadGallery();

console.log("✅ SHGT Gallery Module Loaded");


//==================================================
// END
//==================================================
