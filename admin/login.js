import { auth } from "../js/firebase.js";

import {

signInWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const form=document.getElementById("loginForm");

const message=document.getElementById("message");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

try{

await signInWithEmailAndPassword(

auth,

email,

password

);

message.innerHTML="Login Successful";

location.href="dashboard.html";

}

catch(error){

message.innerHTML=error.message;

}

});
