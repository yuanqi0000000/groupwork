// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) { 
                bsCollapse.hide();
            }
        });
    });
   
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; 

    // Initialize carousel
    function initCarousel() {
        showSlide(currentSlide);
        startSlideInterval();
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        dots.forEach(dot => {
            dot.addEventListener('click', function () {
                const slideIndex = parseInt(this.getAttribute('data-index'));
                showSlide(slideIndex);
            });
        });

        carousel.addEventListener('mouseenter', stopSlideInterval);
        carousel.addEventListener('mouseleave', startSlideInterval);
    }

    // Show specific slide
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1)%5;
        showSlide(next);
    }

    function prevSlide() {
        let prev = (currentSlide+ 5 - 1)%5;
        showSlide(prev);
    }

    function startSlideInterval() {
        stopSlideInterval();
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopSlideInterval() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    if (carousel && slides.length > 0) {
        initCarousel();
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Handle demo request
    function handleRequestDemo(modalId) {
        const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
        if (modal) {
            modal.hide();
        }
        
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    }

    const modalIds = ['waiterModal', 'chefModal', 'companionModal', 'caregiverModal', 'inspectorModal'];
    modalIds.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            const demoButton = modal.querySelector('.btn-primary');
            if (demoButton) {
                demoButton.addEventListener('click', () => handleRequestDemo(modalId));
            }
        }
    });
}); 

    

    
