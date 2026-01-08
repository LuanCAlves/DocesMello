/* ============= Animação do Menu Toggle =============== */
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

/* ============= Animação do Carrossel de Banner =============== */
let count = 1;

//Seleciona o primeiro input do tipo radio para garantir que o ciclo comece certo
document.getElementById("item-1").checked = true;

// define o intervalo de 5 segundos (5000ms)
setInterval(function() {
    nextImage();
}, 5000);

// Função que vai trocar as imagens
function nextImage(){
    count++
    // Se passar de 3 (número de banners), volta para o 1
    if (count > 3){
        count = 1;
    }
    
    // Marca o radio correspondente para mover o carrossel no CSS
    document.getElementById("item-" + count).checked = true;
}

// Se o usuário clicar manualmente, atualizamos o contador
document.querySelectorAll('input[name="slider"]').forEach((radio, index) => {
    radio.addEventListener('change', () => {
        count = index + 1;
    });
});

// Animação das setas na seção MAIS VENDIDOS
const grid = document.getElementById('productsGrid');
const btnLeft = document.querySelector('.nav-arrow.left');
const btnRight = document.querySelector('.nav-arrow.right');

btnRight.addEventListener('click', () => {
    if(screen >= 500)grid.scrollLeft += 283; else grid.scrollLeft += 243; // Valor aproximado da largura do card + gap
});

btnLeft.addEventListener('click', () => {
    if(screen >= 500)grid.scrollLeft -= 283; else grid.scrollLeft -= 243;
});