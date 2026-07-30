//==================================================
// SH GLOBAL TECHNOLOGY
// PRODUCTS.JS FINAL
// Firebase Firestore Live Product Loading
// SHGT-V3.BD
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

const productContainer =
document.getElementById("product-list");


let allProducts = [];




//==================================================
// LOAD PRODUCTS
//==================================================


async function loadProducts(){


    if(!productContainer){

        console.log("Product container not found");

        return;

    }



    productContainer.innerHTML = `

    <div class="loading">

        <h3>Loading Products...</h3>

    </div>

    `;



    try{


        const q = query(

            collection(db,"products"),

            orderBy("createdAt","desc")

        );



        const snapshot = await getDocs(q);



        console.log(
            "Total Docs:",
            snapshot.size
        );



        allProducts = [];



        snapshot.forEach((doc)=>{


            console.log(
                "Product Data:",
                doc.data()
            );



            allProducts.push({

                id:doc.id,

                ...doc.data()

            });


        });



        renderProducts(allProducts);



    }


    catch(error){


        console.error(
            "LOAD ERROR:",
            error
        );



        productContainer.innerHTML = `


        <div class="error">


        <h2>
        ❌ Product Loading Failed
        </h2>


        <p>
        ${error.message}
        </p>


        </div>


        `;


    }



}





//==================================================
// DISPLAY PRODUCTS
//==================================================


function renderProducts(products){


    productContainer.innerHTML = "";



    if(products.length === 0){


        productContainer.innerHTML = `


        <h2>
        No Product Found
        </h2>


        `;


        return;

    }





    products.forEach(product=>{


        productContainer.innerHTML += `


        <div class="card">



        <img

        src="${product.image || 'images/no-image.png'}"

        alt="${product.name}"

        style="
        width:100%;
        height:220px;
        object-fit:contain;
        ">



        <h3>

        ${product.name || ""}

        </h3>



        <p>

        Brand:
        ${product.brand || ""}

        </p>



        <p>

        Model:
        ${product.model || ""}

        </p>



        <p>

        ${product.description || ""}

        </p>



        <h4>

        ${product.price || ""}

        </h4>



        <a

        href="product.html?id=${product.id}"

        class="whatsapp-btn">

        View Details

        </a>



        </div>



        `;



    });



}





//==================================================
// SEARCH
//==================================================


const searchInput =
document.getElementById("searchInput");



if(searchInput){


searchInput.addEventListener(
"input",
()=>{


const keyword =
searchInput.value
.toLowerCase()
.trim();



const result =
allProducts.filter(product=>{


return(

(product.name||"")
.toLowerCase()
.includes(keyword)



||

(product.brand||"")
.toLowerCase()
.includes(keyword)



||

(product.model||"")
.toLowerCase()
.includes(keyword)


);


});



renderProducts(result);



});


}







//==================================================
// BRAND FILTER
//==================================================


const brandFilter =
document.getElementById("brandFilter");



if(brandFilter){


brandFilter.addEventListener(
"change",
()=>{


let brand =
brandFilter.value;



if(brand==="all"){


renderProducts(allProducts);

return;


}



let result =
allProducts.filter(product=>

product.brand === brand

);



renderProducts(result);



});


}







//==================================================
// START
//==================================================


loadProducts();



console.log(
"✅ SHGT Products Module Loaded"
);


//==================================================
// END
//==================================================
