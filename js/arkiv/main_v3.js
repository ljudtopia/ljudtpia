/**
 * main.js FINAL para LJUDTOPIA
 * Reemplaza TODO el contenido de tu main.js con este código
 */

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
        
        // Auto-map to equivalent page in other languages based on filename
        const currentFile = window.location.pathname.split('/').pop();
        const match = currentFile.match(/^(.*?)(esp|sve|eng|deu)(\..+)?$/i);
        if (match) {
            const base = match[1];
            const ext = match[3] || '.html';
            menu.querySelectorAll('a').forEach(a => {
                const langCode = a.getAttribute('data-lang');
                let suffix = '';
                if (langCode === 'es') suffix = 'esp';
                if (langCode === 'sv') suffix = 'sve';
                if (langCode === 'en') suffix = 'eng';
                if (langCode === 'de') suffix = 'deu';
                a.href = base + suffix + ext;
            });
        }
} catch(_) {}
    })();

    
    // === AUTO-MAP LANGUAGE LINKS BY FILENAME (esp/sve/eng/deu) ===
    (function() {
        const langToSuffix = { es: 'esp', sv: 'sve', en: 'eng', de: 'deu' };
        const suffixToLang = { esp: 'es', sve: 'sv', eng: 'en', deu: 'de' };

        function computeHref(targetLang) {
            const targetSuffix = langToSuffix[targetLang] || 'esp';
            const path = window.location.pathname;
            const dir = path.substring(0, path.lastIndexOf('/') + 1);
            const file = path.substring(path.lastIndexOf('/') + 1);
            // Try to swap suffix if it exists
            const m = file.match(/^(.*?)(esp|sve|eng|deu)\.html$/i);
            if (m) {
                const base = m[1];
                return dir + base + targetSuffix + '.html';
            }
            // Fallback to home + suffix
            return dir + 'home' + targetSuffix + '.html';
        }

        function setMenuLinks(container) {
            const links = container.querySelectorAll('.lang-menu a[data-lang]');
            links.forEach(a => {
                const lang = a.getAttribute('data-lang');
                a.setAttribute('href', computeHref(lang));
            });
        }

        // Also update desktop flag links if they exist without correct mapping
        function setDesktopLinks() {
            const desktop = document.querySelector('.language-selector, .lang-desktop');
            if (!desktop) return;
            const anchors = desktop.querySelectorAll('a[data-lang]');
            anchors.forEach(a => {
                const lang = a.getAttribute('data-lang');
                if (lang) a.setAttribute('href', computeHref(lang));
            });
        }

        // Initialize when DOM ready
        document.addEventListener('DOMContentLoaded', () => {
            const mobile = document.querySelector('.lang-mobile');
            if (mobile) setMenuLinks(mobile);
            setDesktopLinks();
        });
    })();

    console.log('🏁 LJUDTOPIA JavaScript completado');
});