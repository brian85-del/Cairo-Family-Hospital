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