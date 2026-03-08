// ============================================
// COASTAL BREEZE - Interactive Script
// GSAP 3 + ScrollTrigger
// ============================================

gsap.registerPlugin(ScrollTrigger);

// ============================================
// RENDERIZAÇÃO DINÂMICA - Carrega dados do data.js
// ============================================

function renderPage() {
    if (!window.tripData) {
        console.error('tripData não encontrado. Verifique se data.js foi carregado.');
        return;
    }

    const data = window.tripData;

    // ===== BRANDING =====
    document.title = `${data.brand.name} • ${data.destination.name}`;
    document.getElementById('page-title').textContent = `${data.brand.name} • ${data.destination.name}`;
    document.getElementById('nav-brand').textContent = data.brand.name;
    document.getElementById('footer-brand').textContent = data.brand.name;
    document.getElementById('footer-slogan').textContent = data.brand.slogan;

    // ===== DESTINO / HERO =====
    document.getElementById('hero-bg').style.backgroundImage = `url('${data.destination.heroImage}')`;
    document.getElementById('hero-label').textContent = data.destination.label;
    document.getElementById('hero-title').textContent = data.destination.name;
    document.getElementById('hero-subtitle').textContent = data.destination.subtitle;

    // ===== VOOS =====
    document.getElementById('flights-title').textContent = data.flights.title;
    document.getElementById('flights-subtitle').textContent = data.flights.subtitle;

    const flightsContainer = document.getElementById('flights-container');
    flightsContainer.innerHTML = `
        ${renderFlightCard(data.flights.outbound, 'outbound')}
        ${renderDurationCard(data.flights.duration)}
        ${renderFlightCard(data.flights.returnFlight, 'return')}
    `;

    // ===== FILOSOFIA =====
    document.getElementById('philosophy-intro').innerHTML = data.philosophy.intro;
    document.getElementById('philosophy-contrast').innerHTML = data.philosophy.contrast;

    // ===== RECURSOS =====
    document.getElementById('features-title').textContent = data.features.title;
    document.getElementById('features-subtitle').textContent = data.features.subtitle;

    // Payment options
    const paymentContainer = document.getElementById('payment-options');
    paymentContainer.innerHTML = data.features.paymentOptions.map(opt => `
        <div class="payment-item">
            <div class="payment-icon"><i class="fa-regular ${opt.icon}"></i></div>
            <div class="payment-info">
                <span class="payment-highlight">${opt.highlight}</span>
                <small>${opt.small}</small>
            </div>
        </div>
    `).join('');

    // Typewriter
    document.getElementById('typewriter-status').textContent = data.features.typewriterStatus;

    // ===== HOTÉIS =====
    document.getElementById('hotels-title').textContent = data.hotels.title;
    document.getElementById('hotels-subtitle').textContent = data.hotels.subtitle;

    const hotelsContainer = document.getElementById('hotels-container');
    hotelsContainer.innerHTML = data.hotels.list.map((hotel, index) => renderHotelCard(hotel, index)).join('');

    // ===== CTA =====
    document.getElementById('cta-title').textContent = data.destination.ctaTitle;
    document.getElementById('cta-subtitle').textContent = data.destination.ctaSubtitle;

    const ctaButtons = document.getElementById('cta-buttons');
    ctaButtons.innerHTML = `
        <a href="${data.contact.whatsapp.url}" class="btn btn-primary" target="_blank">
            <i class="fa-brands fa-whatsapp"></i> ${data.contact.whatsapp.label}
        </a>
        <a href="mailto:${data.contact.email.address}" class="btn btn-secondary">
            <i class="fa-solid fa-envelope"></i> ${data.contact.email.label}
        </a>
        <a href="${data.contact.website.url}" class="btn btn-secondary" target="_blank">
            <i class="fa-solid fa-globe"></i> ${data.contact.website.label}
        </a>
    `;

    // ===== FOOTER =====
    const footerLinks = document.getElementById('footer-links');
    footerLinks.innerHTML = `
        <a href="${data.contact.instagram.url}" target="_blank"><i class="fa-brands ${data.contact.instagram.icon}"></i></a>
        <a href="${data.contact.whatsapp.url}" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
        <a href="${data.contact.website.url}" target="_blank"><i class="fa-solid fa-globe"></i></a>
    `;

    document.getElementById('footer-copy').textContent = `© ${data.contact.year} ${data.brand.name}. Todos os direitos reservados.`;

    // Navbar WhatsApp
    const navWhatsapp = document.getElementById('nav-whatsapp');
    navWhatsapp.href = data.contact.whatsapp.url;
}

// Render flight card
function renderFlightCard(flight, type) {
    return `
        <div class="flight-card ${type}-card">
            <div class="flight-header">
                <div class="flight-label">${flight.label}</div>
                <div class="flight-date">${flight.date}</div>
            </div>
            <div class="flight-route-display">
                <div class="airport">
                    <div class="code">${flight.origin.code}</div>
                    <div class="city">${flight.origin.city}</div>
                </div>
                <div class="route-arrow">
                    <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                        <line x1="10" y1="20" x2="80" y2="20" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/>
                        <circle cx="88" cy="20" r="4" fill="currentColor"/>
                    </svg>
                </div>
                <div class="airport">
                    <div class="code">${flight.destination.code}</div>
                    <div class="city">${flight.destination.city}</div>
                </div>
            </div>
            <div class="flight-time">${flight.departureTime} — ${flight.arrivalTime}</div>
            <div class="flight-info">${flight.info} • ${flight.duration}</div>
            <div class="flight-details">
                ${flight.details.map(d => `<span class="flight-detail-tag"><i class="fa-solid fa-suitcase"></i> ${d}</span>`).join('')}
            </div>
        </div>
    `;
}

// Render duration card
function renderDurationCard(duration) {
    return `
        <div class="duration-card">
            <div class="duration-icon">
                <i class="fa-regular fa-calendar"></i>
            </div>
            <div class="duration-content">
                <h3>Período</h3>
                <p class="duration-value">${duration.days} Dias</p>
                <p class="duration-sub">${duration.nights} ${duration.label}</p>
            </div>
        </div>
    `;
}

// Render hotel card
function renderHotelCard(hotel, index) {
    const featuredClass = hotel.featured ? 'featured' : '';
    const badge = hotel.badge ? `<div class="hotel-badge">${hotel.badge}</div>` : '';
    const stars = '★'.repeat(hotel.stars);

    return `
        <div class="hotel-stack-item ${featuredClass}">
            ${badge}
            <div class="hotel-number">${hotel.number}</div>
            <div class="hotel-gallery">
                <div class="gallery-container" id="gallery-${hotel.id}">
                    ${hotel.images.map(img => `<div class="gallery-slide" style="background-image: url('${img}')"></div>`).join('')}
                </div>
                <div class="gallery-dots" id="dots-${hotel.id}"></div>
                <button class="gallery-nav prev" onclick="galleryMove(${index}, -1)"><i class="fa-solid fa-chevron-left"></i></button>
                <button class="gallery-nav next" onclick="galleryMove(${index}, 1)"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
            <div class="hotel-info">
                <h3>${hotel.name}</h3>
                <p class="hotel-region"><i class="fa-solid fa-location-dot"></i> ${hotel.region}</p>
                <div class="hotel-rating">
                    <span class="hotel-stars">${stars}</span>
                    <span class="hotel-rating-text">${hotel.ratingText}</span>
                </div>
                <p class="hotel-description">${hotel.description}</p>
                <div class="hotel-amenities">
                    ${hotel.amenities.map(amenity => `
                        <span class="amenity-tag"><i class="fa-solid ${amenity.icon}"></i> ${amenity.name}</span>
                    `).join('')}
                </div>
                <div class="hotel-prices">
                    <div class="price-box">
                        <span>Duplo</span>
                        <strong>${hotel.prices.double}</strong>
                    </div>
                    <div class="price-box">
                        <span>Triplo</span>
                        <strong>${hotel.prices.triple}</strong>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// GALLERY SYSTEM - Dinâmico para qualquer hotel
// ============================================

const galleries = {};

// Inicializa todas as galerias encontradas no documento
function initAllGalleries() {
    const galleryContainers = document.querySelectorAll('.gallery-container');

    galleryContainers.forEach((container, index) => {
        const hotelId = index;
        const dotsContainer = container.parentElement.querySelector('.gallery-dots');
        const slides = container.querySelectorAll('.gallery-slide');

        if (slides.length > 0) {
            galleries[hotelId] = {
                current: 0,
                total: slides.length,
                slides: slides,
                dotsContainer: dotsContainer,
                container: container
            };

            // Cria os dots
            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                for (let i = 0; i < slides.length; i++) {
                    const dot = document.createElement('div');
                    dot.className = `dot ${i === 0 ? 'active' : ''}`;
                    dot.addEventListener('click', () => goToSlide(hotelId, i));
                    dotsContainer.appendChild(dot);
                }
            }

            // Mostra o primeiro slide
            updateGallery(hotelId);
        }
    });
}

function galleryMove(hotelId, direction) {
    if (!galleries[hotelId]) return;

    const gallery = galleries[hotelId];
    gallery.current += direction;

    if (gallery.current < 0) {
        gallery.current = gallery.total - 1;
    } else if (gallery.current >= gallery.total) {
        gallery.current = 0;
    }

    updateGallery(hotelId);
}

function goToSlide(hotelId, index) {
    if (!galleries[hotelId]) return;
    galleries[hotelId].current = index;
    updateGallery(hotelId);
}

function updateGallery(hotelId) {
    const gallery = galleries[hotelId];

    // Update slides
    gallery.slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === gallery.current);
    });

    // Update dots
    if (gallery.dotsContainer) {
        const dots = gallery.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === gallery.current);
        });
    }
}

// Auto-avança as galerias a cada 5 segundos
function startGalleryAutoAdvance() {
    Object.keys(galleries).forEach((hotelId, index) => {
        const interval = 5000 + (index * 1500);
        setInterval(() => {
            galleryMove(parseInt(hotelId), 1);
        }, interval);
    });
}

// ============================================
// TYPEWRITER EFFECT
// ============================================

let typewriterTexts = ['Disponível agora'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterElement = null;

function initTypewriter() {
    typewriterElement = document.querySelector('.typewriter-content');

    // Usa os textos do tripData ou padrão
    if (window.tripData && window.tripData.features && window.tripData.features.typewriterTexts) {
        typewriterTexts = window.tripData.features.typewriterTexts;
    }

    if (typewriterElement) {
        typeWriter();
    }
}

function typeWriter() {
    if (!typewriterElement) return;

    const currentText = typewriterTexts[textIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
}

// ============================================
// PROTOCOL CANVAS DRAWING
// ============================================

function drawProtocolCanvas() {
    const canvas = document.getElementById('protocol-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw timeline
    const points = [
        { x: 40, y: height / 2 },
        { x: 120, y: 80 },
        { x: 200, y: height / 2 },
        { x: 240, y: height - 80 }
    ];

    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.strokeStyle = '#48B5A0';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();

    // Draw points
    points.forEach((point, index) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = index === 2 ? '#48B5A0' : '#E8896F';
        ctx.fill();
        ctx.strokeStyle = '#0F4C5C';
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.stroke();

        // Labels
        ctx.font = '10px DM Mono';
        ctx.fillStyle = '#0F4C5C';
        ctx.textAlign = 'center';
        const labels = ['Start', 'Plan', 'Book', 'Trip'];
        ctx.fillText(labels[index], point.x, point.y + 20);
    });
}

// ============================================
// GSAP ANIMATIONS
// ============================================

function initAnimations() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.top = '10px';
                navbar.style.transform = 'translateX(-50%) scale(0.95)';
            } else {
                navbar.style.top = '20px';
                navbar.style.transform = 'translateX(-50%) scale(1)';
            }
        });
    }

    // Hero animations
    const heroLabel = document.querySelector('.hero-label');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCTA = document.querySelector('.hero-cta');

    if (heroLabel) {
        const tl = gsap.timeline({ delay: 0.3 });
        tl.from(heroLabel, { y: -10, opacity: 0, duration: 0.5, ease: 'power2.out' })
          .from(heroTitle, { y: -15, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
          .from(heroSubtitle, { y: -10, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
          .from(heroCTA, { y: -10, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
    }

    // Scroll indicator fade out
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        gsap.to(scrollIndicator, {
            opacity: 0,
            duration: 0.6,
            scrollTrigger: {
                trigger: '.hero',
                start: '70% top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Flight cards animation
    const flightCards = document.querySelectorAll('.flight-card, .duration-card');
    if (flightCards.length > 0) {
        gsap.from(flightCards, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.section-flights',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    }

    // Philosophy animation
    const philosophyIntro = document.querySelector('.philosophy-intro');
    const philosophyContrast = document.querySelector('.philosophy-contrast');

    if (philosophyContrast) {
        gsap.from(philosophyIntro, {
            y: 30,
            opacity: 0,
            duration: 0.9,
            scrollTrigger: {
                trigger: '.section-philosophy',
                start: 'top 65%',
                toggleActions: 'play none none none'
            }
        });

        gsap.from(philosophyContrast, {
            y: 40,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            scrollTrigger: {
                trigger: '.section-philosophy',
                start: 'top 65%',
                toggleActions: 'play none none none'
            }
        });
    }

    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        gsap.from(featureCards, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.section-features',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    }

    // Hotel cards animation
    const hotelStackItems = document.querySelectorAll('.hotel-stack-item');
    if (hotelStackItems.length > 0) {
        gsap.from(hotelStackItems, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.section-hotels',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    }

    // CTA section animation
    const ctaSection = document.querySelector('.section-cta');
    if (ctaSection) {
        const ctaH2 = ctaSection.querySelector('h2');
        const ctaP = ctaSection.querySelector('p');
        const ctaButtons = ctaSection.querySelectorAll('.btn');

        gsap.from([ctaH2, ctaP], {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
                trigger: ctaSection,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });

        gsap.from(ctaButtons, {
            y: 25,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ctaSection,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    }

    // Footer animation
    const footer = document.querySelector('.footer');
    if (footer) {
        gsap.from(footer, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: footer,
                start: 'top 95%',
                toggleActions: 'play none none none'
            }
        });
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Renderiza a página com os dados do data.js
    renderPage();

    // Initialize all galleries
    initAllGalleries();

    // Start gallery auto-advance
    startGalleryAutoAdvance();

    // Initialize typewriter
    initTypewriter();

    // Draw protocol canvas
    drawProtocolCanvas();

    // Initialize GSAP animations
    initAnimations();

    // Initialize smooth scroll
    initSmoothScroll();

    console.log('🌊 Coastal Breeze - Rumo ao Destino loaded');
});

// Make functions globally available for onclick attributes
window.galleryMove = galleryMove;
