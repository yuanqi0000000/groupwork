
Vue.createApp({
    data() {
        return {
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
            errors: {}
        };
    },
    methods: {
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
            Object.keys(this.formData).forEach(this.validateField);
            if (Object.values(this.errors).every(error => error === "")) {
                alert("Form submitted successfully!");
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
            } else {
                alert("Please check the form for errors");
            }
        }
    }
}).mount('#contactForm');

Vue.createApp({
    data() {
        return {
            newsletterEmail: '',
            newsletterError: ''
        }
    },
    methods: {
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
            this.validateNewsletterEmail();
            if (!this.newsletterError) {
                console.log('Subscribing email:', this.newsletterEmail);
                this.newsletterEmail = '';
                alert('Thank you for subscribing to our newsletter!');
            }
        }
    }
}).mount('#newsletterForm'); 