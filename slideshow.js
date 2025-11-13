let slideIndex = 0;
const slides = document.querySelectorAll(".mySlides");
const slider = document.querySelector(".slideshow-container");
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
slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
}, { passive: true });

slider.addEventListener("touchmove", (e) => {
    e.stopPropagation(); // prevent page scrolling horizontally
}, { passive: false });

slider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
    }
});

// 🖱 Desktop drag support (optional)
let isDragging = false;
let dragStartX = 0;

slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragStartX = e.pageX;
    slider.classList.add("grabbing");
});

slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const diff = dragStartX - e.pageX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
        dragStartX = e.pageX; // reset after moving
    }
});

slider.addEventListener("mouseup", () => {
    isDragging = false;
    slider.classList.remove("grabbing");
});

slider.addEventListener("mouseleave", () => {
    isDragging = false;
    slider.classList.remove("grabbing");
});

// ⏱ Initialize
updateSlides();
autoSlideTimer = setInterval(nextSlide, 4500);
