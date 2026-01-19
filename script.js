// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // In a real application, you would send this data to your server
        // For now, we'll simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success message
        formMessage.textContent = 'Thank you! Your message has been sent successfully. We will contact you within 24 hours.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Log data (for development - remove in production)
        console.log('Form submission:', formData);
        
    } catch (error) {
        // Error message
        formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        console.error('Form submission error:', error);
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

// Form validation
const inputs = contactForm.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (!input.value.trim() && input.hasAttribute('required')) {
            input.style.borderColor = 'var(--accent)';
        } else {
            input.style.borderColor = 'var(--light)';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--secondary)';
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .benefit-card, .step').forEach(el => {
    observer.observe(el);
});

// Add animation classes to CSS
const style = document.createElement('style');
style.textContent = `
    .service-card, .benefit-card, .step {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-card.animate-in,
    .benefit-card.animate-in,
    .step.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .step:nth-child(1) { transition-delay: 0.1s; }
    .step:nth-child(2) { transition-delay: 0.2s; }
    .step:nth-child(3) { transition-delay: 0.3s; }
    .step:nth-child(4) { transition-delay: 0.4s; }
    .step:nth-child(5) { transition-delay: 0.5s; }
`;
document.head.appendChild(style);

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Start counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

heroObserver.observe(document.querySelector('.hero'));
