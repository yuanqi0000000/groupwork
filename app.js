// Main Application - Manage all functionalities
const app = Vue.createApp({
    data() {
        return {
            // Main application data
            isMenuOpen: false,
            showCart: false,
            activeFilter: 'all',
            cartItems: [],
            
            // Contact form data
            formData: {
                name: "",
                email: "",
                phone: "",
                visitDate: "",
                gender: "",
                serviceType: "",
                subject: "",
                message: "",
                consent: false
            },
            errors: {},
            formSubmitted: false,

            // Newsletter subscription form data
            newsletterEmail: '',
            newsletterError: '',
            newsletterSubmitted: false,

            // Product data
            products: [
                {
                    id: 1,
                    name: "Waiter Robot",
                    price: 1299.99,
                    type: "service",
                    description: "Where efficiency meets hospitality - I'm your automated dining companion, here to serve with precision, speed, and a touch of innovation.",
                    image: "assets/1.jpg",
                    modalId: "waiterModal"
                },
                {
                    id: 2,
                    name: "Chef Robot",
                    price: 2499.99,
                    type: "service",
                    description: "From chopping to crafting culinary masterpieces – I blend technology with the art of cooking, delivering consistent flavor and creativity on every plate.",
                    image: "assets/2.jpg",
                    modalId: "chefModal"
                },
                {
                    id: 3,
                    name: "Companion Robot",
                    price: 999.99,
                    type: "home",
                    description: "More than just a machine - I'm here to listen, engage, and brighten your day with conversation, laughter, and unwavering companionship.",
                    image: "assets/3.jpg",
                    modalId: "companionModal"
                },
                {
                    id: 4,
                    name: "Caregiver Robot",
                    price: 1899.99,
                    type: "home",
                    description: "Your safety and well-being are my priority. I provide reliable assistance, monitor health, and offer a reassuring presence for those in need.",
                    image: "assets/4.jpg",
                    modalId: "caregiverModal"
                },
                {
                    id: 5,
                    name: "Inspector Robot",
                    price: 2999.99,
                    type: "industrial",
                    description: "Detail-oriented and tireless - I'm designed to ensure safety, and maintain standards in every inspection.",
                    image: "assets/5.jpg",
                    modalId: "inspectorModal"
                }
            ],
            
            // FAQ data
            faqList: [
                {
                    question: "What kind of robots do you offer?",
                    answer: "We offer a diverse range of robots including service robots for hospitality, AI-powered chef robots, smart home companion robots, precision medical robots for healthcare, and inspector robots for safety and anomaly detection."
                },
                {
                    question: "Are your robots customizable?",
                    answer: "Yes, many of our robotic solutions can be customized to meet specific client needs and operational requirements. Please contact our sales team to discuss your customization options."
                },
                {
                    question: "What is the typical battery life of your robots?",
                    answer: "Battery life varies depending on the robot model and usage intensity. Generally, our robots are designed for extended operational periods, with many models featuring autonomous charging capabilities."
                },
                {
                    question: "Do you provide training and support?",
                    answer: "Absolutely. We provide comprehensive training for operating our robots and offer ongoing technical support to ensure seamless integration and performance."
                },
                {
                    question: "How can I get a quote for a robot?",
                    answer: "You can request a quote by filling out the contact form on our website, or by directly emailing our sales department. We'll get back to you promptly with the relevant information."
                },
                {
                    question: "What safety features are built into your robots?",
                    answer: "Our robots are equipped with advanced safety features, including multiple sensors for obstacle avoidance, emergency stop mechanisms, and compliance with industry safety standards to ensure safe operation in various environments."
                }
            ]
        };
    },
    computed: {
        // Main application computed properties
        filteredProducts() {
            if (this.activeFilter === 'all') {
                return this.products;
            }
            return this.products.filter(product => product.type === this.activeFilter);
        },
        cartTotal() {
            return this.cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
        },

        // Contact form computed properties
        formIsValid() {
            if (!this.formSubmitted && Object.keys(this.errors).length === 0) {
                return true;
            }
            return Object.values(this.errors).every(error => error === "");
        },

        // Newsletter form computed properties
        newsletterIsValid() {
            if (!this.newsletterSubmitted && !this.newsletterError) {
                return true;
            }
            return !this.newsletterError;
        }
    },
    methods: {
        // Main application methods
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        
        // Product filtering related
        setFilter(filter) {
            this.activeFilter = filter;
        },
        
        // Shopping cart related
        toggleCart() {
            this.showCart = !this.showCart;
        },
        addToCart(product) {
            this.cartItems.push(product);
            this.showCart = true;
        },
        removeFromCart(index) {
            this.cartItems.splice(index, 1);
        },
        checkout() {
            if (this.cartItems.length === 0) {
                alert('Your cart is empty');
                return;
            }
            
            // Simulate checkout process
            alert('Thank you for your purchase! Your order has been processed.');
            this.cartItems = [];
            this.showCart = false;
        },

        // Contact form methods
        validateField(field) {
            switch (field) {
                case 'name':
                    this.errors.name = this.formData.name ? '' : "Name is required";
                    break;
                
                case 'email':
                    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    this.errors.email = emailPattern.test(this.formData.email) ? '' : "Please enter a valid email address";
                    break;

                case 'phone':
                    const phonePattern = /^[0-9]{10,11}$/;
                    this.errors.phone = phonePattern.test(this.formData.phone) ? '' : "Please enter a valid phone number";
                    break;

                case 'visitDate':
                    this.errors.visitDate = this.formData.visitDate ? '' : "Please select a visit date";
                    break;

                case 'gender':
                    this.errors.gender = this.formData.gender ? '' : "Please select your gender";
                    break;

                case 'serviceType':
                    this.errors.serviceType = this.formData.serviceType ? '' : "Please select a service type";
                    break;

                case 'subject':
                    this.errors.subject = this.formData.subject ? '' : "Subject is required";
                    break;

                case 'message':
                    this.errors.message = this.formData.message ? '' : "Message is required";
                    break;

                case 'consent':
                    this.errors.consent = this.formData.consent ? '' : "Please agree to the terms and conditions";
                    break;
            }
        },
        submitForm() {
            this.formSubmitted = true;
            // Validate all fields
            Object.keys(this.formData).forEach(field => {
                this.validateField(field);
            });
            
            if (this.formIsValid) {
                // Simulate form submission
                console.log('Form submitted:', this.formData);
                alert('Thank you for your message! We will get back to you soon.');
                // Reset form
                this.formData = {
                    name: "",
                    email: "",
                    phone: "",
                    visitDate: "",
                    gender: "",
                    serviceType: "",
                    subject: "",
                    message: "",
                    consent: false
                };
                this.errors = {};
                this.formSubmitted = false;
            }
        },

        // Newsletter form methods
        validateNewsletterEmail() {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!this.newsletterEmail) {
                this.newsletterError = 'Please enter your email address';
            } else if (!emailPattern.test(this.newsletterEmail)) {
                this.newsletterError = 'Please enter a valid email address';
            } else {
                this.newsletterError = '';
            }
        },
        submitNewsletter() {
            this.newsletterSubmitted = true;
            this.validateNewsletterEmail();
            
            if (this.newsletterIsValid) {
                // Simulate newsletter subscription
                console.log('Newsletter subscription:', this.newsletterEmail);
                alert('Thank you for subscribing to our newsletter!');
                this.newsletterEmail = '';
                this.newsletterError = '';
                this.newsletterSubmitted = false;
            }
        }
    }
});

app.mount('#mainApp'); 