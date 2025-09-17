/* main.js FINAL para LJUDTOPIA */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 LJUDTOPIA JavaScript iniciado');
    
    // === VARIABLES ===
    let menuToggle = null;
    let mainNav = null;
    let attempts = 0;
    const maxAttempts = 20;
    
    // === BUSCAR ELEMENTOS ===
    function findElements() {
        attempts++;
        console.log(`🔍 Buscando elementos (intento ${attempts})...`);
        
        menuToggle = document.querySelector('.menu-toggle');
        mainNav = document.querySelector('.main-nav');
        
        console.log('Menu toggle:', menuToggle);
        console.log('Main nav:', mainNav);
        
        if (menuToggle && mainNav) {
            console.log('✅ Elementos encontrados - inicializando menú móvil');
            initMobileMenu();
            return true;
        } else {
            if (attempts < maxAttempts) {
                setTimeout(findElements, 200);
            } else {
                console.error('❌ No se encontraron elementos .menu-toggle y .main-nav');
                console.error('💡 Verifica que el HTML tenga la estructura correcta');
            }
            return false;
        }
    }
    
    // === APARTADO EMERGENTE AVISO LEGAL ===
    function openModal() {
        document.getElementById("modalOverlay").style.display = "block";
    }

    function closeModal() {
        document.getElementById("modalOverlay").style.display = "none";
    }

    // Hacer accesibles desde el HTML (onclick)
    window.openModal = openModal;
    window.closeModal = closeModal;

    // Cerrar al hacer clic fuera del recuadro
    window.addEventListener('click', function(event) {
        const overlay = document.getElementById('modalOverlay');
        if (event.target === overlay) closeModal();
    });

    // Cerrar con tecla Escape
        window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') closeModal();
    });

    // === APARTADO EMERGENTE POLITICA DE PRIVACIDAD - Reutilizamos la misma variable de foco que ya usas
    let _lastFocused = null;

    function anyModalOpen() {
        return Array.from(document.querySelectorAll('.modal-overlay'))
        .some(ov => ov.style.display === 'block');
    }

    /* === NUEVO: abrir/cerrar Política de Privacidad === */
    function openPrivacyModal() {
        const overlay = document.getElementById('modalOverlayPrivacy');
        if (!overlay) return;

    // mostrar y bloquear scroll de fondo
    overlay.style.display = 'block';
        document.body.classList.add('no-scroll');

    // gestionar foco accesible
    _lastFocused = document.activeElement;
        const closeBtn = overlay.querySelector('.modal-topbar .close-btn');
        if (closeBtn) closeBtn.focus();
    }

    function closePrivacyModal() {
        const overlay = document.getElementById('modalOverlayPrivacy');
        if (!overlay) return;

    overlay.style.display = 'none';

    // si no queda ningún modal abierto, reactivar scroll de fondo
        if (!anyModalOpen()) {
        document.body.classList.remove('no-scroll');
        }

    // devolver foco al disparador
        if (_lastFocused && typeof _lastFocused.focus === 'function') {
            _lastFocused.focus();
        }
    }

    /* Hacer accesibles desde el HTML */
    window.openPrivacyModal = openPrivacyModal;
    window.closePrivacyModal = closePrivacyModal;

    /* === ACTUALIZA los cierres globales para que sirvan para ambos modales === */
    // Cierre al hacer clic fuera del recuadro
    window.addEventListener('click', function (event) {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        if (event.target === overlay) {
        // Cierra el modal que recibió el clic
        overlay.style.display = 'none';

        // Si ya no queda ninguno abierto, restaurar el scroll y el foco
        if (!anyModalOpen()) {
            document.body.classList.remove('no-scroll');
            if (_lastFocused && typeof _lastFocused.focus === 'function') {
                _lastFocused.focus();
            }
        }
    }
    });
    });

    // Cierre con tecla Escape: cierra el último relevante (prioriza privacidad si está abierta)
    window.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;

            const privacyOpen = document.getElementById('modalOverlayPrivacy')?.style.display === 'block';
            const legalOpen   = document.getElementById('modalOverlay')?.style.display === 'block';

        if (privacyOpen) {
    closePrivacyModal();
    } else if (legalOpen) {
        // usa tu closeModal() existente
        if (typeof closeModal === 'function') closeModal();
    }
    });

    
// ========== CARRUSEL ==========
function initCarousel() {
    function initCarousel() {
        const carouselContainer = document.querySelector('.carousel-container');
        if (!carouselContainer) return; // Si no hay carrusel, salir
        
        const images = [
            'project-001.jpg',
            'project-002.jpg',
            'project-003.jpg',
            'project-004.jpg',
            'project-005.jpg',
            'project-006.jpg',
            'project-007.jpg',
            'project-008.jpg',
            'project-009.jpg',
            'project-010.jpg',
            'project-011.jpg',
            'project-012.jpg',
            'project-013.jpg',
            'project-014.jpg',
            'project-015.jpg',
            'project-016.jpg',
            'project-017.jpg',
            'project-018.jpg',
            'project-019.jpg',
            'project-020.jpg',
            'project-021.jpg',
            'project-022.jpg'
        ];
        
        const imgPath = 'img-projects/';
        
        // Limpiar contenedor existente (por si acaso)
        carouselContainer.innerHTML = '';
        
        // Crear elementos img
        images.forEach(img => {
            const imgElement = document.createElement('img');
            imgElement.src = imgPath + img;
            imgElement.alt = "Imagen de proyecto";
            carouselContainer.appendChild(imgElement);
        });
        
        // Configurar el carrusel
        let currentIndex = 0;
        const totalImages = images.length;
        
        function updateCarousel() {
            const offset = -currentIndex * 100;
            carouselContainer.style.transform = `translateX(${offset}%)`;
        }
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        }, 2000);
        
        updateCarousel();
    }
    
    // Inicializar carrusel
    initCarousel();
}
initCarousel();
// ========== FIN CARRUSEL ==========

    // === INICIALIZAR MENÚ MÓVIL ===
    function initMobileMenu() {
        console.log('🎉 Configurando menú móvil...');
        
        // 1. CLICK EN HAMBURGUESA
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = menuToggle.classList.contains('active');
            
            if (isActive) {
                // CERRAR
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
                console.log('📱 Menú cerrado');
            } else {
                // ABRIR
                menuToggle.classList.add('active');
                mainNav.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('📱 Menú abierto');
            }
        });
        
        // 2. CERRAR AL HACER CLICK FUERA
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active')) {
                if (!e.target.closest('.main-nav') && !e.target.closest('.menu-toggle')) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    document.body.style.overflow = '';
                    console.log('📱 Menú cerrado por click fuera');
                }
            }
        });
        
        // 3. CERRAR AL HACER CLICK EN ENLACES (SOLO MÓVIL)
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    document.body.style.overflow = '';
                    console.log('📱 Menú cerrado por click en enlace');
                }
            });
        });
        
        // 4. RESETEAR EN DESKTOP
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        console.log('✅ Menú móvil configurado correctamente');
        
        // AUTO-TEST SOLO EN DESARROLLO (comentar en producción)
        /*
        if (window.innerWidth <= 768) {
            setTimeout(function() {
                console.log('🤖 Auto-test: abriendo menú');
                menuToggle.click();
                setTimeout(function() {
                    console.log('🤖 Auto-test: cerrando menú');
                    menuToggle.click();
                }, 1000);
            }, 2000);
        }
        */
    }
    
    // === MARCAR PÁGINA ACTIVA ===
    function setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'homeesp.html';
        const navLinks = document.querySelectorAll('.main-nav a, .sidebar-nav a');
        
        navLinks.forEach(function(link) {
            const linkPage = link.getAttribute('href');
            const parentLi = link.closest('li');
            
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'homeesp.html')) {
                if (parentLi) {
                    parentLi.classList.add('active');
                }
                link.classList.add('active');
            }
        });
    }
    
    // === SCROLL SUAVE PARA ENLACES ANCHOR ===
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // === INICIALIZACIÓN ===
    findElements();
    setActivePage();
    initSmoothScroll();
    
    
    // === LANGUAGE DROPDOWN (MOBILE) ===
    (function() {
        const wrap = document.querySelector('.lang-mobile');
        if (!wrap) return;
        const btn = wrap.querySelector('.lang-toggle');
        const menu = wrap.querySelector('.lang-menu');
        const label = btn.querySelector('.lang-toggle-label');
        const currentFlag = btn.querySelector('.lang-current-flag');

        function openMenu() {
            menu.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
            const first = menu.querySelector('a');
            first && first.focus({preventScroll:true});
            document.addEventListener('click', onDocClick, true);
            document.addEventListener('keydown', onKeyDown, true);
        }
        function closeMenu() {
            menu.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            document.removeEventListener('click', onDocClick, true);
            document.removeEventListener('keydown', onKeyDown, true);
        }
        function onDocClick(e) {
            if (!wrap.contains(e.target)) closeMenu();
        }
        function onKeyDown(e) {
            if (e.key === 'Escape') { closeMenu(); btn.focus(); }
            if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && menu.classList.contains('open')) {
                e.preventDefault();
                const items = Array.from(menu.querySelectorAll('a'));
                const idx = items.indexOf(document.activeElement);
                let next = 0;
                if (e.key === 'ArrowDown') next = idx < items.length - 1 ? idx + 1 : 0;
                if (e.key === 'ArrowUp') next = idx > 0 ? idx - 1 : items.length - 1;
                items[next].focus();
            }
        }
        btn && btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = menu.classList.contains('open');
            isOpen ? closeMenu() : openMenu();
        });

        // Set current selection based on <html lang> or URL
        try {
            const htmlLang = (document.documentElement.lang || '').substring(0,2) || 'es';
            const current = menu.querySelector(`[data-lang="${htmlLang}"]`);
            if (current) {
                const img = current.querySelector('img');
                const text = current.querySelector('span');
                if (img) currentFlag.src = img.getAttribute('src');
                if (text) label.textContent = text.textContent;
                menu.querySelectorAll('[role="option"]').forEach(li => li.setAttribute('aria-selected','false'));
                current.closest('li').setAttribute('aria-selected','true');
            }
        } catch(_) {}
    })();

    console.log('🏁 LJUDTOPIA JavaScript completado');
});


// === Contact Modal (new) ===
(function(){
  function anyModalOpen() {
    return Array.from(document.querySelectorAll('.modal-overlay'))
      .some(ov => ov.style.display === 'block');
  }
  function openContactModal() {
    const overlay = document.getElementById('modalOverlayContact');
    if (!overlay) return;
    overlay.style.display = 'block';
    document.body.classList.add('no-scroll');
    window._lastFocused = document.activeElement;
    const closeBtn = overlay.querySelector('.modal-topbar .close-btn');
    if (closeBtn) closeBtn.focus();
  }
  function closeContactModal() {
    const overlay = document.getElementById('modalOverlayContact');
    if (!overlay) return;
    overlay.style.display = 'none';
    if (!anyModalOpen()) document.body.classList.remove('no-scroll');
    if (window._lastFocused && typeof window._lastFocused.focus === 'function') {
      window._lastFocused.focus();
    }
  }
  window.openContactModal = openContactModal;
  window.closeContactModal = closeContactModal;

  // Click outside to close
  window.addEventListener('click', function (event) {
    const overlay = document.getElementById('modalOverlayContact');
    if (event.target === overlay) closeContactModal();
  });
  // ESC to close (without breaking others)
  window.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    const contactOpen = document.getElementById('modalOverlayContact')?.style.display === 'block';
    if (contactOpen) closeContactModal();
  });
  // Open privacy from link inside form
  document.addEventListener('click', function(e){
    const a = e.target.closest('.open-privacy-from-contact');
    if (!a) return;
    e.preventDefault();
    closeContactModal();
    if (typeof window.openPrivacyModal === 'function') {
      setTimeout(window.openPrivacyModal, 60);
    }
  });
  // Simple submit handler
  window.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      alert('¡Gracias! Hemos recibido su solicitud y le contactaremos en breve.');
      closeContactModal();
      form.reset();
    });
  });
})();
