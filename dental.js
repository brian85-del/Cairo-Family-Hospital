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

    // ========== SCROLL TOP BUTTON ==========
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

    // ========== FORM SUBMIT HANDLER ==========
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function () {
            // Get form values
            const fullName = document.getElementById('fullName')?.value || '';
            const phoneNumber = document.getElementById('phoneNumber')?.value || '';
            const emailAddress = document.getElementById('emailAddress')?.value || '';
            const dentalService = document.getElementById('dentalService')?.value || '';
            const message = document.getElementById('message')?.value || '';

            // Simple validation
            if (!fullName || !phoneNumber || !emailAddress) {
                alert('Please fill in all required fields (Full Name, Phone Number, and Email Address).');
                return;
            }

            // Show success message
            const btn = submitBtn;
            const originalText = btn.textContent;
            btn.textContent = 'Message Sent! ✓';
            btn.style.background = 'var(--purple-dark)';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                // Clear form
                document.getElementById('fullName').value = '';
                document.getElementById('phoneNumber').value = '';
                document.getElementById('emailAddress').value = '';
                document.getElementById('dentalService').value = '';
                document.getElementById('message').value = '';
            }, 3000);
        });
    }

    // ========== INSURANCE CAROUSEL INITIALIZATION ==========
    if (document.querySelector('.insurance-carousel')) {
        new Swiper('.insurance-carousel', {
            loop: true,
            speed: 600,
            autoplay: { delay: 2500, disableOnInteraction: false },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                320: { slidesPerView: 2, spaceBetween: 15 },
                576: { slidesPerView: 3, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 25 },
                1024: { slidesPerView: 5, spaceBetween: 30 }
            }
        });
    }
})();