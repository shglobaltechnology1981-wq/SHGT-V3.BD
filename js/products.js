//==================================================
// SH GLOBAL TECHNOLOGY
// PRODUCTS.JS PART-1
// Firebase Live Product Loading
// SHGT-V3.BD FINAL
//==================================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

//==============================================
// HTML Elements
//==============================================

const productContainer = document.getElementById("product-container");

let allProducts = [];

//==============================================
// Load Products
//==============================================

async function loadProducts() {

    if (!productContainer) return;

    productContainer.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <h3>Loading Products...</h3>
        </div>
    `;
try {

    const q = query(
        collection(db, "products"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    console.log("Total Docs:", snapshot.size);

    allProducts = [];

    snapshot.forEach((doc) => {

        console.log(doc.id, doc.data());

        allProducts.push({
            id: doc.id,
            ...doc.data()
        });

    });

    renderProducts(allProducts);

}
catch(error){

    console.error("LOAD ERROR:", error);

    alert(error.message);

}

   catch(error){

    console.error("LOAD ERROR:", error);

    alert("LOAD ERROR: " + error.message);

    productContainer.innerHTML = `

        <div class="error">

            <h2>❌ Failed To Load Products</h2>

            <p>${error.message}</p>

        </div>

    `;

}
//==============================================
// Render Products
//==============================================

function renderProducts(products) {

    productContainer.innerHTML = "";

    if (products.length === 0) {

        productContainer.innerHTML = `
            <div class="empty">
                <h2>No Products Found</h2>
            </div>
        `;

        return;
    }

    products.forEach((product) => {

        productContainer.innerHTML += `

        <div class="product-card">

            <div class="product-image">

                <img
                    src="${product.image || 'images/no-image.png'}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.src='images/no-image.png'">

            </div>

            <div class="product-info">

                <h3>${product.name || ""}</h3>

                <p><strong>Brand:</strong> ${product.brand || ""}</p>

                <p><strong>Category:</strong> ${product.category || ""}</p>

                <p><strong>Model:</strong> ${product.model || ""}</p>

                <div class="price">

                    ${product.price || "Contact for Price"}

                </div>

                <div class="status">

                    <span class="available">

                        ${product.status || "Available"}

                    </span>

                </div>

                <a
                    href="product.html?id=${product.id}"
                    class="btn btn-primary">

                    View Details

                </a>

            </div>

        </div>

        `;

    });

}

//==============================================
// Product Counter
//==============================================

function updateProductCount(total) {

    const counter = document.getElementById("totalProducts");

    if (counter) {

        counter.textContent = total;

    }

}

//==============================================
// Initial Load
//==============================================

loadProducts();

//==================================================
// END OF PART-1
//==================================================
