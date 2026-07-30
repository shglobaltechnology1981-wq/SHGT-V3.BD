/* =====================================
   SH GLOBAL TECHNOLOGY
   FINAL JAVASCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    let currentSlide = 0;

    const slides = document.querySelectorAll(".slide");

    function showSlides() {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[currentSlide].classList.add("active");

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

    }

    if (slides.length > 0) {

        showSlides();

        setInterval(showSlides, 3000);

    }

});


/* =====================================
   MOBILE MENU READY
===================================== */

console.log("✅ SH Global Technology Website Loaded");
