/* ============= Proteção de Carregamento =============== */
document.addEventListener('DOMContentLoaded', () => {

    /* ============= Animação do Menu Toggle =============== */
    const menuBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuBtn && navLinks) {
        const toggleMenu = () => {
            menuBtn.classList.toggle('open');
            navLinks.classList.toggle('nav-active');
            body.classList.toggle('no-scroll');
        }

        menuBtn.addEventListener('click', toggleMenu);

        navLinks.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') toggleMenu();
        });
    }

    /* ============= Animação do Carrossel de Banner =============== */
    let count = 1;
    const firstItem = document.getElementById("item-1");
    
    if (firstItem) {
        firstItem.checked = true;

        setInterval(function() {
            nextImage();
        }, 5000);

        function nextImage(){
            count++;
            if (count > 3) count = 1;
            const nextRadio = document.getElementById("item-" + count);
            if (nextRadio) nextRadio.checked = true;
        }

        document.querySelectorAll('input[name="slider"]').forEach((radio, index) => {
            radio.addEventListener('change', () => {
                count = index + 1;
            });
        });
    }

    /* ============= Navegação das Vitrines (Setas) =============== */
    // Selecionamos todas as vitrines para as setas funcionarem em todas as seções
    const wrappers = document.querySelectorAll('.products-container-wrapper');

    wrappers.forEach(wrapper => {
        const grid = wrapper.querySelector('.products-grid');
        const btnLeft = wrapper.querySelector('.nav-arrow.left');
        const btnRight = wrapper.querySelector('.nav-arrow.right');

        if (grid && btnLeft && btnRight) {
            btnRight.addEventListener('click', () => {
                const scrollAmount = window.innerWidth >= 500 ? 283 : 243;
                grid.scrollLeft += scrollAmount;
            });

            btnLeft.addEventListener('click', () => {
                const scrollAmount = window.innerWidth >= 500 ? 283 : 243;
                grid.scrollLeft -= scrollAmount;
            });
        }
    });

    /* =============== Lógica do Carrinho & Modal ============== */
    const openCartBtn = document.getElementById('openCart');
    const closeCartBtn = document.getElementById('closeCart');
    const cartModal = document.getElementById('cartModal');
    const sendWhatsAppBtn = document.getElementById('sendWhatsApp');

    if (openCartBtn && cartModal) {
        openCartBtn.onclick = () => {
            cartModal.style.display = 'flex';
            document.body.classList.add('no-scroll');
        };
    }

    if (closeCartBtn) {
        closeCartBtn.onclick = () => {
            cartModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        };
    }

    // Fechar ao clicar fora do modal
    window.onclick = (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    };

    if (sendWhatsAppBtn) {
        sendWhatsAppBtn.addEventListener('click', sendToWhatsApp);
    }
});

/* =============== Funções Globais (Fora do DOMContentLoaded) ============== */
let cart = [];
const phone = "5524999512684";

function addToCart(name, price) {
    cart.push({ name, price });

    const btn = document.querySelector('.cart-floating-btn');
    if (btn) {
        btn.style.transform = "scale(1.2)";
        setTimeout(() => btn.style.transform = "scale(1)", 200);
    }

    updateCartUI();
}

function updateCartUI() {
    const countBadge = document.querySelector('.cart-count');
    if (countBadge) {
        countBadge.innerText = cart.length;
        countBadge.style.display = cart.length > 0 ? "block" : "none";
    }

    const itemsContainer = document.getElementById('cartItems');
    if (itemsContainer) {
        if (cart.length === 0) {
            itemsContainer.innerHTML = "<p>Seu carrinho está vazio...</p>";
        } else {
            itemsContainer.innerHTML = cart.map((item) => `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid rgba(0,0,0,0.05); padding-bottom:5px;">
                    <span style="font-size: 0.9rem;">${item.name}</span>
                    <strong>R$ ${item.price.toFixed(2)}</strong>
                </div>
            `).join('');
        }
    }
    
    const totalDisplay = document.getElementById('cartTotalValue');
    if (totalDisplay) {
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        totalDisplay.innerText = `R$ ${total.toFixed(2)}`;
    }
}

function sendToWhatsApp() {
    if (cart.length === 0) return;

    let message = "*Novo Pedido - Doces Mello* 🍬\n\n";
    cart.forEach(item => {
        message += `✅ ${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });
    
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    message += `\n*Total do Pedido: R$ ${total.toFixed(2)}*\n\n_Pedido realizado via site._`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}