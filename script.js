// ==========================================
// LÓGICA PRINCIPAL - TIENDA DE VIDEOJUEGOS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Efecto Scroll Navbar --- */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- 2. Menú Hamburguesa para Móviles --- */
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        // Cambiar icono
        const icon = menuToggle.querySelector('i');
        if (nav.classList.contains('nav-active')) {
            icon.classList.replace('bx-menu', 'bx-x');
        } else {
            icon.classList.replace('bx-x', 'bx-menu');
        }
    });

    // Cerrar menú al hacer click en un enlace (Móviles)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                menuToggle.querySelector('i').classList.replace('bx-x', 'bx-menu');
            }
        });
    });

    /* --- 3. Lógica del Carrito Simulada --- */
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartCounter = document.getElementById('cart-counter');
    const toastContainer = document.getElementById('toast-container');
    let cartItemsCount = 0;

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Animación del botón rápida
            const originalText = btn.innerHTML;
            btn.innerHTML = "<i class='bx bx-check'></i> Añadido";
            btn.style.backgroundColor = 'var(--primary-color)';
            btn.style.color = 'white';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = 'transparent';
                btn.style.color = 'var(--primary-light)';
            }, 1500);

            // Actualizar Contador
            cartItemsCount++;
            cartCounter.innerText = cartItemsCount;
            
            // Animación en el contador
            cartCounter.style.transform = 'scale(1.5)';
            setTimeout(() => cartCounter.style.transform = 'scale(1)', 200);

            // Mostrar Mensaje Dinámico (Toast)
            const gameName = e.target.closest('.add-to-cart-btn').getAttribute('data-name');
            showToast(`${gameName} añadido al carrito`);
        });
    });

    function showToast(message) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerHTML = `<i class='bx bx-cart-alt'></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        // Remover toast después de la animación (3s total)
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    /* --- 4. Filtro de Categorías --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            // Añadir al seleccionado
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            gameCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                    // Re-trigger animation
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    /* --- 5. Buscador en Tiempo Real --- */
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('keyup', (e) => {
        const searchText = e.target.value.toLowerCase();
        
        // Simular que hace click en "Todos" para reiniciar filtros antes de buscar
        document.querySelector('.filter-btn[data-filter="all"]').click();

        gameCards.forEach(card => {
            const title = card.querySelector('.game-title').innerText.toLowerCase();
            if (title.includes(searchText)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

    /* --- 6. Animaciones al hacer Scroll (Intersection Observer) --- */
    const scrollElements = document.querySelectorAll('.fade-in, .slide-up');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('appear');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.1)) {
                displayScrollElement(el);
            }
        });
    };

    // Inicializar y detectar scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Disparar una vez al cargar
    handleScrollAnimation();

});
