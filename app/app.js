const btn = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".nav__mobile");
const body = document.querySelector("body");
btn.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
    body.classList.toggle("no-scroll");
});

console.log("erfg");
