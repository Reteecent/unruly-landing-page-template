document.addEventListener('DOMContentLoaded', function() {
            // Mobile Navigation
            const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
            const primaryNav = document.querySelector('.primary-navigation');
            
            // Toggle mobile menu
            function toggleMenu() {
                const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
                mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
                primaryNav.setAttribute('data-visible', !isExpanded);
                
                // Toggle body scroll when menu is open
                document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
            }
            
            // Close menu when clicking outside
            function closeMenuOnClickOutside(e) {
                if (primaryNav.getAttribute('data-visible') === 'true' &&
                    !primaryNav.contains(e.target)) {
                        toggleMenu();
                    }
                }
                
                // Event listeners
                mobileNavToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleMenu();
                });
                
                document.addEventListener('click', closeMenuOnClickOutside);
                
                // Close menu when clicking nav links
                document.querySelectorAll('.primary-navigation a').forEach(link => {
                    link.addEventListener('click', toggleMenu);
                });
                
                // Testimonial Carousel
                const testimonials = document.querySelectorAll('.testimonial');
                const dots = document.querySelectorAll('.dot');
                const prevBtn = document.querySelector('.carousel-prev');
                const nextBtn = document.querySelector('.carousel-next');
                let currentIndex = 0;
                let carouselInterval;
                
                function showTestimonial(index) {
                    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
                    dots.forEach(dot => dot.classList.remove('active'));
                    
                    testimonials[index].classList.add('active');
                    dots[index].classList.add('active');
                    currentIndex = index;
                    
                    // Reset auto-rotation timer
                    resetCarouselInterval();
                }
                
                function nextTestimonial() {
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    showTestimonial(currentIndex);
                }
                
                function prevTestimonial() {
                    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                    showTestimonial(currentIndex);
                }
                
                function resetCarouselInterval() {
                    clearInterval(carouselInterval);
                    carouselInterval = setInterval(nextTestimonial, 5000);
                }
                
                // Dot controls
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => showTestimonial(index));
                });
                
                // Button controls
                prevBtn.addEventListener('click', prevTestimonial);
                nextBtn.addEventListener('click', nextTestimonial);
                
                // Pause on hover
                const carouselContainer = document.querySelector('.testimonial-carousel');
                carouselContainer.addEventListener('mouseenter', () => clearInterval(carouselInterval));
                carouselContainer.addEventListener('mouseleave', resetCarouselInterval);
                
                // Start auto-rotation
                resetCarouselInterval();
                
                // Active Navigation Highlighting
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('.primary-navigation a[href^="#"]');
                
                function setActiveNavLink() {
                    let currentSection = '';
                    const scrollPosition = window.scrollY + 200;
                    
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.clientHeight;
                        
                        if (scrollPosition >= sectionTop &&
                            scrollPosition < sectionTop + sectionHeight) {
                            currentSection = section.getAttribute('id');
                        }
                    });
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentSection}`) {
                            link.classList.add('active');
                        }
                    });
                }
                
                window.addEventListener('scroll', setActiveNavLink);
                setActiveNavLink();
                
                // Smooth Scrolling
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function(e) {
                        e.preventDefault();
                        const targetId = this.getAttribute('href');
                        if (targetId === '#') return;
                        
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            const headerHeight = document.querySelector('.header').offsetHeight;
                            const targetPosition = targetElement.getBoundingClientRect().top +
                                window.pageYOffset - headerHeight;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    });
                });
                
                // Scroll Animations
                function animateOnScroll() {
                    const elements = document.querySelectorAll('.feature-card, .step, .pricing-card');
                    const windowHeight = window.innerHeight;
                    
                    elements.forEach(element => {
                        const elementPosition = element.getBoundingClientRect().top;
                        
                        if (elementPosition < windowHeight - 100) {
                            element.classList.add('fade-in-up');
                        }
                    });
                }
                
                window.addEventListener('scroll', animateOnScroll);
                animateOnScroll();
            });