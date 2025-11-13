document.addEventListener("DOMContentLoaded", () => {
    // ---------- Scroll Reveal Animations ----------
    const reveals = document.querySelectorAll(".reveal, [data-motion]:not(.footer-bottom)");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        reveals.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const offset = parseInt(el.dataset.offset) || 100;
            const delay = parseInt(el.dataset.delay) || 0;

            if (rect.top < windowHeight - offset && rect.bottom > 0) {
                if (!el.classList.contains("active")) {
                    setTimeout(() => el.classList.add("active"), delay);
                }
            } else {
                el.classList.remove("active");
            }
        });
    }

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("resize", revealOnScroll);
    setTimeout(revealOnScroll, 50);

    const footer = document.querySelector(".footer-bottom.motion-fade");
    if (footer) {
        const delay = parseInt(footer.dataset.delay) || 0;
        setTimeout(() => footer.classList.add("active"), delay);
    }

    // ---------- Header Scroll Hide ----------
    let lastScroll = 0;
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScroll && currentScroll > 100) {
            // scrolling down
            header.style.transform = "translateY(-100%)";
        } else {
            // scrolling up
            header.style.transform = "translateY(0)";
        }

        lastScroll = currentScroll;
    });

});
