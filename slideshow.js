let slideIndex = 0;
const slides = document.querySelectorAll(".mySlides");
let autoSlideTimer;

// 🔄 Update slide positions
function updateSlides() {
    slides.forEach((slide, i) => {
        slide.classList.remove("active", "left", "right", "far");

        if (i === slideIndex) {
            slide.classList.add("active");
        } else if (i === (slideIndex - 1 + slides.length) % slides.length) {
            slide.classList.add("left");
        } else if (i === (slideIndex + 1) % slides.length) {
            slide.classList.add("right");
        } else {
            slide.classList.add("far");
        }
    });
}

// ▶️ Next slide
function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    updateSlides();
    resetAutoSlide();
}

// ◀️ Previous slide
function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    updateSlides();
    resetAutoSlide();
}

// 🔁 Reset auto timer
function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(nextSlide, 4500);
}

// 👆 Click / Tap listeners
slides.forEach((slide) => {
    slide.addEventListener("click", (e) => {
        if (slide.classList.contains("left")) {
            prevSlide();
        } else if (slide.classList.contains("right")) {
            nextSlide();
        }
    });
});

// 👆 Swipe controls (mobile)
let startX = 0;
document.querySelector(".slideshow-container").addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector(".slideshow-container").addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
    }
});

// ⏱ Initialize
updateSlides();
autoSlideTimer = setInterval(nextSlide, 4500);
