//==================================================
// SH GLOBAL TECHNOLOGY
// PRODUCT MANAGEMENT FINAL
// Firebase Firestore
//==================================================


import { db } from "../js/firebase.js";


import {

collection,
getDocs,
deleteDoc,
doc

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



//==============================================
// HTML Elements
//==============================================

const productsList = 
document.getElementById("productsList");


const searchProduct =
document.getElementById("searchProduct");



let allProducts = [];



//==============================================
// Load Products
//==============================================

async function loadProducts(){


try{


const snapshot = await getDocs(

collection(db,"products")

);



allProducts = [];



snapshot.forEach((item)=>{


allProducts.push({

id:item.id,

...item.data()

});


});



displayProducts(allProducts);



}

catch(error){


console.error(error);


productsList.innerHTML =

`
<tr>
<td colspan="7">

❌ Product Loading Failed

</td>
</tr>
`;


}


}





//==============================================
// Display Products
//==============================================

function displayProducts(products){


productsList.innerHTML="";



products.forEach((product)=>{



productsList.innerHTML +=

`

<tr>


<td>

<img src="${product.image || '../images/no-image.png'}"

width="70"

height="70"

style="object-fit:cover;border-radius:8px;">


</td>



<td>${product.name}</td>


<td>${product.brand}</td>


<td>${product.model}</td>


<td>${product.category}</td>


<td>${product.status}</td>



<td>


<button

class="edit-btn"

data-id="${product.id}">

<i class="fas fa-edit"></i>

Edit

</button>



<button

class="delete-btn"

data-id="${product.id}">

<i class="fas fa-trash"></i>

Delete

</button>



</td>


</tr>


`;



});


}





//==============================================
// Search Product
//==============================================

searchProduct.addEventListener("keyup",()=>{


const value =

searchProduct.value.toLowerCase();



const filtered = allProducts.filter(product=>{


return (

product.name.toLowerCase().includes(value)

||

product.brand.toLowerCase().includes(value)

||

product.model.toLowerCase().includes(value)

);


});



displayProducts(filtered);



});






//==============================================
// Delete Product
//==============================================

document.addEventListener("click",async(e)=>{


if(e.target.closest(".delete-btn")){


const id =

e.target.closest(".delete-btn").dataset.id;



const confirmDelete = confirm(

"Delete this product?"

);



if(confirmDelete){



await deleteDoc(

doc(db,"products",id)

);



alert(
"✅ Product Deleted"
);



loadProducts();



}


}




});





//==============================================
// Edit Product
//==============================================

document.addEventListener("click",(e)=>{


if(e.target.closest(".edit-btn")){


const id =

e.target.closest(".edit-btn").dataset.id;



location.href =

`edit-product.html?id=${id}`;


}



});





//==============================================
// Start
//==============================================

loadProducts();


//==================================================
// END
//==================================================
