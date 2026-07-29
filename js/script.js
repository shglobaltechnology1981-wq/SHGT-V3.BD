/* =====================================
   SH GLOBAL TECHNOLOGY
   FINAL JAVASCRIPT
===================================== */


let currentSlide = 0;

const slides = document.querySelectorAll(".slide");

function showSlides() {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");
}

if (slides.length > 0) {
    setInterval(showSlides, 3000);
}


/* =====================================
   MOBILE MENU READY
===================================== */


console.log("SH Global Technology Website Loaded");
