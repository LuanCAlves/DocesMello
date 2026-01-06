const menuBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

const toggleMenu = () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('nav-active');
    body.classList.toggle('no-scroll');
}

menuBtn.addEventListener('click', toggleMenu);


navLinks.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') toggleMenu();
});