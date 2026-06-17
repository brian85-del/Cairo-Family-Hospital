// HERO SLIDER (Homepage only)
let cur = 0;
const slides = document.getElementById('heroSlides');
const dots = document.querySelectorAll('.hero-dot');
const total = 3;
let autoTimer;

if (slides) {
    autoTimer = setInterval(() => changeSlide(1), 5000);
}

function changeSlide(dir) {
    if (!slides) return;
    cur = (cur + dir + total) % total;
    updateSlider();
    resetTimer();
}

function goSlide(n) {
    if (!slides) return;
    cur = n;
    updateSlider();
    resetTimer();
}

function updateSlider() {
    if (!slides) return;
    slides.style.transform = `translateX(-${cur * 100}%)`;
    if (dots) {
        dots.forEach((d, i) => d.classList.toggle('active', i === cur));
    }
}

function resetTimer() {
    if (autoTimer) clearInterval(autoTimer);
    if (slides) {
        autoTimer = setInterval(() => changeSlide(1), 5000);
    }
}

// MOBILE NAVIGATION
function toggleNav() {
    const nav = document.getElementById('navLinks');
    if (nav) {
        nav.classList.toggle('open');
        const btn = document.querySelector('.hamburger');
        if (btn) {
            btn.setAttribute('aria-expanded', nav.classList.contains('open'));
        }
    }
}

// CHIP SELECT (Service Finder)
function selectChip(el) {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('sel'));
    el.classList.add('sel');
}

function confirmService() {
    const sel = document.querySelector('.chip.sel');
    if (sel) {
        window.location.href = 'services.html';
    }
}

// BACK TO TOP
window.addEventListener('scroll', () => {
    const backTop = document.getElementById('backTop');
    if (backTop) {
        backTop.classList.toggle('visible', window.scrollY > 400);
    }
});

// Close mobile nav when clicking a link (Homepage & all pages)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks')?.classList.remove('open');
        document.querySelectorAll('.nav-links .dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
});

// Fallback for hero background image if it fails to load (Homepage)
const heroBg = document.querySelector('.hero-background');
if (heroBg) {
    const bgImg = heroBg.style.backgroundImage;
    if (bgImg && bgImg !== 'none') {
        const url = bgImg.slice(5, -2).replace(/['"]/g, '');
        const img = new Image();
        img.onerror = () => {
            heroBg.style.backgroundColor = '#4a1d65';
            heroBg.style.backgroundImage = 'none';
            console.warn('Hero background image not found. Please check the path: ' + url);
        };
        img.src = url;
    }
}

// ── PHARMACY PAGE FUNCTIONS ──
// Product Data
const products = [
    { id: 1, name: 'Paracetamol 500mg', cat: 'otc', badge: 'OTC', badgeClass: '', img: 'assets/paracetamol.webp', desc: 'Fever & pain relief. Suitable for adults and children above 6 years.', price: 'KSh 50', oldPrice: null },
    { id: 2, name: 'Ibuprofen 400mg', cat: 'otc', badge: 'OTC', badgeClass: '', img: 'assets/ibuprofen.webp', desc: 'Anti-inflammatory for headaches, muscle aches & mild fever.', price: 'KSh 80', oldPrice: null },
    { id: 3, name: 'ORS Rehydration Sachets (10-pack)', cat: 'otc', badge: 'OTC', badgeClass: '', img: 'assets/ors.webp', desc: 'Electrolyte replacement for diarrhoea and dehydration. All ages.', price: 'KSh 120', oldPrice: 'KSh 150' },
    { id: 4, name: 'Chlorphenamine 4mg (Antihistamine)', cat: 'otc', badge: 'OTC', badgeClass: '', img: 'assets/chlorphenamine.webp', desc: 'Relieves allergy symptoms: runny nose, itching, sneezing.', price: 'KSh 60', oldPrice: null },
    { id: 5, name: 'Amoxicillin 500mg', cat: 'prescription', badge: 'Rx', badgeClass: 'rx', img: 'assets/omoxicilin.webp', desc: 'Broad-spectrum antibiotic. Requires valid prescription.', price: 'KSh 180', oldPrice: null },
    { id: 6, name: 'Metformin 500mg', cat: 'prescription', badge: 'Rx', badgeClass: 'rx', img: 'assets/metformin.webp', desc: 'First-line diabetes management medication. Rx only.', price: 'KSh 120', oldPrice: null },
    { id: 7, name: 'Amlodipine 5mg', cat: 'prescription', badge: 'Rx', badgeClass: 'rx', img: 'assets/amlodipine.webp', desc: 'Calcium channel blocker for hypertension control. Rx only.', price: 'KSh 90', oldPrice: null },
    { id: 8, name: 'Salbutamol Inhaler 100mcg', cat: 'prescription', badge: 'Rx', badgeClass: 'rx', img: 'assets/salbutamol.webp', desc: 'Reliever inhaler for asthma & bronchospasm. Prescription required.', price: 'KSh 350', oldPrice: null },
    { id: 9, name: 'Folic Acid 5mg', cat: 'maternal', badge: 'OTC', badgeClass: '', img: 'assets/folic acid.webp', desc: 'Essential supplement for pregnancy — reduces neural tube defects.', price: 'KSh 80', oldPrice: null },
    { id: 10, name: 'Iron + Folic Acid Tablets', cat: 'maternal', badge: 'OTC', badgeClass: '', img: 'assets/multivitamin.webp', desc: 'Combined supplement for anaemia prevention in pregnancy.', price: 'KSh 100', oldPrice: 'KSh 130' },
    { id: 11, name: 'Baby Gripe Water', cat: 'maternal', badge: 'OTC', badgeClass: '', img: 'assets/baby gripe water.webp', desc: 'Gentle relief for infant colic and digestive discomfort.', price: 'KSh 150', oldPrice: null },
    { id: 12, name: 'Calcium + Vitamin D3', cat: 'maternal', badge: 'OTC', badgeClass: '', img: 'assets/calcium.webp', desc: 'Bone health supplement for pregnant and breastfeeding mothers.', price: 'KSh 200', oldPrice: 'KSh 240' },
    { id: 13, name: 'Vitamin C 1000mg', cat: 'vitamins', badge: 'OTC', badgeClass: '', img: 'assets/vitamin c.webp', desc: 'Immune support and antioxidant. Effervescent tablet format.', price: 'KSh 130', oldPrice: null },
    { id: 14, name: 'Multivitamin Tablets (30-pack)', cat: 'vitamins', badge: 'OTC', badgeClass: '', img: 'assets/multivitamin.webp', desc: 'Daily nutritional support for adults. Includes A, B-complex, C, D, E, zinc.', price: 'KSh 350', oldPrice: 'KSh 400' },
    { id: 15, name: 'Omega-3 Fish Oil Capsules', cat: 'vitamins', badge: 'OTC', badgeClass: 'sale', img: 'assets/omega 3.webp', desc: 'Heart and brain health support. 1000mg softgel capsules.', price: 'KSh 500', oldPrice: 'KSh 650' },
    { id: 16, name: 'Fluoride Toothpaste (Med Grade)', cat: 'dental', badge: 'OTC', badgeClass: '', img: 'assets/toothpaste.webp', desc: 'Medical-grade fluoride toothpaste for cavity prevention.', price: 'KSh 180', oldPrice: null },
    { id: 17, name: 'Aspirin 75mg (Cardio)', cat: 'chronic', badge: 'OTC', badgeClass: '', img: 'assets/aspirin.webp', desc: 'Low-dose aspirin for cardiovascular risk management.', price: 'KSh 60', oldPrice: null },
    { id: 18, name: 'First Aid Dressing Kit', cat: 'firstaid', badge: 'OTC', badgeClass: '', img: 'assets/first aid.webp', desc: 'Includes bandages, antiseptic wipes, plasters & cotton wool.', price: 'KSh 300', oldPrice: 'KSh 350' },
];

let currentCat = 'all';
let currentSearch = '';
let currentSort = 'default';

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const productCountSpan = document.getElementById('productCount');
    if (!productsGrid) return;

    let filtered = products.filter(p => {
        const matchCat = currentCat === 'all' || p.cat === currentCat;
        const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase()) || p.desc.toLowerCase().includes(currentSearch.toLowerCase());
        return matchCat && matchSearch;
    });

    if (currentSort === 'az') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (currentSort === 'za') filtered.sort((a, b) => b.name.localeCompare(a.name));

    if (productCountSpan) {
        productCountSpan.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
    }

    if (filtered.length === 0) {
        productsGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px 20px;color:var(--text-muted);">
      <p style="font-size:16px;font-weight:600;">No products found.</p>
      <p style="font-size:14px;margin-top:6px;">Try a different search term or category, or message us on WhatsApp.</p>
    </div>`;
        return;
    }

    productsGrid.innerHTML = filtered.map(p => `
    <div class="prod-card">
      <div class="prod-img">
        ${p.badge ? `<span class="prod-badge ${p.badgeClass}">${p.badge}</span>` : ''}
        ${p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy">` : '<i class="fas fa-capsules" style="font-size:56px;"></i>'}
      </div>
      <div class="prod-body">
        <div class="prod-cat">${getCatLabel(p.cat)}</div>
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <div class="prod-footer">
          <div class="prod-price">
            ${p.oldPrice ? `<s>${p.oldPrice}</s>` : ''}
            ${p.price}
          </div>
          <button class="btn-order" onclick="orderProduct('${p.name}')">
            ${p.badgeClass === 'rx' ? 'Rx Order' : 'Order'}
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function getCatLabel(cat) {
    const map = { otc: 'OTC Medicine', prescription: 'Prescription', maternal: 'Maternal & Baby', vitamins: 'Vitamins', dental: 'Dental', chronic: 'Chronic Disease', firstaid: 'First Aid' };
    return map[cat] || cat;
}

function setCategory(el, cat) {
    document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    currentCat = cat;
    renderProducts();
}

function filterProducts() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        currentSearch = searchInput.value;
    }
    renderProducts();
}

function sortProducts(val) {
    currentSort = val;
    renderProducts();
}

function orderProduct(name) {
    const msg = `Hello Cairo Family Hospital, I would like to order: *${name}*. Please advise on availability and price.`;
    window.open(`https://wa.me/254758833863?text=${encodeURIComponent(msg)}`, '_blank');
}

// FAQ TOGGLE
function toggleFaq(el) {
    const item = el.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

// PRESCRIPTION UPLOAD
function handleRxUpload(input) {
    const file = input.files[0];
    if (file) {
        const rxFileName = document.getElementById('rxFileName');
        if (rxFileName) {
            rxFileName.textContent = `✅ Selected: ${file.name}`;
            rxFileName.style.display = 'block';
        }
        setTimeout(() => {
            const msg = `Hello Cairo Family Hospital, I have a prescription to upload for dispensing. File: ${file.name}. Please advise on next steps.`;
            window.open(`https://wa.me/254758833863?text=${encodeURIComponent(msg)}`, '_blank');
        }, 600);
    }
}

// CONTACT FORM SUBMIT
function handleSubmit(e) {
    if (e) e.preventDefault();
    const btn = e?.target?.querySelector('.form-submit');
    if (btn) {
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
            const formSuccess = document.getElementById('formSuccess');
            if (formSuccess) formSuccess.classList.add('show');
            if (e?.target) e.target.reset();
            btn.textContent = 'Send Message →';
            btn.disabled = false;
            setTimeout(() => {
                if (formSuccess) formSuccess.classList.remove('show');
            }, 5000);
        }, 1200);
    }
}

// Initialize Pharmacy Products (if on pharmacy page)
if (document.getElementById('productsGrid')) {
    renderProducts();
}

// Contact page form handler (check if form exists)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
}
// Mobile dropdown toggle
function initMobileDropdown() {
    const dropdowns = document.querySelectorAll('.nav-links .dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                const isActive = dropdown.classList.contains('active');
                if (!isActive) {
                    e.preventDefault();
                    document.querySelectorAll('.nav-links .dropdown.active').forEach(activeDropdown => {
                        if (activeDropdown !== dropdown) activeDropdown.classList.remove('active');
                    });
                    dropdown.classList.add('active');
                }
            }
        });
    });
}

// Call this after your existing toggleNav function
document.addEventListener('DOMContentLoaded', function () {
    initMobileDropdown();
});

// Also update on window resize
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.nav-links .dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

(function () {
    // ========== MOBILE NAVBAR FUNCTIONALITY ==========
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const dropdown = document.getElementById('servicesDropdown');

    function toggleMenu() {
        if (navLinks) {
            navLinks.classList.toggle('show');
            if (hamburger) hamburger.classList.toggle('active');
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Mobile dropdown handling
    if (dropdown) {
        const toggleLink = dropdown.querySelector('.dropdown-toggle');
        if (toggleLink) {
            toggleLink.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    }

    // Close menu when clicking on links
    document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768 && navLinks && navLinks.classList.contains('show')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 && navLinks && navLinks.classList.contains('show')) {
            if (!navLinks.contains(e.target) && !hamburger?.contains(e.target)) {
                toggleMenu();
            }
        }
    });

    // ========== HERO SLIDER FUNCTIONALITY ==========
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.hero-dot');
    const slidesContainer = document.getElementById('heroSlides');

    function updateSlider() {
        if (slidesContainer) {
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    document.getElementById('prevSlide')?.addEventListener('click', prevSlide);
    document.getElementById('nextSlide')?.addEventListener('click', nextSlide);

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', function () {
            currentSlide = idx;
            updateSlider();
        });
    });

    // Auto slide every 5 seconds
    let autoInterval = setInterval(nextSlide, 5000);
    const hero = document.querySelector('.hero');

    if (hero) {
        hero.addEventListener('mouseenter', function () {
            clearInterval(autoInterval);
        });
        hero.addEventListener('mouseleave', function () {
            autoInterval = setInterval(nextSlide, 5000);
        });
    }

    // ========== SERVICE FINDER FUNCTIONALITY ==========
    let selectedService = "General Medicine";

    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function () {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('sel'));
            this.classList.add('sel');
            selectedService = this.getAttribute('data-service') || this.innerText;
        });
    });

    const confirmBtn = document.getElementById('confirmServiceBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function () {
            window.location.href = `services.html?service=${encodeURIComponent(selectedService)}`;
        });
    }

    // ========== INSURANCE CAROUSEL INITIALIZATION ==========
    if (document.querySelector('.insurance-carousel')) {
        new Swiper('.insurance-carousel', {
            loop: true,
            speed: 600,
            autoplay: { delay: 2500, disableOnInteraction: false },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            breakpoints: {
                320: { slidesPerView: 2, spaceBetween: 15 },
                576: { slidesPerView: 3, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 25 },
                1024: { slidesPerView: 5, spaceBetween: 30 }
            }
        });
    }

    // ========== BACK TO TOP BUTTON ==========
    const backTop = document.getElementById('backTop');
    if (backTop) {
        window.addEventListener('scroll', function () {
            backTop.classList.toggle('visible', window.scrollY > 300);
        });

        backTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // Mobile Navigation
    document.addEventListener('DOMContentLoaded', function () {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const dropdowns = document.querySelectorAll('.dropdown');

        // Toggle mobile menu
        if (hamburger) {
            hamburger.addEventListener('click', function (e) {
                e.stopPropagation();
                hamburger.classList.toggle('open');
                navLinks.classList.toggle('open');
                document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
            });
        }

        // Handle dropdown toggles on mobile
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');

            if (toggle) {
                toggle.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown && other.classList.contains('active')) {
                            other.classList.remove('active');
                        }
                    });

                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                });
            }
        });

        // Close menu when clicking a link (except dropdown toggles)
        const navLinksItems = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';

                // Reset all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (navLinks && navLinks.classList.contains('open')) {
                if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                    hamburger.classList.remove('open');
                    navLinks.classList.remove('open');
                    document.body.style.overflow = '';
                }
            }
        });

        // Prevent dropdown toggles from closing the menu
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function (e) {
                e.stopPropagation();
            });
        });
    });
})();