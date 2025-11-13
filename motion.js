// motion.js
document.addEventListener("DOMContentLoaded", () => {
    // Exclude footer-bottom from permanent toggle
    const reveals = document.querySelectorAll(".reveal, [data-motion]:not(.footer-bottom)");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        reveals.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const top = rect.top;
            const bottom = rect.bottom;
            const offset = parseInt(el.dataset.offset) || 100;
            const delay = parseInt(el.dataset.delay) || 0;

            // Animate when element enters viewport
            if (top < windowHeight - offset && bottom > 0) {
                if (!el.classList.contains("active")) {
                    setTimeout(() => el.classList.add("active"), delay);
                }
            } else {
                // Remove class when leaving viewport
                el.classList.remove("active");
            }
        });
    }

    // Trigger on load
    revealOnScroll();

    // Scroll & resize listeners
    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("resize", revealOnScroll);

    // Extra trigger after small delay
    setTimeout(revealOnScroll, 50);

    // Animate footer separately once
    const footer = document.querySelector(".footer-bottom.motion-fade");
    if (footer) {
        const delay = parseInt(footer.dataset.delay) || 0;
        setTimeout(() => footer.classList.add("active"), delay);
    }
});