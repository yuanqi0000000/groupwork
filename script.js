// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation
    /*
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
    */

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

    // Accordion Functionality
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = header.querySelector('.accordion-icon');

        header.addEventListener('click', () => {

            // Toggle current item
            item.classList.toggle('active'); // Optional: for styling the item itself
            header.classList.toggle('active');
            content.classList.toggle('active'); // For padding transition

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.textContent = '+';
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = '+'; // Icon is handled by CSS transform now
                icon.style.transform = 'rotate(45deg)';
            }
        });
    });

}); // End of DOMContentLoaded
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
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

    
