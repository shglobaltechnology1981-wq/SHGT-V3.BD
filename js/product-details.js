//==================================================
// SH GLOBAL TECHNOLOGY
// PRODUCT DETAILS JS FINAL
// Firebase Firestore
// SHGT-V3.BD
//==================================================


import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



//==============================================
// HTML ELEMENT
//==============================================

const productDetails =
document.getElementById("product-details");



//==============================================
// GET PRODUCT ID FROM URL
//==============================================

const params =
new URLSearchParams(window.location.search);


const productId =
params.get("id");




//==============================================
// LOAD PRODUCT DETAILS
//==============================================

async function loadProduct(){


    if(!productDetails){

        console.log("Product details container not found");

        return;

    }



    if(!productId){

        productDetails.innerHTML =

        "<h2>Product ID Missing</h2>";

        return;

    }



    try{


        const productRef =
        doc(db,"products",productId);



        const snapshot =
        await getDoc(productRef);



        if(snapshot.exists()){


            const product =
            snapshot.data();



            productDetails.innerHTML = `


            <img 
            src="${product.image || 'images/no-image.png'}"

            alt="${product.name || ''}"

            style="
            width:100%;
            max-height:400px;
            object-fit:contain;
            border-radius:10px;
            ">



            <h2>
            ${product.name || ""}
            </h2>



            <h3>
            Brand: ${product.brand || ""}
            </h3>



            <p>
            <b>Model:</b>
            ${product.model || ""}
            </p>



            <p>
            <b>Category:</b>
            ${product.category || ""}
            </p>



            <p>
            <b>Price:</b>
            ${product.price || "Contact For Price"}
            </p>



            <p>
            ${product.description || ""}
            </p>



            <br>



            <a 

            class="whatsapp-btn"

            href="https://wa.me/8801621007916?text=Hello SH Global Technology, I need details about ${product.name}"

            target="_blank">

            WhatsApp Inquiry

            </a>



            `;



        }

        else{


            productDetails.innerHTML =

            "<h2>Product Not Found</h2>";


        }



    }


    catch(error){


        console.error(
            "Product Details Error:",
            error
        );


        productDetails.innerHTML =

        "<h2>Loading Error</h2>";


    }


}



//==============================================
// START
//==============================================

loadProduct();


//==================================================
// END
//==================================================
