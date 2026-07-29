//==================================================
// SH GLOBAL TECHNOLOGY
// PRODUCTS.JS PART-1
// Firebase Live Product Loading
// SHGT-V3.BD Premium
//==================================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const productContainer =
document.getElementById("product-container");

let allProducts = [];

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

        const q = query(
            collection(db,"products"),
            orderBy("createdAt","desc")
        );

        const snapshot = await getDocs(q);

        allProducts = [];

        snapshot.forEach((doc)=>{

            allProducts.push({

                id:doc.id,

                ...doc.data()

            });

        });

        renderProducts(allProducts);

    }

    catch(error){

        console.error(error);

        productContainer.innerHTML = `

            <div class="error">

                <h2>❌ Failed To Load Products</h2>

                <p>${error.message}</p>

            </div>

        `;

    }

}

//==================================================
// Render Products
//==================================================

function renderProducts(products){

    productContainer.innerHTML = "";

    if(products.length===0){

        productContainer.innerHTML = `

            <div class="empty">

                <h2>No Products Found</h2>

            </div>

        `;

        return;

    }

    products.forEach((product,index)=>{

        productContainer.innerHTML += `

        <div class="product-card"

             data-brand="${product.brand || ""}"

             data-name="${product.name || ""}"

             data-price="${product.price || ""}">

            ${index===0 ?

            `<span class="featured-badge">
            Featured
            </span>` : ""}

            <img

            src="${product.image}"

            alt="${product.name}"

            loading="lazy"

            onerror="this.src='images/no-image.png'">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description || ""}</p>

                <div class="product-price">

                    ${product.price || ""}

                </div>

                <a href="product.html?id=${product.id}"

                   class="btn btn-primary">

                   View Details

                </a>

            </div>

        </div>

        `;

    });

}

loadProducts();
//==================================================
// SH GLOBAL TECHNOLOGY
// PRODUCTS.JS PART-2
// Search • Brand Filter • Sort
//==================================================

//==============================================
// Search Products
//==============================================

const searchInput =
document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("input",()=>{

        const keyword =
        searchInput.value.toLowerCase().trim();

        const filtered =
        allProducts.filter(product=>{

            const name =
            (product.name||"").toLowerCase();

            const brand =
            (product.brand||"").toLowerCase();

            const model =
            (product.model||"").toLowerCase();

            const description =
            (product.description||"").toLowerCase();

            return(

                name.includes(keyword) ||

                brand.includes(keyword) ||

                model.includes(keyword) ||

                description.includes(keyword)

            );

        });

        renderProducts(filtered);

        updateProductCount(filtered.length);

    });

}



//==============================================
// Brand Filter
//==============================================

const brandFilter =
document.getElementById("brandFilter");

if(brandFilter){

    brandFilter.addEventListener("change",()=>{

        const brand =
        brandFilter.value.toLowerCase();

        if(brand==="all"){

            renderProducts(allProducts);

            updateProductCount(allProducts.length);

            return;

        }

        const filtered =
        allProducts.filter(product=>

            (product.brand||"")
            .toLowerCase()===brand

        );

        renderProducts(filtered);

        updateProductCount(filtered.length);

    });

}



//==============================================
// Product Sort
//==============================================

const sortProducts =
document.getElementById("sortProducts");

if(sortProducts){

    sortProducts.addEventListener("change",()=>{

        let sorted=[...allProducts];

        switch(sortProducts.value){

            case "a-z":

                sorted.sort((a,b)=>

                    (a.name||"")
                    .localeCompare(b.name||"")

                );

            break;

            case "z-a":

                sorted.sort((a,b)=>

                    (b.name||"")
                    .localeCompare(a.name||"")

                );

            break;

            case "new":

                sorted.reverse();

            break;

        }

        renderProducts(sorted);

        updateProductCount(sorted.length);

    });

}



//==============================================
// Product Counter
//==============================================

function updateProductCount(total){

    const counter =
    document.getElementById("totalProducts");

    if(counter){

        counter.textContent = total;

    }

}
//==================================================
// SH GLOBAL TECHNOLOGY
// PRODUCTS.JS PART-3
// Final Functions
//==================================================

//==============================================
// Refresh Products
//==============================================

window.refreshProducts = async function(){

    await loadProducts();

    updateProductCount(allProducts.length);

};


//==============================================
// Auto Refresh Every 60 Seconds
//==============================================

setInterval(()=>{

    loadProducts();

},60000);


//==============================================
// Loading Complete
//==============================================

document.addEventListener("DOMContentLoaded",()=>{

    updateProductCount(allProducts.length);

});


//==============================================
// Card Hover Animation
//==============================================

document.addEventListener("mouseover",(e)=>{

    const card = e.target.closest(".product-card");

    if(card){

        card.style.transform="translateY(-8px)";

        card.style.transition="0.3s";

    }

});


document.addEventListener("mouseout",(e)=>{

    const card = e.target.closest(".product-card");

    if(card){

        card.style.transform="translateY(0)";

    }

});


//==============================================
// Image Lazy Fallback
//==============================================

document.addEventListener("error",(e)=>{

    if(e.target.tagName==="IMG"){

        e.target.src="images/no-image.png";

    }

},true);


//==============================================
// Debug Information
//==============================================

console.log("✅ SHGT Products Module Loaded");

console.log("Total Products :",allProducts.length);


//==================================================
// END OF PRODUCTS.JS
// SH GLOBAL TECHNOLOGY PREMIUM FINAL
//==================================================
