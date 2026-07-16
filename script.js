// Show notification function
function showNotification(message = 'Message Received!') {
    const notification = document.getElementById('notification');
    const messageEl = notification.querySelector('.notification-message');
    
    messageEl.textContent = message;
    notification.classList.add('show');
    
    // Auto close after 4 seconds
    const autoCloseTimer = setTimeout(() => {
        hideNotification();
    }, 4000);
    
    // Store timer for cleanup
    notification.autoCloseTimer = autoCloseTimer;
}

function hideNotification() {
    const notification = document.getElementById('notification');
    
    // Clear auto-close timer if exists
    if (notification.autoCloseTimer) {
        clearTimeout(notification.autoCloseTimer);
    }
    
    notification.classList.remove('show');
}

// Close button handler
document.querySelector('.notification-close')?.addEventListener('click', hideNotification);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler with enhanced feedback
document.querySelector('.contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[placeholder="Your Name"]').value.trim();
    const email = this.querySelector('input[placeholder="Your Email"]').value.trim();
    const message = this.querySelector('textarea').value.trim();
    
    // Simple validation
    if (name && email && message) {
        const button = this.querySelector('.submit-button');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.style.opacity = '0.8';
        
        setTimeout(() => {
            showNotification(`Thank you ${name}! Your message has been received.`);
            this.reset();
            button.textContent = originalText;
            button.style.opacity = '1';
        }, 500);
    } else {
        showNotification('Please fill in all fields');
    }
});

// Enhanced scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animation to service cards and gallery items
document.querySelectorAll('.service-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Enhanced keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes glow {
        0%, 100% {
            text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        }
        50% {
            text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
        }
    }
`;
document.head.appendChild(style);

// CTA button functionality - navigate to contact page
document.querySelector('.cta-button')?.addEventListener('click', function () {
    window.location.href = 'contact.html';
});

// Add active nav link indicator based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link style
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: #d4af37;
    }
`;
document.head.appendChild(activeStyle);

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeInUp 0.8s ease';
});
