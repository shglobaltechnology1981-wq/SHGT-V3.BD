//==================================================
// SH GLOBAL TECHNOLOGY
// GALLERY PAGE
// gallery.js Part-1
// Firebase Connection + Import
//==================================================

import { db } from "./firebase.js";

import {

    collection,
    getDocs,
    query,
    orderBy

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


//==================================================
// HTML ELEMENTS
//==================================================

const galleryContainer =
document.getElementById("galleryContainer");

const loadingText =
document.getElementById("loadingText");


//==================================================
// FIRESTORE COLLECTIONS
//==================================================

const productsRef =
collection(db,"products");

const sparePartsRef =
collection(db,"spare-parts");


//==================================================
// GALLERY VARIABLES
//==================================================

let totalProducts = 0;

let totalSpareParts = 0;


//==================================================
// START GALLERY
//==================================================

console.log(
"================================"
);

console.log(
"SHGT GALLERY STARTED"
);

console.log(
"Firebase Connected Successfully"
);

console.log(
"================================"
);


//==================================================
// END PART-1
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// GALLERY PAGE
// gallery.js Part-2
// Load Products
//==================================================


//==================================================
// LOAD PRODUCT GALLERY
//==================================================

async function loadProducts(){

    try{

        const productQuery = query(
            productsRef,
            orderBy("name")
        );

        const snapshot = await getDocs(
            productQuery
        );

        totalProducts = snapshot.size;

        snapshot.forEach((doc)=>{

            const product = doc.data();

            galleryContainer.innerHTML += `

            <div class="gallery-card">

                <img
                src="${product.image || ''}"
                alt="${product.name || ''}"
                class="gallery-image">

                <div class="gallery-info">

                    <h3>
                    ${product.name || "No Name"}
                    </h3>

                    <p>
                    ${product.brand || ""}
                    </p>

                    <small>
                    Machine
                    </small>

                </div>

            </div>

            `;

        });

        console.log(
            "Products Loaded:",
            totalProducts
        );

    }

    catch(error){

        console.error(
            "Product Load Error:",
            error
        );

    }

}


//==================================================
// START PRODUCT LOAD
//==================================================

loadProducts();


//==================================================
// END PART-2
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// GALLERY PAGE
// gallery.js Part-3
// Load Spare Parts
//==================================================


//==================================================
// LOAD SPARE PARTS GALLERY
//==================================================

async function loadSpareParts(){

    try{

        const spareQuery = query(
            sparePartsRef,
            orderBy("name")
        );

        const snapshot = await getDocs(
            spareQuery
        );

        totalSpareParts = snapshot.size;

        snapshot.forEach((doc)=>{

            const part = doc.data();

            galleryContainer.innerHTML += `

            <div class="gallery-card">

                <img
                src="${part.image || ''}"
                alt="${part.name || ''}"
                class="gallery-image">

                <div class="gallery-info">

                    <h3>
                    ${part.name || "No Name"}
                    </h3>

                    <p>
                    ${part.brand || ""}
                    </p>

                    <small>
                    Spare Part
                    </small>

                </div>

            </div>

            `;

        });

        console.log(
            "Spare Parts Loaded:",
            totalSpareParts
        );

    }

    catch(error){

        console.error(
            "Spare Parts Load Error:",
            error
        );

    }

}


//==================================================
// LOAD ALL GALLERY
//==================================================

async function loadGallery(){

    if(galleryContainer){

        galleryContainer.innerHTML = "";

    }

    await loadProducts();

    await loadSpareParts();

    if(loadingText){

        loadingText.style.display = "none";

    }

    console.log(
        "Gallery Loaded Successfully"
    );

}


loadGallery();


//==================================================
// END PART-3
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// GALLERY PAGE
// gallery.js Part-4
// Image Preview (Lightbox)
//==================================================


//==================================================
// CREATE LIGHTBOX
//==================================================

const lightbox =
document.createElement("div");

lightbox.id = "galleryLightbox";

lightbox.style.display = "none";

lightbox.style.position = "fixed";

lightbox.style.top = "0";

lightbox.style.left = "0";

lightbox.style.width = "100%";

lightbox.style.height = "100%";

lightbox.style.background =
"rgba(0,0,0,.9)";

lightbox.style.justifyContent =
"center";

lightbox.style.alignItems =
"center";

lightbox.style.zIndex =
"9999";

lightbox.innerHTML = `

<img
id="lightboxImage"
style="
max-width:90%;
max-height:90%;
border-radius:10px;
box-shadow:0 0 20px #fff;
">

`;

document.body.appendChild(
lightbox
);


//==================================================
// OPEN IMAGE
//==================================================

document.addEventListener(
"click",
(e)=>{

if(
e.target.classList.contains(
"gallery-image"
)
){

lightbox.style.display =
"flex";

document.getElementById(
"lightboxImage"
).src =
e.target.src;

}

});


//==================================================
// CLOSE LIGHTBOX
//==================================================

lightbox.addEventListener(
"click",
()=>{

lightbox.style.display =
"none";

});


//==================================================
// END PART-4
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// GALLERY PAGE
// gallery.js Part-5
// Search + Filter
//==================================================


//==================================================
// SEARCH ELEMENT
//==================================================

const searchInput =
document.getElementById("gallerySearch");


//==================================================
// LIVE SEARCH
//==================================================

if(searchInput){

searchInput.addEventListener(
"keyup",
function(){

const keyword =
this.value.toLowerCase();

const cards =
document.querySelectorAll(
".gallery-card"
);

cards.forEach((card)=>{

const text =
card.innerText.toLowerCase();

if(
text.includes(keyword)
){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

});

});

}


//==================================================
// CATEGORY FILTER
//==================================================

const filterButtons =
document.querySelectorAll(
".gallery-filter"
);


filterButtons.forEach((btn)=>{

btn.addEventListener(
"click",
function(){

const type =
this.dataset.type;

const cards =
document.querySelectorAll(
".gallery-card"
);

cards.forEach((card)=>{

if(
type==="all"
){

card.style.display =
"block";

return;

}

if(
card.innerHTML.toLowerCase()
.includes(type.toLowerCase())
){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

});

});

});


//==================================================
// END PART-5
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// GALLERY PAGE
// gallery.js Part-6
// Final Ready + Auto Refresh
//==================================================


//==================================================
// LOADING COMPLETE
//==================================================

function galleryReady(){

    console.log(
    "================================"
    );

    console.log(
    "SHGT GALLERY READY"
    );

    console.log(
    "Products :",
    totalProducts
    );

    console.log(
    "Spare Parts :",
    totalSpareParts
    );

    console.log(
    "================================"
    );

}


//==================================================
// PAGE LOAD
//==================================================

window.addEventListener(
"load",
()=>{

    galleryReady();

});


//==================================================
// AUTO REFRESH
//==================================================

setInterval(

()=>{

loadGallery();

},

60000

);


//==================================================
// GLOBAL ERROR
//==================================================

window.addEventListener(

"error",

(event)=>{

console.error(

"Gallery Error:",

event.error

);

}

);


//==================================================
// END OF gallery.js
//==================================================
