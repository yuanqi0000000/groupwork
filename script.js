// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav item
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navLinks.classList.remove('active');
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
        // Add event listeners for dots
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

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active nav link based on scroll position
    // const sections = document.querySelectorAll('section');
    // const navLinks2 = document.querySelectorAll('.nav-links a');

    // window.addEventListener('scroll', function () {
    //     let current = '';

    //     sections.forEach(section => {
    //         const sectionTop = section.offsetTop;
    //         const sectionHeight = section.clientHeight;

    //         if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
    //             current = section.getAttribute('id');
    //         }
    //     });

    //     navLinks2.forEach(link => {
    //         link.classList.remove('active');
    //         if (link.getAttribute('href').substring(1) === current) {
    //             link.classList.add('active');
    //         }
    //     });
    // });

    // Contact Form validation
    const contactForm = document.getElementById('messageForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simple validation
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Please fill in all required fields.');
                return;
            }

            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Product animation on scroll
    // const productCards = document.querySelectorAll('.product-card');

    // const observerOptions = {
    //     threshold: 0.1,
    //     rootMargin: '0px 0px -50px 0px'
    // };

    // const productObserver = new IntersectionObserver(function (entries, observer) {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.style.opacity = '1';
    //             entry.target.style.transform = 'translateY(0)';
    //             observer.unobserve(entry.target);
    //         }
    //     });
    // }, observerOptions);

    // productCards.forEach(card => {
    //     card.style.opacity = '0';
    //     card.style.transform = 'translateY(30px)';
    //     card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    //     productObserver.observe(card);
    // });
});