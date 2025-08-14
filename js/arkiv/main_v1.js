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
    
    console.log('🏁 LJUDTOPIA JavaScript completado');
});