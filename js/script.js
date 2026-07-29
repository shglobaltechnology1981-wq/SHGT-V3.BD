/* =====================================
   SH GLOBAL TECHNOLOGY
   FINAL JAVASCRIPT
===================================== */


/* HOME SLIDER */

let slideIndex = 0;


function autoSlider(){

    let slides = document.querySelectorAll(".slide");


    if(slides.length === 0){
        return;
    }


    slides.forEach(function(slide){

        slide.classList.remove("active");

    });


    slideIndex++;


    if(slideIndex > slides.length){

        slideIndex = 1;

    }


    slides[slideIndex - 1].classList.add("active");


}



setInterval(autoSlider,3000);



/* =====================================
   MOBILE MENU READY
===================================== */


console.log("SH Global Technology Website Loaded");
