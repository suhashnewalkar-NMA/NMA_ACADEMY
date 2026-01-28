
document.addEventListener('DOMContentLoaded', () => {

    // 1. PRELOADER
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        });
    }

    // 2. STICKY NAVIGATION BAR
    const header = document.querySelector("#header");
    if (header) {
        window.addEventListener("scroll", function () {
            header.classList.toggle("sticky", window.scrollY > 0);
        });
    }

    // 3. MOBILE HAMBURGER MENU
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // 4. BACK TO TOP BUTTON
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { backToTopBtn.classList.add('show'); }
            else { backToTopBtn.classList.remove('show'); }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. SCROLL REVEAL ANIMATION
    window.addEventListener('scroll', reveal);
    function reveal() {
        var reveals = document.querySelectorAll('.reveal');
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    reveal();

    // 6. GENERIC FORM HANDLER
    function handleFormSubmit(formId, btnSelector, successMsg, callback) {
        const form = document.querySelector(formId);
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const btn = this.querySelector(btnSelector);
                const originalText = btn.innerHTML;

                btn.innerHTML = 'Processing...';
                btn.style.opacity = '0.7';
                btn.style.cursor = 'not-allowed';

                setTimeout(() => {
                    btn.innerHTML = successMsg;
                    btn.style.backgroundColor = '#28a745';
                    btn.style.borderColor = '#28a745';
                    btn.style.color = '#fff';
                    btn.style.opacity = '1';

                    if (callback) callback(this);
                    this.reset();

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.borderColor = '';
                        btn.style.color = '';
                        btn.style.cursor = 'pointer';
                    }, 3000);
                }, 1500);
            });
        }
    }

    // 7. INITIALIZE FORMS
    handleFormSubmit('#contactForm', 'button', "Success! We'll contact you soon.");
    handleFormSubmit('.footer-form', 'button', '<i class="fas fa-check"></i> Subscribed!');

    handleFormSubmit('#reviewForm', 'button', 'Review Posted!', function (form) {
        const name = form.querySelector('#reviewName').value;
        const rating = form.querySelector('#reviewRating').value;
        const text = form.querySelector('#reviewText').value;
        const reviewsList = document.getElementById('reviewsList');

        let starsHtml = '';
        for (let i = 0; i < rating; i++) { starsHtml += '<i class="fas fa-star"></i>'; }

        const newReview = document.createElement('div');
        newReview.classList.add('review-card');
        newReview.style.animation = "fadeIn 0.5s ease";

        newReview.innerHTML = `
<div class="review-stars">${starsHtml}</div>
<p class="review-text">"${text}"</p>
<h4 class="review-author">- ${name}</h4>
`;

        if (reviewsList) {
            reviewsList.prepend(newReview);
            newReview.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // 8. CAROUSEL LOGIC
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    const updateCarousel = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        currentIndex = index;
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let index = (currentIndex + 1) % slides.length;
            updateCarousel(index);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let index = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel(index);
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            updateCarousel(parseInt(dot.dataset.index));
        });
    });

    // Auto-play
    let carouselInterval = setInterval(() => { if (nextBtn) nextBtn.click(); }, 5000);
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => clearInterval(carouselInterval));
        carouselContainer.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(() => { if (nextBtn) nextBtn.click(); }, 5000);
        });
    }
});
