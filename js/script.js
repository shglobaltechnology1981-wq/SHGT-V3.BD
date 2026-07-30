/* =====================================
   SH GLOBAL TECHNOLOGY
   FINAL JAVASCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slide");

    let currentSlide = 0;

    if (slides.length === 0) return;

    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");

    }

    showSlide(currentSlide);

    setInterval(() => {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }, 3000);

});

console.log("SHGT Slider Loaded");
/* =====================================
   MOBILE MENU READY
===================================== */

console.log("✅ SH Global Technology Website Loaded");
