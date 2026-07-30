//==================================================
// SH GLOBAL TECHNOLOGY
// GALLERY.JS FINAL
// PART-1
// Firebase Gallery Loader
//==================================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


//==================================================
// HTML ELEMENT
//==================================================

const galleryContainer =
document.getElementById("gallery-list");

let allGallery = [];


//==================================================
// LOAD GALLERY
//==================================================

async function loadGallery() {

    if (!galleryContainer) {

        console.log("Gallery container not found");

        return;

    }

    galleryContainer.innerHTML = `

    <div class="loading">

        <h3>Loading Gallery...</h3>

    </div>

    `;

    try {

        const q = query(
            collection(db, "products"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        console.log("Gallery Products:", snapshot.size);

        allGallery = [];

        snapshot.forEach((doc) => {

            allGallery.push({

                id: doc.id,

                ...doc.data()

            });

        });

        renderGallery(allGallery);

    }

    catch (error) {

        console.error(error);

        galleryContainer.innerHTML = `

        <div class="error">

            <h2>❌ Gallery Loading Failed</h2>

            <p>${error.message}</p>

        </div>

        `;

    }

}
//==================================================
// RENDER GALLERY
// PART-2
//==================================================

function renderGallery(products) {

    if (products.length === 0) {

        galleryContainer.innerHTML = `

        <div class="error">

            <h2>No Products Found</h2>

        </div>

        `;

        return;

    }

    let html = "";

    products.forEach((product) => {

        html += `

        <div class="card">

            <img
                src="${product.image || 'images/no-image.png'}"
                alt="${product.name}"
                style="
                    width:100%;
                    height:220px;
                    object-fit:contain;
                ">

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

    galleryContainer.innerHTML = html;

}


//==================================================
// START
//==================================================

//==================================================
// SHGT GALLERY
// PART-3
// IMAGE PREVIEW (LIGHTBOX)
//==================================================

// Create Lightbox
const lightbox = document.createElement("div");

lightbox.id = "gallery-lightbox";

lightbox.innerHTML = `
<div id="lightbox-bg"
style="
position:fixed;
left:0;
top:0;
width:100%;
height:100%;
background:rgba(0,0,0,.85);
display:none;
justify-content:center;
align-items:center;
z-index:99999;
">

<img id="lightbox-image"
style="
max-width:90%;
max-height:90%;
border-radius:10px;
box-shadow:0 0 20px #000;
cursor:pointer;
">

</div>
`;

document.body.appendChild(lightbox);

const lightboxBG =
document.getElementById("lightbox-bg");

const lightboxImage =
document.getElementById("lightbox-image");



//=====================================
// OPEN IMAGE
//=====================================

window.openGalleryImage = function(image){

    lightboxImage.src = image;

    lightboxBG.style.display = "flex";

};



//=====================================
// CLOSE IMAGE
//=====================================

lightboxBG.addEventListener("click",()=>{

    lightboxBG.style.display="none";

});



//=====================================
// UPDATE renderGallery()
//=====================================
//
// renderGallery() function-এর img tag-এ
// শুধু এই line পরিবর্তন করুন:
//
// <img
// src="${product.image}"
// onclick="openGalleryImage('${product.image}')"
//
// বাকি code একই থাকবে.
//
//=====================================



console.log("✅ Gallery Lightbox Ready");
loadGallery();

console.log("✅ SHGT Gallery Module Loaded");


//==================================================
// END
//==================================================
