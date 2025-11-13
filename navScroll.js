let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScroll && currentScroll > 100) {
        // scrolling down
        header.style.transform = "translateY(-100%)";
        header.style.transition = "transform 0.3s ease";
    } else {
        // scrolling up
        header.style.transform = "translateY(0)";
        header.style.transition = "transform 0.3s ease";
    }

    lastScroll = currentScroll;
});

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", () => {
    menu.classList.toggle("open");
});


