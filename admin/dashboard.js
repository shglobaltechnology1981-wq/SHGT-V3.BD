//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-1
// Firebase Connection + Login Check
//==================================================


import { auth, db, storage } from "../js/firebase.js";


import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


import {
    collection,
    getDocs,
    getDoc,
    deleteDoc,
    doc,
    query,
    limit,
    updateDoc,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

//==================================================
// HTML ELEMENTS
//==================================================


const logoutBtn =
document.getElementById("logoutBtn");


const adminEmail =
document.getElementById("adminEmail");




//==================================================
// ADMIN LOGIN CHECK
//==================================================


onAuthStateChanged(auth,(user)=>{


    if(user){


        console.log(
            "Admin Login:",
            user.email
        );


        if(adminEmail){

            adminEmail.innerHTML =
            user.email;

        }


        // Load Dashboard Data

        loadDashboard();



    }else{


        location.href =
        "login.html";


    }



});




//==================================================
// LOGOUT SYSTEM
//==================================================


if(logoutBtn){


logoutBtn.addEventListener(
"click",
async()=>{


    try{


        await signOut(auth);


        location.href =
        "login.html";


    }


    catch(error){


        console.log(
        "Logout Error:",
        error
        );


    }


});


}




//==================================================
// DASHBOARD START FUNCTION
//==================================================


async function loadDashboard(){


    console.log(
    "SHGT Dashboard Loading..."
    );


    // Next Part will load:
    // Products
    // Spare Parts
    // Quotations
    // Images


}


//==================================================
// END PART-1
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-2
// Product Load System
//==================================================


import {

    collection,
    getDocs

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";




//==================================================
// HTML ELEMENTS
//==================================================


const totalProducts =
document.getElementById(
"totalProducts"
);


const productTable =
document.getElementById(
"productTable"
);




//==================================================
// LOAD PRODUCTS
//==================================================


async function loadProducts(){


    try{


        const snapshot =
        await getDocs(
            collection(db,"products")
        );



        // Total Product Count

        if(totalProducts){

            totalProducts.innerText =
            snapshot.size;

        }



        // Clear Table

        if(productTable){

            productTable.innerHTML="";

        }



        snapshot.forEach((item)=>{


            const product =
            item.data();



            if(productTable){


            productTable.innerHTML += `


            <tr>


            <td>

            <img src="${product.image || ''}"

            width="60"

            height="60"

            style="
            object-fit:cover;
            border-radius:8px;
            ">

            </td>



            <td>
            ${product.name || ""}
            </td>



            <td>
            ${product.brand || ""}
            </td>



            <td>
            ${product.category || ""}
            </td>



            <td>
            ${product.status || "Active"}
            </td>



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


            }



        });



        console.log(
        "Products Loaded:",
        snapshot.size
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
// ADD TO DASHBOARD LOAD
//==================================================


async function loadDashboard(){


    await loadProducts();


}


//==================================================
// END PART-2
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-3
// Delete + Edit Product
//==================================================


//==================================================
// DELETE PRODUCT
//==================================================


document.addEventListener(
"click",
async(e)=>{


    if(
    e.target.classList.contains(
    "delete-btn"
    )
    ){


        const id =
        e.target.dataset.id;



        const confirmDelete =
        confirm(
        "Are you sure you want to delete this product?"
        );



        if(!confirmDelete){

            return;

        }



        try{


            await deleteDoc(
                doc(
                db,
                "products",
                id
                )
            );



            alert(
            "✅ Product Deleted Successfully"
            );



            loadDashboard();



        }


        catch(error){


            console.error(
            "Delete Error:",
            error
            );


            alert(
            "❌ Delete Failed"
            );


        }



    }



});







//==================================================
// EDIT PRODUCT
//==================================================


document.addEventListener(
"click",
(e)=>{


    if(
    e.target.classList.contains(
    "edit-btn"
    )
    ){


        const id =
        e.target.dataset.id;



        location.href =
        "edit-product.html?id="
        + id;



    }


});




//==================================================
// END PART-3
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-4
// Spare Parts + Quotation + Image Counter
//==================================================


//==================================================
// HTML ELEMENTS
//==================================================


const totalParts =
document.getElementById(
"totalParts"
);



const totalQuotation =
document.getElementById(
"totalQuotation"
);



const totalImages =
document.getElementById(
"totalImages"
);




//==================================================
// SPARE PARTS COUNT
//==================================================


async function loadSpareParts(){


    try{


        const snapshot =
        await getDocs(
            collection(db,"spare-parts")
        );



        if(totalParts){


            totalParts.innerText =
            snapshot.size;


        }



    }


    catch(error){


        console.error(
        "Spare Parts Error:",
        error
        );


    }


}






//==================================================
// QUOTATION COUNT
//==================================================


async function loadQuotation(){


    try{


        const snapshot =
        await getDocs(
            collection(db,"quotation")
        );



        if(totalQuotation){


            totalQuotation.innerText =
            snapshot.size;


        }



    }


    catch(error){


        console.error(
        "Quotation Error:",
        error
        );


    }


}







//==================================================
// PRODUCT IMAGE COUNT
//==================================================


async function loadImages(){


    try{


        const snapshot =
        await getDocs(
            collection(db,"products")
        );



        let count = 0;



        snapshot.forEach((item)=>{


            const data =
            item.data();



            if(
            data.image &&
            data.image.trim() !== ""
            ){


                count++;


            }



        });




        if(totalImages){


            totalImages.innerText =
            count;


        }



    }


    catch(error){


        console.error(
        "Image Count Error:",
        error
        );


    }


}






//==================================================
// UPDATE DASHBOARD LOAD
//==================================================


async function loadDashboard(){


    await loadProducts();


    await loadSpareParts();


    await loadQuotation();


    await loadImages();


}




//==================================================
// END PART-4
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-5
// Search + Auto Refresh
//==================================================


//==================================================
// PRODUCT SEARCH
//==================================================


const searchInput =
document.getElementById(
"searchProduct"
);



if(searchInput){


searchInput.addEventListener(
"keyup",
function(){



    const keyword =
    this.value.toLowerCase();



    const rows =
    document.querySelectorAll(
    "#productTable tr"
    );



    rows.forEach((row)=>{



        const text =
        row.innerText.toLowerCase();



        if(
        text.includes(keyword)
        ){


            row.style.display="";


        }else{


            row.style.display="none";


        }



    });



});


}







//==================================================
// AUTO REFRESH DASHBOARD
//==================================================


setInterval(
()=>{


    loadDashboard();


},
60000
);





//==================================================
// END PART-5
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-6
// Recent Products + Dashboard Summary
//==================================================


//==================================================
// RECENT PRODUCT LIST
//==================================================


const recentProducts =
document.getElementById(
"recentProducts"
);





async function loadRecentProducts(){


    try{


        const productQuery =
        query(
            collection(db,"products"),
            limit(5)
        );



        const snapshot =
        await getDocs(productQuery);



        if(!recentProducts){

            return;

        }



        recentProducts.innerHTML="";



        snapshot.forEach((item)=>{


            const data =
            item.data();



            recentProducts.innerHTML += `


            <div class="recent-item">


            <img src="${data.image || ''}"

            width="50"

            height="50"

            style="
            object-fit:cover;
            border-radius:6px;
            ">



            <span>

            ${data.name || "No Name"}

            <br>

            <small>
            ${data.brand || ""}
            </small>

            </span>


            </div>


            `;


        });



    }


    catch(error){


        console.error(
        "Recent Product Error:",
        error
        );


    }


}






//==================================================
// UPDATE LOAD DASHBOARD
//==================================================


async function loadDashboard(){


    await loadProducts();


    await loadSpareParts();


    await loadQuotation();


    await loadImages();


    await loadRecentProducts();


}





//==================================================
// END PART-6
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-7
// Product Status Update
//==================================================



//==================================================
// CHANGE PRODUCT STATUS
//==================================================


document.addEventListener(
"click",
async(e)=>{


    if(
    e.target.classList.contains(
    "status-btn"
    )
    ){


        const id =
        e.target.dataset.id;



        const currentStatus =
        e.target.dataset.status;



        let newStatus;



        if(
        currentStatus === "Active"
        ){


            newStatus =
            "Inactive";


        }else{


            newStatus =
            "Active";


        }



        try{


            await updateDoc(

                doc(
                db,
                "products",
                id
                ),

                {

                status:newStatus

                }

            );



            alert(
            "Status Updated"
            );



            loadDashboard();



        }


        catch(error){


            console.error(
            "Status Update Error:",
            error
            );


        }



    }


});




//==================================================
// END PART-7
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-8
// Product Add + Image Upload
//==================================================



//==================================================
// PRODUCT UPLOAD
//==================================================


const uploadBtn =
document.getElementById(
"uploadProductBtn"
);



if(uploadBtn){


uploadBtn.addEventListener(
"click",
async()=>{



const name =
document.getElementById(
"productName"
).value;



const brand =
document.getElementById(
"productBrand"
).value;



const category =
document.getElementById(
"productCategory"
).value;



const imageFile =
document.getElementById(
"productImageFile"
).files[0];





if(
!name ||
!brand ||
!category ||
!imageFile
){


alert(
"Please fill all fields"
);


return;


}





try{



// Create Image Reference

const imageRef =
ref(

storage,

"products/" +

Date.now() +

"_" +

imageFile.name

);





// Upload Image

await uploadBytes(

imageRef,

imageFile

);





// Get Image URL

const imageURL =
await getDownloadURL(
imageRef
);






// Save Product Data

await addDoc(

collection(db,"products"),

{


name:name,

brand:brand,

category:category,

image:imageURL,

status:"Active",

createdAt:
new Date()


}


);





alert(
"✅ Product Added Successfully"
);



loadDashboard();



}



catch(error){


console.error(
"Upload Error:",
error
);



alert(
"❌ Upload Failed"
);



}



});


}




//==================================================
// END PART-8
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-9
// Product Edit + Update System
//==================================================



//==================================================
// EDIT PRODUCT PAGE
//==================================================


document.addEventListener(
"click",
(e)=>{


    if(
    e.target.classList.contains(
    "edit-btn"
    )
    ){


        const id =
        e.target.dataset.id;



        location.href =
        "edit-product.html?id="
        + id;


    }


});






//==================================================
// LOAD PRODUCT FOR EDIT
//==================================================


async function loadEditProduct(id){


    const productRef =
    doc(
    db,
    "products",
    id
    );



    const snapshot =
    await getDoc(
    productRef
    );



    if(snapshot.exists()){


        const data =
        snapshot.data();



        document.getElementById(
        "editName"
        ).value =
        data.name || "";



        document.getElementById(
        "editBrand"
        ).value =
        data.brand || "";



        document.getElementById(
        "editCategory"
        ).value =
        data.category || "";



        document.getElementById(
        "oldImage"
        ).value =
        data.image || "";



    }


}






//==================================================
// UPDATE PRODUCT
//==================================================


async function updateProduct(){


const id =
document.getElementById(
"editProductId"
).value;



let imageURL =
document.getElementById(
"oldImage"
).value;



const newImage =
document.getElementById(
"editImageFile"
).files[0];





try{



// New Image Upload

if(newImage){


const imageRef =
ref(

storage,

"products/" +

Date.now() +

"_" +

newImage.name

);



await uploadBytes(

imageRef,

newImage

);



imageURL =
await getDownloadURL(
imageRef
);


}





await updateDoc(

doc(
db,
"products",
id
),

{


name:
document.getElementById(
"editName"
).value,



brand:
document.getElementById(
"editBrand"
).value,



category:
document.getElementById(
"editCategory"
).value,



image:imageURL,


updatedAt:
new Date()


}

);




alert(
"✅ Product Updated Successfully"
);



location.href =
"dashboard.html";



}



catch(error){


console.error(
"Update Error:",
error
);



alert(
"❌ Update Failed"
);



}



}






//==================================================
// UPDATE BUTTON
//==================================================


const updateBtn =
document.getElementById(
"updateProductBtn"
);



if(updateBtn){


updateBtn.addEventListener(
"click",
updateProduct
);


}





//==================================================
// END PART-9
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-10
// Admin Security + Final Control
//==================================================



//==================================================
// CHECK ADMIN USER
//==================================================


onAuthStateChanged(
auth,
(user)=>{


    if(!user){


        location.href =
        "login.html";


        return;


    }



    console.log(
    "Verified Admin:",
    user.email
    );



});







//==================================================
// DISABLE RIGHT CLICK
//==================================================


document.addEventListener(
"contextmenu",
(e)=>{


    e.preventDefault();


});






//==================================================
// DASHBOARD READY MESSAGE
//==================================================


console.log(
"SHGT ADMIN DASHBOARD FINAL READY"
);





//==================================================
// END PART-10
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-11
// Firebase Connection Check
//==================================================



//==================================================
// FIREBASE CONNECTION TEST
//==================================================


async function firebaseCheck(){


try{


    const test =
    await getDocs(
        collection(db,"products")
    );



    console.log(
    "Firebase Connected Successfully"
    );



    console.log(
    "Product Collection Size:",
    test.size
    );



}


catch(error){


    console.error(
    "Firebase Connection Failed:",
    error
    );


}


}




//==================================================
// RUN CHECK
//==================================================


firebaseCheck();





//==================================================
// GLOBAL ERROR HANDLER
//==================================================


window.addEventListener(
"error",
(event)=>{


    console.error(
    "Dashboard Error:",
    event.error
    );


});





//==================================================
// END PART-11
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-12
// Product Backup + Export CSV
//==================================================



//==================================================
// EXPORT PRODUCT DATA
//==================================================


const exportBtn =
document.getElementById(
"exportProductBtn"
);



if(exportBtn){


exportBtn.addEventListener(
"click",
async()=>{


try{


    const snapshot =
    await getDocs(
        collection(db,"products")
    );



    let csv =
    "Name,Brand,Category,Status,Image\n";



    snapshot.forEach((item)=>{


        const data =
        item.data();



        csv +=

        `"${data.name || ""}",` +

        `"${data.brand || ""}",` +

        `"${data.category || ""}",` +

        `"${data.status || ""}",` +

        `"${data.image || ""}"\n`;



    });






    const blob =
    new Blob(
    [csv],
    {
        type:"text/csv"
    }
    );



    const url =
    URL.createObjectURL(
    blob
    );



    const link =
    document.createElement(
    "a"
    );



    link.href =
    url;



    link.download =
    "SHGT_Product_Backup.csv";



    link.click();



    URL.revokeObjectURL(
    url
    );



    alert(
    "✅ Product Backup Export Completed"
    );



}



catch(error){


    console.error(
    "Export Error:",
    error
    );


    alert(
    "❌ Export Failed"
    );


}



});


}





//==================================================
// END PART-12
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-13
// Final Clean Up + Ready Check
//==================================================



//==================================================
// REQUIRED ELEMENT CHECK
//==================================================


function dashboardElementCheck(){


const elements = [


"totalProducts",

"totalParts",

"totalQuotation",

"totalImages",

"productTable",

"logoutBtn"


];



elements.forEach((id)=>{


const item =
document.getElementById(id);



if(!item){


console.warn(
"Missing HTML Element:",
id
);



}else{


console.log(
"Element OK:",
id
);


}



});



}





//==================================================
// DASHBOARD START CHECK
//==================================================


window.addEventListener(
"load",
()=>{


    dashboardElementCheck();



    console.log(
    "================================"
    );


    console.log(
    "SHGT ADMIN DASHBOARD READY"
    );


    console.log(
    "All Modules Loaded"
    );


    console.log(
    "================================"
    );


});





//==================================================
// END PART-13
//==================================================


//==================================================
// END OF dashboard.js
//==================================================
