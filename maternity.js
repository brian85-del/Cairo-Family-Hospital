(function () {
    // ========== MOBILE NAVBAR FUNCTIONALITY ==========
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const dropdown = document.getElementById('servicesDropdown');

    function toggleMenu() {
        if (!navLinks) return;
        const expanded = navLinks.classList.contains('show');
        navLinks.classList.toggle('show');
        if (hamburger) hamburger.classList.toggle('active');
        if (hamburger) hamburger.setAttribute('aria-expanded', !expanded);
        if (!expanded && dropdown && dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (dropdown) {
        const toggleLink = dropdown.querySelector('.dropdown-toggle');
        if (toggleLink) {
            toggleLink.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                }
            });
        }
    }

    const allLinks = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
    allLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768 && navLinks && navLinks.classList.contains('show')) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('click', function (event) {
        if (window.innerWidth <= 768 && navLinks && navLinks.classList.contains('show')) {
            const isClickInside = navLinks.contains(event.target) || (hamburger && hamburger.contains(event.target));
            if (!isClickInside) {
                toggleMenu();
            }
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            if (navLinks && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                if (hamburger) hamburger.classList.remove('active');
            }
            if (dropdown && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }
        }
    });

    // ========== SCROLL TO TOP BUTTON ==========
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        });

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== REVEAL ANIMATIONS ON SCROLL ==========
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
})();