document.addEventListener('DOMContentLoaded', () => {
    // Esse script vai procurar automaticamente TODOS os carrosseis injetados pelo n8n 
    // na página e ativá-los de forma 100% independente, não quebra com 1, 2 ou N hotéis
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const id = carousel.id;
        const inner = carousel.querySelector('.carousel-inner');
        const images = inner.querySelectorAll('img');
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');
        
        // Ativa a primeira imagem automaticamente caso o n8n não tenha injetado a classe
        if(images.length > 0 && !inner.querySelector('.active')) {
            images[0].classList.add('active');
        }

        // Criar indicadores (bolinhas)
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if(index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(id, index);
            });
            indicatorsContainer.appendChild(dot);
        });
    });
});

const carouselData = {};

function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if(!carousel) return;
    
    const inner = carousel.querySelector('.carousel-inner');
    const images = inner.querySelectorAll('img');
    const indicators = carousel.querySelectorAll('.dot');
    
    if(!carouselData[carouselId]) {
        carouselData[carouselId] = 0;
    }
    
    if(images.length > 0) {
        images[carouselData[carouselId]].classList.remove('active');
        indicators[carouselData[carouselId]].classList.remove('active');
        
        carouselData[carouselId] = (carouselData[carouselId] + direction + images.length) % images.length;
        
        images[carouselData[carouselId]].classList.add('active');
        indicators[carouselData[carouselId]].classList.add('active');
        
        // Scroll ativo para não sumir se tiver 20+ fotos
        indicators[carouselData[carouselId]].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

function goToSlide(carouselId, index) {
    const carousel = document.getElementById(carouselId);
    if(!carousel) return;
    
    const inner = carousel.querySelector('.carousel-inner');
    const images = inner.querySelectorAll('img');
    const indicators = carousel.querySelectorAll('.dot');
    
    if(!carouselData[carouselId]) {
        carouselData[carouselId] = 0;
    }
    
    if(images.length > 0) {
        images[carouselData[carouselId]].classList.remove('active');
        indicators[carouselData[carouselId]].classList.remove('active');
        
        carouselData[carouselId] = index;
        
        images[carouselData[carouselId]].classList.add('active');
        indicators[carouselData[carouselId]].classList.add('active');
    }
}

// Animações
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-panel').forEach(panel => {
    panel.style.opacity = 0;
    panel.style.transform = 'translateY(20px)';
    panel.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(panel);
});
