// Debug helper
function debug(selector, message) {
    const elements = document.querySelectorAll(selector);
    console.log(`${message}: Found ${elements.length} elements for "${selector}"`);
}

// Wait for DOM content to be fully loaded
window.addEventListener('load', function() {
    
    // Debug checks
    debug('.toggle-btn', 'Pricing toggles');
    debug('.dot', 'Hero dots');
    debug('.price .amount', 'Price amounts');
    
    // 1. Pricing Toggle using event delegation
    document.querySelector('.pricing-toggle').addEventListener('click', (e) => {
        if (e.target.classList.contains('toggle-btn')) {
            // Remove active from all buttons
            document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
            
            // Add active to clicked button
            e.target.classList.add('active');
            
            // Update prices based on billing period
            const isYearly = e.target.textContent.includes('Yearly');
            const prices = isYearly ? ['$0', '$499', '$999'] : ['$0', '$49', '$99'];
            
            // Update price amounts
            document.querySelectorAll('.price .amount').forEach((el, index) => {
                el.textContent = prices[index];
            });

            // Update billing text
            document.querySelectorAll('.billing-info').forEach(info => {
                info.textContent = `Billed ${isYearly ? 'Yearly' : 'Monthly'}`;
            });
        }
    });

    // FAQ toggle functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.parentElement;
            const wasActive = currentItem.classList.contains('active');
    
            // Remove active class and reset icons on all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const icon = item.querySelector('.faq-question i');
                if (icon) {
                    icon.classList.replace("ri-subtract-line", "ri-add-line");
                }
            });
    
            // If the clicked item wasn't active, activate it and update its icon
            if (!wasActive) {
                currentItem.classList.add('active');
                const icon = currentItem.querySelector('.faq-question i');
                if (icon) {
                    icon.classList.replace("ri-add-line", "ri-subtract-line");
                }
            }
        });
    });
    
    // 2. Hero Dots using event delegation
    const dotsContainer = document.querySelector('.dot-indicators');
    if (dotsContainer) {
        const dots = [...document.querySelectorAll('.dot')];
        const carouselText = document.querySelector('.carousel-text');
        const texts = [
            '<span class="hero-highlight">Reason, Memory, and Will</span> - The foundation of a strong mind.',
            '<span class="hero-highlight">AI-Powered Guidance</span> - Your personal coach available 24/7.',
            '<span class="hero-highlight">Daily Progress</span> - Track your growth journey.',
            '<span class="hero-highlight">Mental Clarity</span> - Achieve peace of mind.'
        ];

        let currentDot = 0;

        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentDot);
                if (index === currentDot && carouselText) {
                    carouselText.innerHTML = texts[index];
                }
            });
        }

        // Click handler
        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                currentDot = dots.indexOf(e.target);
                updateDots();
            }
        });

        // Auto rotate
        setInterval(() => {
            currentDot = (currentDot + 1) % dots.length;
            updateDots();
        }, 3000);
    }
});

// Pricing toggle functionality
function initPricingToggle() {
    const monthlyRadio = document.getElementById('monthly');
    const yearlyRadio = document.getElementById('yearly');
    const amounts = document.querySelectorAll('.amount');
    const billingInfos = document.querySelectorAll('.billing-info');

    // Store prices for both billing periods
    const monthlyPrices = ['0', '49', '99'];
    const yearlyPrices = ['0', '499', '999'];

    function updatePrices(isYearly) {
        amounts.forEach((amount, index) => {
            amount.textContent = `$${isYearly ? yearlyPrices[index] : monthlyPrices[index]}`;
            billingInfos[index].textContent = `Billed ${isYearly ? 'Yearly' : 'Monthly'}`;
        });
    }

    monthlyRadio.addEventListener('change', () => updatePrices(false));
    yearlyRadio.addEventListener('change', () => updatePrices(true));
}

// Class to handle testimonials carousel
class TestimonialsCarousel {
    constructor() {
        this.currentIndex = 0;
        this.testimonials = document.querySelectorAll('.testimonial');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevButton = document.querySelector('.prev-button');
        this.nextButton = document.querySelector('.next-button');
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        // Show the first testimonial
        this.showTestimonial(this.currentIndex);

        // Event listeners for navigation buttons
        this.prevButton.addEventListener('click', () => this.prevTestimonial());
        this.nextButton.addEventListener('click', () => this.nextTestimonial());

        // Event listeners for indicators
        this.indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const index = parseInt(indicator.dataset.index, 10);
                this.showTestimonial(index);
            });
        });

        // Start auto-rotation
        this.startAutoPlay();
    }

    showTestimonial(index) {
        // Hide all testimonials
        this.testimonials.forEach(t => t.classList.remove('active'));
        // Remove active state from all indicators
        this.indicators.forEach(i => i.classList.remove('active'));

        // Show the requested testimonial
        this.testimonials[index].classList.add('active');
        this.indicators[index].classList.add('active');

        this.currentIndex = index;
    }

    nextTestimonial() {
        let nextIndex = this.currentIndex + 1;
        if (nextIndex >= this.testimonials.length) {
            nextIndex = 0;
        }
        this.showTestimonial(nextIndex);
    }

    prevTestimonial() {
        let prevIndex = this.currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = this.testimonials.length - 1;
        }
        this.showTestimonial(prevIndex);
    }

    startAutoPlay() {
        // Rotate to the next testimonial every 7 seconds
        this.autoPlayInterval = setInterval(() => {
            this.nextTestimonial();
        }, 7000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

function updateTestimonials(newIndex) {
    testimonials.forEach((testimonial, index) => {
        testimonial.classList.remove('active', 'previous');
        
        if (index === currentIndex) {
            testimonial.classList.add('previous');
            setTimeout(() => testimonial.classList.remove('previous'), 600);
        } else if (index === newIndex) {
            setTimeout(() => testimonial.classList.add('active'), 50);
        }
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === newIndex);
    });

    currentIndex = newIndex;
}

document.addEventListener('DOMContentLoaded', () => {
    
    new TestimonialsCarousel();
});

document.addEventListener('DOMContentLoaded', function() {
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking anywhere outside the menu
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !menuButton.contains(e.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});


