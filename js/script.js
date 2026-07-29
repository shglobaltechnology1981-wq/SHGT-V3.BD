//==================================================
// SH GLOBAL TECHNOLOGY
// PREMIUM SCRIPT PART-1
//==================================================

document.addEventListener("DOMContentLoaded", () => {

    //==============================================
    // Loader
    //==============================================

    const loader = document.querySelector(".loader");

    if (loader) {

        window.addEventListener("load", () => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 500);

        });

    }

    //==============================================
    // Mobile Menu
    //==============================================

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            nav.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (nav.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");

            } else {

                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");

            }

        });

    }

    //==============================================
    // Smooth Scroll
    //==============================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    //==============================================
    // Active Menu
    //==============================================

    const currentPage = location.pathname.split("/").pop();

    document.querySelectorAll("nav a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage || (currentPage === "" && href === "index.html")) {

            link.classList.add("active");

        }

    });

});

//==================================================
// Sticky Header
//==================================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

});

//==================================================
// Scroll To Top
//==================================================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 500) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

//==================================================
// Hero Image Animation
//==================================================

const heroImage = document.querySelector(".hero-image img");

if (heroImage) {

    window.addEventListener("mousemove", (e) => {

        const x = (window.innerWidth / 2 - e.clientX) / 60;
        const y = (window.innerHeight / 2 - e.clientY) / 60;

        heroImage.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}

//==================================================
// Console Message
//==================================================

console.log(
"%cSH GLOBAL TECHNOLOGY Premium Website",
"color:#ffffff;background:#003366;padding:8px 15px;font-size:16px;font-weight:bold;border-radius:5px;"
);

console.log("Website Ready...");
//==================================================
// SH GLOBAL TECHNOLOGY
// PREMIUM SCRIPT PART-2
//==================================================

//==============================================
// Product Search
//==============================================

const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

//==============================================
// Brand Filter
//==============================================

const brandFilter = document.getElementById("brandFilter");

if (brandFilter) {

    brandFilter.addEventListener("change", function () {

        const selected = this.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const brand = (card.dataset.brand || "").toLowerCase();

            if (selected === "all" || brand === selected) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

//==============================================
// Fade In Animation
//==============================================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll(
".feature-box,.product-card,.brand-grid span,.facebook-card,.contact-box"
).forEach(item => {

    item.classList.add("hidden");

    observer.observe(item);

});

//==============================================
// Counter Animation
//==============================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = parseInt(counter.dataset.target);

        let current = 0;

        const speed = Math.max(1, Math.floor(target / 100));

        const update = () => {

            current += speed;

            if (current >= target) {

                counter.innerText = target;

            } else {

                counter.innerText = current;

                requestAnimationFrame(update);

            }

        };

        update();

        counterObserver.unobserve(counter);

    });

});

counters.forEach(counter => counterObserver.observe(counter));

//==============================================
// Floating WhatsApp Pulse
//==============================================

const whatsapp = document.querySelector(".whatsapp-float");

if (whatsapp) {

    setInterval(() => {

        whatsapp.classList.toggle("pulse");

    }, 1000);

}

//==============================================
// Facebook Button Hover
//==============================================

document.querySelectorAll(".btn-facebook").forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform = "translateY(-5px)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "translateY(0px)";

    });

});

//==============================================
// Lazy Image Loading
//==============================================

const lazyImages = document.querySelectorAll("img[data-src]");

if ("IntersectionObserver" in window) {

    const imageObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const img = entry.target;

            img.src = img.dataset.src;

            img.removeAttribute("data-src");

            observer.unobserve(img);

        });

    });

    lazyImages.forEach(img => imageObserver.observe(img));

}

//==============================================
// Current Year Auto Update
//==============================================

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}

//==================================================
// End Of Premium Script Part-2
//==================================================
