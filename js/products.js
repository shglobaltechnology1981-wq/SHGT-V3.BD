//==================================================
// SH GLOBAL TECHNOLOGY
// PRODUCTS.JS PART-1
// Firebase Live Product Loading
//==================================================

import {
    db
} from "./firebase.js";

import {

    collection,
    getDocs

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const productContainer = document.getElementById("product-container");

//==================================================
// Load Products
//==================================================

async function loadProducts(){

    if(!productContainer) return;

    productContainer.innerHTML = `

        <div class="loading">

            <i class="fas fa-spinner fa-spin"></i>

            <h3>Loading Products...</h3>

        </div>

    `;

    try{

        const snapshot = await getDocs(collection(db,"products"));

        productContainer.innerHTML="";

        if(snapshot.empty){

            productContainer.innerHTML=`

                <div class="empty">

                    <h2>No Products Found</h2>

                </div>

            `;

            return;

        }

        snapshot.forEach((doc)=>{

            const product=doc.data();

            productContainer.innerHTML+=`

            <div class="product-card"
                 data-brand="${product.brand}">

                <img src="${product.image}"
                     alt="${product.name}">

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p>${product.description}</p>

                    <div class="product-price">

                        ${product.price}

                    </div>

                    <a href="product.html?id=${doc.id}"

                       class="btn btn-primary">

                       View Details

                    </a>

                </div>

            </div>

            `;

        });

    }

    catch(error){

        console.error(error);

        productContainer.innerHTML=`

            <div class="error">

                <h2>Failed To Load Products</h2>

            </div>

        `;

    }

}

loadProducts();
//==================================================
// SH GLOBAL TECHNOLOGY
// PRODUCTS.JS PART-2
// Search • Brand Filter • Sort • Featured
//==================================================

//==============================================
// Search Products
//==============================================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const keyword = searchInput.value.toLowerCase().trim();

        document.querySelectorAll(".product-card").forEach(card => {

            const name = card.querySelector("h3").textContent.toLowerCase();
            const desc = card.querySelector("p").textContent.toLowerCase();
            const brand = (card.dataset.brand || "").toLowerCase();

            const matched =
                name.includes(keyword) ||
                desc.includes(keyword) ||
                brand.includes(keyword);

            card.style.display = matched ? "block" : "none";

        });

    });

}

//==============================================
// Brand Filter
//==============================================

const brandFilter = document.getElementById("brandFilter");

if (brandFilter) {

    brandFilter.addEventListener("change", () => {

        const selected = brandFilter.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const brand = (card.dataset.brand || "").toLowerCase();

            if (selected === "all" || brand === selected) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

//==============================================
// Sort Products
//==============================================

const sortSelect = document.getElementById("sortProducts");

if (sortSelect) {

    sortSelect.addEventListener("change", () => {

        const cards = [...document.querySelectorAll(".product-card")];

        cards.sort((a, b) => {

            const aName = a.querySelector("h3").textContent.toLowerCase();
            const bName = b.querySelector("h3").textContent.toLowerCase();

            return sortSelect.value === "z-a"
                ? bName.localeCompare(aName)
                : aName.localeCompare(bName);

        });

        cards.forEach(card => productContainer.appendChild(card));

    });

}

//==============================================
// Featured Product
//==============================================

document.querySelectorAll(".product-card").forEach((card, index) => {

    if (index === 0) {

        const badge = document.createElement("span");

        badge.className = "featured-badge";
        badge.textContent = "Featured";

        card.prepend(badge);

    }

});

//==============================================
// Product Hover Effect
//==============================================

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});

//==============================================
// Image Error Fallback
//==============================================

document.querySelectorAll(".product-card img").forEach(img => {

    img.onerror = function () {

        this.src = "images/no-image.png";

    };

});

//==============================================
// Product Count
//==============================================

const totalProduct = document.getElementById("totalProducts");

if (totalProduct) {

    totalProduct.textContent =
        document.querySelectorAll(".product-card").length;

}

//==================================================
// PRODUCTS.JS PART-2 END
//==================================================
