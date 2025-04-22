// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .cta-button, .social-link, .dot, .testimonial-controls button');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.background = 'rgba(110, 0, 255, 0.2)';
    });

    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.background = 'rgba(110, 0, 255, 0.15)';
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (menuToggle.classList.contains('active')) {
            document.querySelector('.bar:nth-child(1)').style.transform = 'rotate(45deg) translate(6px, 5px)';
            document.querySelector('.bar:nth-child(2)').style.opacity = '0';
            document.querySelector('.bar:nth-child(3)').style.transform = 'rotate(-45deg) translate(6px, -5px)';
            navLinks.style.display = 'flex';
            setTimeout(() => {
                navLinks.style.opacity = '1';
            }, 10);
        } else {
            document.querySelector('.bar:nth-child(1)').style.transform = 'rotate(0) translate(0)';
            document.querySelector('.bar:nth-child(2)').style.opacity = '1';
            document.querySelector('.bar:nth-child(3)').style.transform = 'rotate(0) translate(0)';
            navLinks.style.opacity = '0';
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 300);
        }
    });
}

// Sticky Header
const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
        
        if (lastScrollY > window.scrollY) {
            header.style.transform = 'translateY(0)';
        } else {
            header.style.transform = 'translateY(-100%)';
        }
    } else {
        header.classList.remove('sticky');
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = window.scrollY;
});

// Parallax Effect
const parallaxContainer = document.querySelector('.parallax-container');

if (parallaxContainer) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const containerOffset = parallaxContainer.offsetTop;
        const containerHeight = parallaxContainer.offsetHeight;
        
        if (scrollY >= containerOffset - window.innerHeight && scrollY <= containerOffset + containerHeight) {
            const parallaxY = (scrollY - containerOffset + window.innerHeight) * 0.1;
            parallaxContainer.style.backgroundPosition = `center ${parallaxY}px`;
        }
    });
}

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonials.length - 1;
        }
        showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
}

// Auto slide testimonials
let testimonialInterval;

function startTestimonialSlider() {
    testimonialInterval = setInterval(() => {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }, 5000);
}

function stopTestimonialSlider() {
    clearInterval(testimonialInterval);
}

if (testimonials.length > 0) {
    startTestimonialSlider();
    
    document.querySelector('.testimonials-slider').addEventListener('mouseenter', stopTestimonialSlider);
    document.querySelector('.testimonials-slider').addEventListener('mouseleave', startTestimonialSlider);
}

// Modal
const modal = document.getElementById('demo-modal');
const demoBtn = document.querySelector('a[href="#demo"]');
const closeModal = document.querySelector('.close-modal');

if (demoBtn && modal) {
    demoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Form Submission
const form = document.getElementById('signup-form');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const plan = document.getElementById('plan').value;
        
        if (!name || !email || !company || !plan) {
            alert('Please fill out all required fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        
        // Simulate API call
        setTimeout(() => {
            form.reset();
            submitBtn.textContent = 'Thank You!';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 3000);
        }, 1500);
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        if (this.getAttribute('href') === '#demo') return;
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.click();
            }
        }
    });
});

// Animation on Scroll with premium transitions
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .showcase-item, .pricing-card, .glass-container');
    
    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            // Stagger animation for sequential reveal
            setTimeout(() => {
                element.classList.add('animate');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add 3D tilt effect to cards
const addTiltEffect = () => {
    const tiltElements = document.querySelectorAll('.glass-card, .showcase-item');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const rotateX = (0.5 - yPercent) * 10; // -5 to 5 degrees
            const rotateY = (xPercent - 0.5) * 10; // -5 to 5 degrees
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
            
            // Dynamic light reflection effect
            const shine = element.querySelector('.shine') || document.createElement('div');
            if (!element.querySelector('.shine')) {
                shine.classList.add('shine');
                shine.style.position = 'absolute';
                shine.style.top = '0';
                shine.style.left = '0';
                shine.style.right = '0';
                shine.style.bottom = '0';
                shine.style.background = 'radial-gradient(circle at ' + (xPercent * 100) + '% ' + (yPercent * 100) + '%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)';
                shine.style.borderRadius = 'inherit';
                shine.style.pointerEvents = 'none';
                element.appendChild(shine);
            } else {
                shine.style.background = 'radial-gradient(circle at ' + (xPercent * 100) + '% ' + (yPercent * 100) + '%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
            const shine = element.querySelector('.shine');
            if (shine) shine.style.opacity = '0';
            setTimeout(() => {
                if (shine && shine.parentNode === element) {
                    element.removeChild(shine);
                }
            }, 300);
        });
    });
};

window.addEventListener('load', addTiltEffect);

// Floating Elements Animation
const floatingElements = document.querySelectorAll('.float-element');

if (floatingElements.length > 0) {
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingElements.forEach(element => {
            const offsetX = (mouseX - 0.5) * -40;
            const offsetY = (mouseY - 0.5) * -40;
            element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
}

// Video placeholder click
const videoPlaceholder = document.querySelector('.video-placeholder');

if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        const videoContainer = videoPlaceholder.parentElement;
        videoPlaceholder.style.display = 'none';
        
        const video = document.createElement('video');
        video.src = 'https://www.w3schools.com/html/mov_bbb.mp4'; // Placeholder video
        video.controls = true;
        video.autoplay = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.borderRadius = '12px';
        
        videoContainer.appendChild(video);
    });
}

// Intersection Observer for animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
};

window.addEventListener('load', observeElements);

// Add glass effect animation
document.querySelectorAll('.glass-card, .glass-container').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        element.style.setProperty('--x-position', x + '%');
        element.style.setProperty('--y-position', y + '%');
        element.classList.add('glass-hover');
    });
    
    element.addEventListener('mouseleave', () => {
        element.classList.remove('glass-hover');
    });
});

// Add CSS variable to the root to change colors
function initColorChangeEffect() {
    let hue = 260; // Start with purple hue
    
    function updateColorTheme() {
        hue = (hue + 0.1) % 360;
        document.documentElement.style.setProperty('--primary', `hsl(${hue}, 100%, 50%)`);
        document.documentElement.style.setProperty('--secondary', `hsl(${(hue + 60) % 360}, 100%, 50%)`);
        document.documentElement.style.setProperty('--accent', `hsl(${(hue + 180) % 360}, 100%, 50%)`);
        
        requestAnimationFrame(updateColorTheme);
    }
    
    // Uncomment to activate color shifting effect
    // updateColorTheme();
}

// Initialize Page Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('animate');
        }, 300);
    }
});

// Optional: Add loading animation
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading-screen';
loadingScreen.innerHTML = `
    <div class="loading-animation">
        <div class="pulse"></div>
        <div class="logo">NEXUS</div>
    </div>
`;

document.body.appendChild(loadingScreen);

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// Add this to the CSS in the style tag to support the loading screen and premium effects
document.head.insertAdjacentHTML('beforeend', `
<style>
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-darker);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}

.loading-animation {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pulse {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulse 2s infinite;
    position: absolute;
}

@keyframes pulse {
    0% {
        transform: scale(0.8);
        opacity: 1;
    }
    100% {
        transform: scale(1.5);
        opacity: 0;
    }
}

.glass-hover {
    position: relative;
}

.glass-hover::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at var(--x-position) var(--y-position), 
                rgba(255, 255, 255, 0.15) 0%, 
                transparent 50%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: inherit;
    z-index: 1;
}

.glass-hover:hover::after {
    opacity: 1;
}

section {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
}

section.in-view {
    opacity: 1;
    transform: translateY(0);
}

/* Premium effects */
.feature-card, .showcase-item, .pricing-card, .glass-container {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.feature-card.animate, .showcase-item.animate, .pricing-card.animate, .glass-container.animate {
    opacity: 1;
    transform: translateY(0);
}

/* Shiny edges effect */
.glass-card::after, .glass-container::after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
    z-index: -1;
    border-radius: inherit;
    transition: all 2s linear;
    background-size: 200% 200%;
    background-position: 0% 0%;
    pointer-events: none;
}

.glass-card:hover::after, .glass-container:hover::after {
    background-position: 100% 100%;
}

/* Shine effect for 3D tilt */
.shine {
    opacity: 0.8;
    transition: opacity 0.3s ease;
    z-index: 2;
}

/* Pricing card hover effects */
.pricing-card {
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.5s ease;
}

.pricing-card:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), var(--premium-glow);
}

.pricing-card.featured:hover {
    transform: translateY(-10px) scale(1.08);
}

/* Animated gradient for borders */
.border-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border-radius: inherit;
    z-index: -1;
    background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent), var(--primary));
    background-size: 400% 400%;
    animation: borderGlow 3s linear infinite;
    filter: blur(10px);
    opacity: 0.5;
}

@keyframes borderGlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
</style>
`);
