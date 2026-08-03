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
// END PART-1
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-2
// Product Load System
//==================================================


//==================================================
// HTML ELEMENTS
//==================================================

const totalProducts =
document.getElementById("totalProducts");


const productTable =
document.getElementById("productTable");



//==================================================
// LOAD PRODUCTS FROM FIREBASE
//==================================================

async function loadProducts(){


try{


const snapshot = await getDocs(

collection(
db,
"products"
)

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


const data =
item.data();



productTable.innerHTML += `


<tr>


<td>

<img

src="${data.image || '../images/no-image.png'}"

width="60"

height="60"

style="object-fit:cover;border-radius:8px;"

>

</td>



<td>

${data.name || ""}

</td>



<td>

${data.brand || ""}

</td>



<td>

${data.category || ""}

</td>



<td>

<span class="status">

${data.status || "Active"}

</span>

</td>




<td>


<button

class="edit-btn"

data-id="${item.id}"

>

✏ Edit

</button>



<button

class="delete-btn"

data-id="${item.id}"

>

🗑 Delete

</button>



</td>



</tr>


`;



});



console.log(

"Product Loaded :",

snapshot.size

);



}


catch(error){


console.error(

"Product Load Error",

error

);


}


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
e.target.classList.contains("delete-btn")
){


const id =
e.target.dataset.id;



const confirmDelete =
confirm(
"Delete this Product?"
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
e.target.classList.contains("edit-btn")
){


const id =
e.target.dataset.id;



location.href =
"edit-product.html?id="+id;



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
document.getElementById("totalParts");


const totalQuotation =
document.getElementById("totalQuotation");


const totalImages =
document.getElementById("totalImages");



//==================================================
// LOAD SPARE PARTS COUNT
//==================================================

async function loadSpareParts(){

try{

const snapshot =
await getDocs(

collection(
db,
"spare-parts"
)

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
// LOAD QUOTATION COUNT
//==================================================

async function loadQuotation(){

try{

const snapshot =
await getDocs(

collection(
db,
"quotation"
)

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
// LOAD IMAGE COUNT
//==================================================

async function loadImages(){

try{

const snapshot =
await getDocs(

collection(
db,
"products"
)

);

let imageCount = 0;

snapshot.forEach((item)=>{

const data =
item.data();

if(
data.image &&
data.image !== ""
){

imageCount++;

}

});


if(totalImages){

totalImages.innerText =
imageCount;

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
// END PART-4
//==================================================
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-5
// Search + Auto Refresh
//==================================================


//==================================================
// SEARCH PRODUCT
//==================================================

const searchProduct =
document.getElementById("searchProduct");


if(searchProduct){

searchProduct.addEventListener(

"keyup",

()=>{

const keyword =
searchProduct.value.toLowerCase();

const rows =
document.querySelectorAll(
"#productTable tr"
);

rows.forEach((row)=>{

const text =
row.innerText.toLowerCase();

if(text.includes(keyword)){

row.style.display="";

}else{

row.style.display="none";

}

});

}

);

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
// LOAD ALL DASHBOARD DATA
//==================================================

async function loadDashboard(){

await loadProducts();

await loadSpareParts();

await loadQuotation();

await loadImages();

if(typeof loadRecentProducts==="function"){

await loadRecentProducts();

}

if(typeof loadSparePartsTable==="function"){

await loadSparePartsTable();

}

}




//==================================================
// READY
//==================================================

console.log(

"Dashboard Search Ready"

);


//==================================================
// END PART-5
//==================================================

       
//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-6
// Recent Products + Dashboard Loader
//==================================================


//==================================================
// HTML ELEMENT
//==================================================

const recentProducts =
document.getElementById("recentProducts");



//==================================================
// LOAD RECENT PRODUCTS
//==================================================

async function loadRecentProducts(){

try{

const q = query(

collection(
db,
"products"
),

limit(5)

);

const snapshot =
await getDocs(q);


if(!recentProducts) return;

recentProducts.innerHTML = "";


snapshot.forEach((item)=>{

const data =
item.data();


recentProducts.innerHTML += `

<div class="recent-item">

<img
src="${data.image || '../images/no-image.png'}"
width="55"
height="55"
style="
width:55px;
height:55px;
object-fit:cover;
border-radius:8px;
margin-right:10px;
">

<div>

<b>

${data.name || "No Name"}

</b>

<br>

<small>

${data.brand || ""}

</small>

</div>

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
// LOAD DASHBOARD
//==================================================

async function loadDashboard(){

await loadProducts();

await loadSpareParts();

await loadQuotation();

await loadImages();

await loadRecentProducts();

if(typeof loadSparePartsTable==="function"){

await loadSparePartsTable();

}

}




//==================================================
// INITIAL LOAD
//==================================================

loadDashboard();




//==================================================
// READY
//==================================================

console.log(
"Dashboard Loader Ready"
);


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

e.target.classList.contains("status-btn")

){

const id =
e.target.dataset.id;

const currentStatus =
e.target.dataset.status;


const newStatus =

currentStatus === "Active"

?

"Inactive"

:

"Active";


try{

await updateDoc(

doc(
db,
"products",
id
),

{

status:newStatus,

updatedAt:new Date()

}

);


alert(
"✅ Product Status Updated"
);


loadDashboard();


}

catch(error){

console.error(
"Status Update Error:",
error
);

alert(
"❌ Status Update Failed"
);

}

}

});




//==================================================
// READY
//==================================================

console.log(
"Product Status Module Ready"
);


//==================================================
// END PART-7
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-8
// Product Upload + Firebase Storage
//==================================================


//==================================================
// HTML ELEMENT
//==================================================

const uploadProductBtn =
document.getElementById("uploadProductBtn");


//==================================================
// PRODUCT UPLOAD
//==================================================

if(uploadProductBtn){

uploadProductBtn.addEventListener(

"click",

async()=>{

try{

const name =
document.getElementById("productName").value.trim();

const brand =
document.getElementById("productBrand").value.trim();

const category =
document.getElementById("productCategory").value.trim();

const imageFile =
document.getElementById("productImageFile").files[0];


if(
!name ||
!brand ||
!category ||
!imageFile
){

alert("Please Fill All Fields");

return;

}


//==================================================
// IMAGE UPLOAD
//==================================================

const imageRef =

ref(

storage,

"products/" +

Date.now() +

"_" +

imageFile.name

);


await uploadBytes(

imageRef,

imageFile

);


const imageURL =

await getDownloadURL(

imageRef

);


//==================================================
// SAVE FIRESTORE
//==================================================

await addDoc(

collection(
db,
"products"
),

{

name:name,

brand:brand,

category:category,

image:imageURL,

status:"Active",

createdAt:new Date()

}

);


alert(
"✅ Product Uploaded Successfully"
);


//==================================================
// RESET FORM
//==================================================

document.getElementById("productName").value="";

document.getElementById("productBrand").value="";

document.getElementById("productCategory").value="";

document.getElementById("productImageFile").value="";


if(typeof loadDashboard==="function"){

loadDashboard();

}


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
// READY
//==================================================

console.log(
"Firebase Storage Upload Ready"
);


//==================================================
// END PART-8
//==================================================

//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-9
// Edit Product + Update System
//==================================================


//==================================================
// LOAD PRODUCT FOR EDIT
//==================================================

async function loadEditProduct(id){

try{

const productRef =
doc(
db,
"products",
id
);

const snapshot =
await getDoc(productRef);

if(snapshot.exists()){

const data =
snapshot.data();

document.getElementById("editProductId").value=id;

document.getElementById("editName").value=
data.name || "";

document.getElementById("editBrand").value=
data.brand || "";

document.getElementById("editCategory").value=
data.category || "";

document.getElementById("oldImage").value=
data.image || "";

}

}
catch(error){

console.error(
"Load Product Error:",
error
);

}

}




//==================================================
// UPDATE PRODUCT
//==================================================

async function updateProduct(){

try{

const id =
document.getElementById("editProductId").value;

let imageURL =
document.getElementById("oldImage").value;

const newImage =
document.getElementById("editImageFile").files[0];


// Upload New Image

if(newImage){

const imageRef =

ref(

storage,

"products/"+

Date.now()+"_"+

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


// Update Firestore

await updateDoc(

doc(
db,
"products",
id
),

{

name:
document.getElementById("editName").value,

brand:
document.getElementById("editBrand").value,

category:
document.getElementById("editCategory").value,

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

const updateProductBtn =
document.getElementById("updateProductBtn");


if(updateProductBtn){

updateProductBtn.addEventListener(

"click",

updateProduct

);

}




//==================================================
// AUTO LOAD EDIT PRODUCT
//==================================================

const params =
new URLSearchParams(
window.location.search
);

const productId =
params.get("id");

if(productId){

loadEditProduct(productId);

}



//==================================================
// READY
//==================================================

console.log(
"Product Edit Module Ready"
);


//==================================================
// END PART-9
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-10
// Dashboard Security + Keyboard Protection
//==================================================


//==================================================
// DISABLE RIGHT CLICK
//==================================================

document.addEventListener(

"contextmenu",

(e)=>{

e.preventDefault();

}

);




//==================================================
// DISABLE F12
//==================================================

document.addEventListener(

"keydown",

(e)=>{

if(e.key==="F12"){

e.preventDefault();

}

}

);




//==================================================
// DISABLE CTRL + SHIFT + I
//==================================================

document.addEventListener(

"keydown",

(e)=>{

if(

e.ctrlKey &&

e.shiftKey &&

(e.key==="I" || e.key==="i")

){

e.preventDefault();

}

}

);




//==================================================
// DISABLE CTRL + SHIFT + J
//==================================================

document.addEventListener(

"keydown",

(e)=>{

if(

e.ctrlKey &&

e.shiftKey &&

(e.key==="J" || e.key==="j")

){

e.preventDefault();

}

}

);




//==================================================
// DISABLE CTRL + U
//==================================================

document.addEventListener(

"keydown",

(e)=>{

if(

e.ctrlKey &&

(e.key==="U" || e.key==="u")

){

e.preventDefault();

}

}

);




//==================================================
// DISABLE CTRL + SHIFT + C
//==================================================

document.addEventListener(

"keydown",

(e)=>{

if(

e.ctrlKey &&

e.shiftKey &&

(e.key==="C" || e.key==="c")

){

e.preventDefault();

}

}

);




//==================================================
// READY
//==================================================

console.log(

"Dashboard Security Enabled"

);


//==================================================
// END PART-10
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-11
// Firebase Connection Check + Global Error Handler
//==================================================


//==================================================
// FIREBASE CONNECTION CHECK
//==================================================

async function firebaseCheck(){

try{

const snapshot =

await getDocs(

collection(
db,
"products"
)

);

console.log(

"Firebase Connected Successfully"

);

console.log(

"Total Products :",

snapshot.size

);

}

catch(error){

console.error(

"Firebase Connection Failed",

error

);

}

}




//==================================================
// RUN FIREBASE CHECK
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

event.message

);

console.error(

event.error

);

}

);




//==================================================
// UNHANDLED PROMISE ERROR
//==================================================

window.addEventListener(

"unhandledrejection",

(event)=>{

console.error(

"Promise Error:",

event.reason

);

}

);




//==================================================
// DASHBOARD READY
//==================================================

console.log("================================");

console.log("SH GLOBAL TECHNOLOGY");

console.log("ADMIN DASHBOARD READY");

console.log("Firebase Connected");

console.log("================================");




//==================================================
// END PART-11
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-12
// Export Product Backup CSV
//==================================================


//==================================================
// HTML ELEMENT
//==================================================

const exportProductBtn =
document.getElementById("exportProductBtn");


//==================================================
// EXPORT CSV
//==================================================

if(exportProductBtn){

exportProductBtn.addEventListener(

"click",

async()=>{

try{

const snapshot =

await getDocs(

collection(
db,
"products"
)

);


let csv =

"Name,Brand,Category,Status,Image\n";


snapshot.forEach((item)=>{

const data =
item.data();

csv +=

`"${data.name || ""}",`+

`"${data.brand || ""}",`+

`"${data.category || ""}",`+

`"${data.status || ""}",`+

`"${data.image || ""}"\n`;

});


const blob =

new Blob(

[csv],

{

type:"text/csv;charset=utf-8;"

}

);


const url =

URL.createObjectURL(blob);


const link =

document.createElement("a");


link.href = url;

link.download =

"SHGT_Product_Backup.csv";


document.body.appendChild(link);

link.click();

document.body.removeChild(link);

URL.revokeObjectURL(url);


alert(

"✅ Product Backup Export Successfully"

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
// READY
//==================================================

console.log(

"Product Backup Export Ready"

);


//==================================================
// END PART-12
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-13
// Final Ready Check + Dashboard Loader
//==================================================


//==================================================
// REQUIRED HTML ELEMENT CHECK
//==================================================

function dashboardElementCheck(){

const elements = [

"totalProducts",

"totalParts",

"totalQuotation",

"totalImages",

"productTable",

"sparePartTable",

"recentProducts",

"logoutBtn"

];


elements.forEach((id)=>{

const element =
document.getElementById(id);

if(element){

console.log(
"✔ Element Found:",
id
);

}else{

console.warn(
"✖ Missing Element:",
id
);

}

});

}



//==================================================
// WINDOW LOAD
//==================================================

window.addEventListener(

"load",

async()=>{

dashboardElementCheck();

await loadDashboard();

console.log("================================");
console.log(" SH GLOBAL TECHNOLOGY ");
console.log(" ADMIN DASHBOARD READY ");
console.log(" All Modules Loaded Successfully ");
console.log("================================");

}

);




//==================================================
// AUTO REFRESH
//==================================================

setInterval(

()=>{

loadDashboard();

},

60000

);




//==================================================
// PAGE TITLE
//==================================================

document.title =
"SHGT Admin Dashboard";




//==================================================
// READY
//==================================================

console.log(
"Dashboard Final Check Ready"
);


//==================================================
// END PART-13
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-14
// Spare Parts Display + Image Load FINAL
//==================================================


//==================================================
// HTML ELEMENT
//==================================================

const sparePartTable =
document.getElementById("sparePartTable");


//==================================================
// LOAD SPARE PARTS TABLE
//==================================================

async function loadSparePartsTable(){

    try{

        const snapshot = await getDocs(
            collection(db,"spare-parts")
        );


        if(sparePartTable){

            sparePartTable.innerHTML = "";


            snapshot.forEach((item)=>{

                const part = item.data();


                sparePartTable.innerHTML += `

                <tr>


                    <td>

                        <img
                        src="${part.image || ''}"
                        alt="${part.name || 'Spare Part'}"
                        width="60"
                        height="60"
                        style="
                        object-fit:cover;
                        border-radius:8px;
                        "
                        onerror="this.style.display='none';">

                    </td>


                    <td>
                        ${part.name || ""}
                    </td>


                    <td>
                        ${part.brand || ""}
                    </td>


                    <td>
                        ${part.model || ""}
                    </td>


                    <td>
                        ${part.stock || 0}
                    </td>


                </tr>

                `;


            });


        }


        console.log(
            "Spare Parts Loaded:",
            snapshot.size
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
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-14
// Spare Parts Display + Image Load FINAL
//==================================================


//==================================================
// HTML ELEMENT
//==================================================

const sparePartTable =
document.getElementById("sparePartTable");


//==================================================
// LOAD SPARE PARTS TABLE
//==================================================

async function loadSparePartsTable(){

try{

const snapshot =
await getDocs(

collection(
db,
"spare-parts"
)

);


if(!sparePartTable){

return;

}


sparePartTable.innerHTML = "";


snapshot.forEach((item)=>{

const part =
item.data();


sparePartTable.innerHTML += `

<tr>

<td>

<img

src="${part.image || '../images/no-image.png'}"

alt="${part.name || 'Spare Part'}"

width="60"

height="60"

style="
width:60px;
height:60px;
object-fit:cover;
border-radius:8px;
"

onerror="this.src='../images/no-image.png'"

>

</td>

<td>

${part.name || ""}

</td>

<td>

${part.brand || ""}

</td>

<td>

${part.model || ""}

</td>

<td>

${part.stock || 0}

</td>

</tr>

`;

});


console.log(

"Spare Parts Loaded:",

snapshot.size

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
// LOAD FROM DASHBOARD
//==================================================

if(typeof loadDashboard==="function"){

loadDashboard();

}



//==================================================
// READY
//==================================================

console.log(
"SHGT Spare Parts Module Ready"
);


//==================================================
// END PART-14
//==================================================


//==================================================
// SH GLOBAL TECHNOLOGY
// ADMIN DASHBOARD
// dashboard.js Part-15
// Invoice + Challan + Stock + Issue + Sales Summary
//==================================================


//==================================================
// HTML ELEMENTS
//==================================================

const totalInvoice =
document.getElementById("totalInvoice");


const totalChallan =
document.getElementById("totalChallan");


const totalStock =
document.getElementById("totalStock");


const totalIssue =
document.getElementById("totalIssue");


const totalSales =
document.getElementById("totalSales");


const lowStock =
document.getElementById("lowStock");



//==================================================
// LOAD INVOICE COUNT
//==================================================

async function loadInvoiceCount(){

try{

const snapshot =
await getDocs(
collection(db,"invoice")
);

if(totalInvoice){

totalInvoice.innerText =
snapshot.size;

}

}

catch(error){

console.error(
"Invoice Count Error:",
error
);

}

}




//==================================================
// LOAD CHALLAN COUNT
//==================================================

async function loadChallanCount(){

try{

const snapshot =
await getDocs(
collection(db,"challan")
);

if(totalChallan){

totalChallan.innerText =
snapshot.size;

}

}

catch(error){

console.error(
"Challan Count Error:",
error
);

}

}




//==================================================
// LOAD STOCK SUMMARY
//==================================================

async function loadStockSummary(){

try{

const snapshot =
await getDocs(
collection(db,"stock")
);

let stockTotal = 0;

let low = 0;

snapshot.forEach((item)=>{

const data =
item.data();

const qty =
Number(data.quantity)||0;

if(data.type==="IN"){

stockTotal += qty;

}else{

stockTotal -= qty;

}

if(qty<=5){

low++;

}

});

if(totalStock){

totalStock.innerText =
stockTotal;

}

if(lowStock){

lowStock.innerText =
low;

}

}

catch(error){

console.error(
"Stock Summary Error:",
error
);

}

}




//==================================================
// LOAD ISSUE + SALES SUMMARY
//==================================================

async function loadIssueSales(){

try{

const snapshot =
await getDocs(
collection(db,"issue")
);

let issue = 0;

let sales = 0;

snapshot.forEach((item)=>{

const data =
item.data();

issue++;

sales +=
Number(data.amount)||0;

});

if(totalIssue){

totalIssue.innerText =
issue;

}

if(totalSales){

totalSales.innerText =
"৳ " + sales.toFixed(2);

}

}

catch(error){

console.error(
"Issue/Sales Error:",
error
);

}

}




//==================================================
// LOAD ALL SUMMARY
//==================================================

async function loadDashboardSummary(){

await loadInvoiceCount();

await loadChallanCount();

await loadStockSummary();

await loadIssueSales();

}




//==================================================
// RUN SUMMARY
//==================================================

loadDashboardSummary();




//==================================================
// READY
//==================================================

console.log(
"Dashboard Summary Ready"
);


//==================================================
// END PART-15
//==================================================

//==================================================
// END OF dashboard.js
//==================================================
