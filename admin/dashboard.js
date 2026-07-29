//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-1
//==================================================

import { auth, db } from "../js/firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    query,
    limit
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

//==============================================
// HTML Elements
//==============================================

const totalProducts = document.getElementById("totalProducts");
const totalParts = document.getElementById("totalParts");
const totalQuotation = document.getElementById("totalQuotation");
const totalImages = document.getElementById("totalImages");

const productTable = document.getElementById("productTable");

const logoutBtn = document.getElementById("logoutBtn");

//==============================================
// Login Check
//==============================================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        location.href = "login.html";

        return;

    }

    loadDashboard();

});

//==============================================
// Dashboard Data
//==============================================

async function loadDashboard() {

    await loadProducts();

    await loadSpareParts();

    await loadQuotation();

}

//==============================================
// Product Count
//==============================================

async function loadProducts() {

    const snapshot = await getDocs(collection(db, "products"));

    totalProducts.innerText = snapshot.size;

    productTable.innerHTML = "";

    snapshot.forEach((item) => {

        const product = item.data();

        productTable.innerHTML += `

        <tr>

            <td>

                <img src="${product.image}"

                width="60"

                height="60"

                style="border-radius:8px;object-fit:cover;">

            </td>

            <td>${product.name}</td>

            <td>${product.brand}</td>

            <td>${product.category}</td>

            <td>${product.status}</td>

            <td>

                <button
                class="edit-btn"
                data-id="${item.id}">

                Edit

                </button>

                <button
                class="delete-btn"
                data-id="${item.id}">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

//==============================================
// Spare Parts Count
//==============================================

async function loadSpareParts() {

    const snapshot = await getDocs(collection(db, "spare-parts"));

    totalParts.innerText = snapshot.size;

}

//==============================================
// Quotation Count
//==============================================

async function loadQuotation() {

    const snapshot = await getDocs(collection(db, "quotation"));

    totalQuotation.innerText = snapshot.size;

}

//==============================================
// Temporary Cloudinary Counter
//==============================================

totalImages.innerText = "0";
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-2
//==================================================

//==============================================
// Delete Product
//==============================================

document.addEventListener("click", async (e) => {

    if (e.target.classList.contains("delete-btn")) {

        const id = e.target.dataset.id;

        const confirmDelete = confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            await deleteDoc(doc(db, "products", id));

            alert("✅ Product deleted successfully.");

            loadDashboard();

        } catch (error) {

            console.error(error);

            alert("❌ Failed to delete product.");

        }

    }

});

//==============================================
// Edit Product
//==============================================

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("edit-btn")) {

        const id = e.target.dataset.id;

        location.href = `edit-product.html?id=${id}`;

    }

});

//==============================================
// Logout
//==============================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        try {

            await signOut(auth);

            location.href = "login.html";

        } catch (error) {

            console.error(error);

            alert("Logout failed.");

        }

    });

}

//==============================================
// Auto Refresh Dashboard
//==============================================

setInterval(() => {

    loadDashboard();

}, 60000);

//==============================================
// Product Search
//==============================================

const searchInput = document.getElementById("searchProduct");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        document.querySelectorAll("#productTable tr").forEach(row => {

            const text = row.innerText.toLowerCase();

            row.style.display = text.includes(keyword)
                ? ""
                : "none";

        });

    });

}

//==============================================
// Total Images (Cloudinary)
//==============================================

// Cloudinary Admin API requires secure server-side authentication.
// Until a backend is added, display the current number of product
// images stored in Firestore.

async function updateImageCount() {

    const snapshot = await getDocs(collection(db, "products"));

    let count = 0;

    snapshot.forEach(docSnap => {

        const data = docSnap.data();

        if (data.image && data.image.trim() !== "") {

            count++;

        }

    });

    if (totalImages) {

        totalImages.innerText = count;

    }

}

updateImageCount();

//==============================================
// Dashboard Live Refresh
//==============================================

setInterval(() => {

    updateImageCount();

}, 60000);

//==================================================
// End Of Dashboard Part-2
//==================================================
