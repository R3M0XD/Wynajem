// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize global variables
    let currentLang = 'pl';
    let isScrolling = false;

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });

    // Initialize Particles.js for hero section
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#d4af37"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#d4af37",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        
        if (preloader) {
            // Add fancy transition effect before hiding
            gsapFadeOut(preloader);
            
            setTimeout(function() {
                preloader.style.display = 'none';
                
                // Trigger hero animations once preloader is gone
                animateHeroElements();
            }, 1000);
        }
    });

    // Animate Hero Elements with sequence
    function animateHeroElements() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroBtn = document.querySelector('.hero-btn');
        const scrollDown = document.querySelector('.scroll-down');
        
        // Reset any existing animations
        [heroTitle, heroSubtitle, heroBtn, scrollDown].forEach(el => {
            if (el) {
                el.style.opacity = "0";
                el.style.animation = "none";
            }
        });
        
        // Trigger new animation sequence
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.animation = "fade-in 1s forwards";
            }
            
            setTimeout(() => {
                if (heroSubtitle) {
                    heroSubtitle.style.animation = "fade-in 1s forwards";
                }
                
                setTimeout(() => {
                    if (heroBtn) {
                        heroBtn.style.animation = "fade-in 1s forwards";
                    }
                    
                    setTimeout(() => {
                        if (scrollDown) {
                            scrollDown.style.opacity = "1";
                        }
                    }, 500);
                }, 400);
            }, 400);
        }, 200);
    }

    // GSAP Fade Out Animation
    function gsapFadeOut(element) {
        // Simple opacity animation
        element.style.opacity = 1;
        let opacity = 1;
        const fadeEffect = setInterval(() => {
            if (opacity > 0) {
                opacity -= 0.05;
                element.style.opacity = opacity;
            } else {
                clearInterval(fadeEffect);
                element.classList.add('hidden');
            }
        }, 20);
    }

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    const headerHeight = document.querySelector('header')?.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    function handleScroll() {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
        
        // Parallax effect for background images
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
        }
        
        // Show or hide scroll-to-top button
        const scrollTopBtn = document.getElementById('scroll-top');
        if (scrollTopBtn) {
            if (window.scrollY > headerHeight) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        }
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            
            if (menu.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
        
        // Close mobile menu when clicking a menu item
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                menu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = ''; // Restore scrolling
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Calculate offset based on navbar height
                const navHeight = nav?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navHeight;
                
                // Smooth scroll animation
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonials Slider with custom animations
    initTestimonialsSlider();
    
    function initTestimonialsSlider() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dot');
        const prev = document.querySelector('.testimonial-prev');
        const next = document.querySelector('.testimonial-next');
        let currentSlide = 0;
        let slideInterval;
        
        function showSlide(n) {
            // Hide all slides first
            slides.forEach(slide => {
                slide.style.display = 'none';
                slide.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Calculate the index
            currentSlide = (n + slides.length) % slides.length;
            
            // Show current slide with animation
            slides[currentSlide].style.display = 'block';
            setTimeout(() => {
                slides[currentSlide].classList.add('active');
            }, 50);
            
            // Add active class to current dot
            dots[currentSlide].classList.add('active');
        }
        
        // Initialize the slider
        if (slides.length > 0) {
            showSlide(0);
            
            // Add event listeners to navigation buttons
            if (prev && next) {
                prev.addEventListener('click', () => {
                    resetAutoSlide();
                    showSlide(currentSlide - 1);
                });
                
                next.addEventListener('click', () => {
                    resetAutoSlide();
                    showSlide(currentSlide + 1);
                });
            }
            
            // Add event listeners to dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    resetAutoSlide();
                    showSlide(index);
                });
            });
            
            // Auto-advance slides
            startAutoSlide();
            
            // Pause auto-slide on hover
            const sliderContainer = document.querySelector('.testimonials-container');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', () => {
                    clearInterval(slideInterval);
                });
                
                sliderContainer.addEventListener('mouseleave', () => {
                    startAutoSlide();
                });
            }
        }
        
        function startAutoSlide() {
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        }
        
        function resetAutoSlide() {
            clearInterval(slideInterval);
            startAutoSlide();
        }
    }

    // Pricing Calculator with animations
    initPricingCalculator();

    function initPricingCalculator() {
        const carSelect = document.getElementById('car-select');
        const calculateBtn = document.getElementById('calculate-btn');
        const priceResult = document.querySelector('.price-result');
        const priceAmount = document.querySelector('.price-amount');
    
        // Car selection from offer section
        const carButtons = document.querySelectorAll('.car-btn');
    
        if (carButtons.length > 0) {
            carButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const category = this.getAttribute('data-category').toLowerCase();
    
                    if (carSelect && carSelect.options) {
                        for (let i = 0; i < carSelect.options.length; i++) {
                            if (carSelect.options[i].value.toLowerCase() === category) {
                                carSelect.selectedIndex = i;
    
                                const pricingSection = document.querySelector('.pricing-container');
                                if (pricingSection) {
                                    pricingSection.classList.add('shimmer-effect');
                                    setTimeout(() => {
                                        pricingSection.classList.remove('shimmer-effect');
                                    }, 3000);
                                }
    
                                break;
                            }
                        }
                    }
                });
            });
        }
    
        if (calculateBtn && priceResult && priceAmount) {
            calculateBtn.addEventListener('click', function () {
                const selectedCategory = carSelect?.value?.toLowerCase();
    
                if (!selectedCategory) {
                    showToast(currentLang === 'pl' ? 'Proszę wybrać kategorię pojazdu' : 'Please select a car category');
                    return;
                }
    
                let baseCost;
                switch (selectedCategory) {
                    case 'standard':
                        baseCost = 1.2;
                        break;
                    case 'premium':
                        baseCost = 1.7;
                        break;
                    case 'bus do 9 osób':
                        baseCost = 2.5;
                        break;
                    case 'v-class vip':
                        baseCost = 3.5;
                        break;
                    default:
                        baseCost = 1.2;
                }
    
                priceResult.classList.add('active');
    
                let currentCost = 0.0;
                const duration = 800; // Shorter animation for small values
                const steps = 100;
                const increment = baseCost / steps;
                const stepTime = duration / steps;
                let step = 0;
    
                const countInterval = setInterval(() => {
                    currentCost = Math.min((increment * step).toFixed(2), baseCost);
                    priceAmount.textContent = parseFloat(currentCost).toLocaleString('pl-PL', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }) + ' PLN/km';
    
                    step++;
                    if (currentCost >= baseCost) {
                        clearInterval(countInterval);
                        priceAmount.textContent = baseCost.toLocaleString('pl-PL', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }) + ' PLN/km';
                    }
                }, stepTime);
            });
        }
    }
    


    // Contact Form Validation with animations
    initContactForm();
    
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const sendButton = document.getElementById('send-message');
        
        if (sendButton) {
            sendButton.addEventListener('click', function() {
                // Reset previous error states
                [nameInput, phoneInput, emailInput, messageInput].forEach(input => {
                    if (input) {
                        input.style.borderColor = '';
                    }
                });
                
                // Simple validation
                let hasError = false;
                
                if (!nameInput?.value) {
                    animateErrorField(nameInput);
                    hasError = true;
                }
                
                if (!emailInput?.value) {
                    animateErrorField(emailInput);
                    hasError = true;
                }
                
                if (!messageInput?.value) {
                    animateErrorField(messageInput);
                    hasError = true;
                }
                
                if (hasError) {
                    showToast(currentLang === 'pl' ? 'Proszę wypełnić wszystkie pola' : 'Please fill in all fields');
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailInput && !emailRegex.test(emailInput.value)) {
                    animateErrorField(emailInput);
                    showToast(currentLang === 'pl' ? 'Proszę podać prawidłowy adres email' : 'Please enter a valid email address');
                    return;
                }
                
                // Phone validation
                const phone = document.getElementById("phone").value;
                // Telefon nie jest wymagany, więc nie sprawdzamy jego zawartości
                
                
                // Simulate form submission with loading animation
                if (sendButton) {
                    sendButton.disabled = true;
                    
                    // Create and add a loading spinner
                    sendButton.innerHTML = `
                        <span class="spinner"></span>
                        <span>${currentLang === 'pl' ? 'Wysyłanie...' : 'Sending...'}</span>
                    `;
                    
                    setTimeout(() => {
                        // Reset form with fade-out effect
                        if (nameInput) fadeOutAndReset(nameInput);
                        if (phoneInput) fadeOutAndReset(phoneInput);
                        if (emailInput) fadeOutAndReset(emailInput);
                        if (messageInput) fadeOutAndReset(messageInput);
                        
                        // Success animation for button
                        if (sendButton) {
                            sendButton.innerHTML = `
                                <span>${currentLang === 'pl' ? 'Wysłano!' : 'Sent!'}</span>
                                <i class="fas fa-check"></i>
                            `;
                            sendButton.style.backgroundColor = '#28a745';
                            
                            setTimeout(() => {
                                // Reset button
                                sendButton.innerHTML = `
                                    <span>${currentLang === 'pl' ? 'Wyślij zapytanie' : 'Send inquiry'}</span>
                                    <i class="fas fa-paper-plane"></i>
                                `;
                                sendButton.style.backgroundColor = '';
                                sendButton.disabled = false;
                            }, 2000);
                        }
                        
                        // Show success message
                        showToast(currentLang === 'pl' ? 'Wiadomość została wysłana! Skontaktujemy się wkrótce.' : 'Message sent! We will contact you soon.');
                    }, 1500);
                }
            });
        }
        
        // Form field animation helpers
        function animateErrorField(field) {
            if (!field) return;
            
            field.style.borderColor = '#ff3e3e';
            
            // Shake animation
            let currentPos = 0;
            const interval = setInterval(() => {
                if (currentPos === 0) {
                    field.style.transform = 'translateX(5px)';
                    currentPos = 1;
                } else if (currentPos === 1) {
                    field.style.transform = 'translateX(-5px)';
                    currentPos = 2;
                } else if (currentPos === 2) {
                    field.style.transform = 'translateX(5px)';
                    currentPos = 3;
                } else {
                    field.style.transform = 'translateX(0)';
                    clearInterval(interval);
                }
            }, 50);
        }
        
        function fadeOutAndReset(field) {
            if (!field) return;
            
            field.style.opacity = '0.5';
            setTimeout(() => {
                field.value = '';
                field.style.opacity = '1';
            }, 500);
        }
    }

    // Chat Window Toggle with animations
    initChatWindow();
    
    function initChatWindow() {
        const chatBubble = document.querySelector('.chat-bubble');
        const chatWindow = document.querySelector('.chat-window');
        const chatClose = document.querySelector('.chat-close');
        const chatInput = document.querySelector('.chat-input input');
        const chatSendBtn = document.querySelector('.chat-input button');
        const chatMessages = document.querySelector('.chat-messages');
        
        if (chatBubble && chatWindow) {
            // Pulse animation for chat bubble
            setInterval(() => {
                chatBubble.classList.add('pulse');
                setTimeout(() => {
                    chatBubble.classList.remove('pulse');
                }, 1000);
            }, 5000);
            
            chatBubble.addEventListener('click', function() {
                chatWindow.classList.add('active');
                
                // Focus on input after animation completes
                setTimeout(() => {
                    if (chatInput) chatInput.focus();
                }, 500);
            });
        }
        
        if (chatClose && chatWindow) {
            chatClose.addEventListener('click', function() {
                chatWindow.classList.remove('active');
            });
        }
        
        // Message sending functionality
        if (chatSendBtn && chatInput && chatMessages) {
            function sendChatMessage() {
                const message = chatInput.value.trim();
            
                if (message) {
                    // Add outgoing message
                    addChatMessage(message, true);
                    chatInput.value = '';
            
                    // Simulate typing indicator
                    const typingIndicator = document.createElement('div');
                    typingIndicator.classList.add('chat-message', 'incoming', 'typing-indicator');
                    typingIndicator.innerHTML = '<span>...</span>';
                    chatMessages.appendChild(typingIndicator);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
            
                    // Simulate response after a delay
                    setTimeout(() => {
                        chatMessages.removeChild(typingIndicator);
            
                        let response;
            
                        const lower = message.toLowerCase();
            
                        if (lower.includes('cena') || lower.includes('koszt') || lower.includes('price') || lower.includes('cost')) {
                            response = 'Ceny zaczynają się od 1,2 PLN/km. Wybierz kategorię w sekcji Cennik, aby zobaczyć szczegóły.';
                        } else if (lower.includes('rezerwacja') || lower.includes('booking') || lower.includes('reservation')) {
                            response = 'Aby zarezerwować samochód, prosimy o wypełnienie formularza lub kontakt telefoniczny.';
                        } else if (lower.includes('vip') || lower.includes('v-class')) {
                            response = 'V-Class VIP to luksusowy van z pełnym wyposażeniem — idealny na transfery lub eventy.';
                        } else if (lower.includes('lotnisko') || lower.includes('airport') || lower.includes('transfer')) {
                            response = 'Oferujemy transfery z i na lotnisko w pełnym komforcie i dyskrecji.';
                        } else if (lower.includes('czas') || lower.includes('godzin') || lower.includes('duration') || lower.includes('time')) {
                            response = 'Minimalny czas wynajmu to 2 godziny. Istnieje możliwość indywidualnych ustaleń.';
                        } else if (lower.includes('kierowca') || lower.includes('driver')) {
                            response = 'Każdy samochód jest wynajmowany z profesjonalnym, elegancko ubranym kierowcą.';
                        } else {
                            response = 'Dziękujemy za wiadomość! Jak mogę pomóc w sprawie wynajmu auta?';
                        }
            
                        addChatMessage(response, false);
                    }, 1500);
                }
            }
            
            
            chatSendBtn.addEventListener('click', sendChatMessage);
            
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendChatMessage();
                }
            });
        }
        
        // Add message to chat window with animation
        function addChatMessage(message, isOutgoing) {
            if (!chatMessages) return;
            
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message');
            messageElement.classList.add(isOutgoing ? 'outgoing' : 'incoming');
            
            const span = document.createElement('span');
            span.textContent = message;
            
            if (currentLang === 'en' && !isOutgoing) {
                span.setAttribute('data-pl', message);
                span.setAttribute('data-en', getEnglishTranslation(message));
                span.textContent = getEnglishTranslation(message);
            }
            
            messageElement.appendChild(span);
            chatMessages.appendChild(messageElement);
            
            // Scroll to new message
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Contact Bubbles hover effects
    const contactBubbles = document.querySelectorAll('.contact-bubble');
    
    contactBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            // Add 3D rotation effect
            bubble.style.transform = 'scale(1.1) rotateY(10deg)';
        });
        
        bubble.addEventListener('mouseleave', function() {
            bubble.style.transform = '';
        });
    });
    
    // Phone and WhatsApp functionality
    const phoneBubble = document.querySelector('.contact-bubble[title="Zadzwoń"]');
    const whatsappBubble = document.querySelector('.whatsapp-bubble');
    const telegramBubble = document.querySelector('.telegram-bubble');
    
    if (phoneBubble) {
        phoneBubble.addEventListener('click', function() {
            window.location.href = 'tel:+48731932666';
        });
    }
    
    if (whatsappBubble) {
        whatsappBubble.addEventListener('click', function() {
            window.open('https://wa.me/48731932666', '_blank');
        });
    }

    if (telegramBubble) {
        telegramBubble.addEventListener('click', function() {
            window.open('https://t.me/48731932666', '_blank');
        });
    }


    // Toast Message System
    function showToast(message) {
        const toast = document.querySelector('.toast');
        
        if (toast) {
            // Clear any existing timeout
            if (toast.timeoutId) {
                clearTimeout(toast.timeoutId);
            }
            
            toast.textContent = message;
            toast.classList.add('active');
            
            // Add sound effect (optional)
            // playNotificationSound();
            
            // Auto-hide after delay
            toast.timeoutId = setTimeout(() => {
                toast.classList.remove('active');
            }, 4000);
        }
    }

    // Language Switcher with animations
    initLanguageSwitcher();
    
    function initLanguageSwitcher() {
        const languageOptions = document.querySelectorAll('.language-option');
        
        languageOptions.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                switchLanguage(lang);
            });
        });
    }
    
function switchLanguage(lang) {
    if (lang === currentLang) return;

    // Jeśli wracamy do polskiego, odświeżamy stronę, aby przywrócić oryginalny wygląd
    if (lang === "pl") {
        localStorage.setItem('selectedLang', 'pl');
        location.reload();
        return;
    }

    // Zapisujemy aktualny język
    currentLang = lang;
    localStorage.setItem('selectedLang', lang);

    // Aktualizacja flagi
    updateDropdownButton(lang);

    // Aktualizacja aktywnego języka w menu
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-lang') === lang);
    });

    document.querySelectorAll("input[placeholder][data-pl][data-en], textarea[placeholder][data-pl][data-en]").forEach(el => {
        el.placeholder = lang === "pl" ? el.getAttribute("data-pl") : el.getAttribute("data-en");
    });    

    // Przechodzimy przez elementy do tłumaczenia
    document.querySelectorAll("[data-pl][data-en]").forEach((element) => {
        const translation = lang === "pl" ? element.getAttribute("data-pl") : element.getAttribute("data-en");

        // Jeśli element ma dzieci (np. <span>, <strong>), zamieniamy tylko węzły tekstowe
        element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
                node.textContent = translation; 
            }
        });

        // Jeśli element nie ma dzieci (czysty tekst), nadpisujemy jego zawartość
        if (!element.children.length) {
            element.textContent = translation;
        }
    });
}

function updateDropdownButton(lang) {
    const dropdown = document.querySelector('.dropdown-btn');
    if (dropdown) {
        dropdown.innerHTML = lang === 'pl' ? '🇵🇱' : '🇬🇧';
    }
}

// Ustawienie domyślnej flagi na 🇵🇱 i języka na starcie
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem('selectedLang') || 'pl';
    updateDropdownButton(savedLang);
    switchLanguage(savedLang);
});

    
    function updateDropdownButton(lang) {
        const dropdown = document.querySelector('.dropdown-btn');
        if (dropdown) {
            dropdown.innerHTML = lang === 'pl' ? '🇵🇱' : '🇬🇧';
        }
    }
    
    // ✅ Ustawienie domyślnej flagi na 🇵🇱 przy starcie strony
    document.addEventListener("DOMContentLoaded", () => {
        const savedLang = localStorage.getItem('selectedLang') || 'pl';
        updateDropdownButton(savedLang); // Ustawiamy flagę na starcie
        switchLanguage(savedLang);
    });
    
    
    function updateDropdownButton(lang) {
        const dropdown = document.querySelector('.dropdown-btn');
        if (dropdown) {
            dropdown.innerHTML = lang === 'pl' ? '🇵🇱' : '🇬🇧';
        }
    }
    
    // Ustawienie domyślnego języka na polski po załadowaniu strony
    document.addEventListener("DOMContentLoaded", () => {
        const savedLang = localStorage.getItem('selectedLang') || 'pl';
        switchLanguage(savedLang);
    });
    
    document.addEventListener("DOMContentLoaded", function () {
    let categorySelect = document.querySelector("#kategoria");
    let carSelect = document.querySelector("#model");

    // Usunięcie walidacji numeru telefonu
    let form = document.querySelector("#contact");
    if (form) {
        form.addEventListener("submit", function () {
            let phoneInput = document.querySelector("#telefon");
            if (phoneInput) {
                phoneInput.removeAttribute("required");
            }
        });
    }
});

// Pobieramy wszystkie linki (przyciski) z klasy 'car-btn'
const carBtns = document.querySelectorAll('.car-btn');

// Pobieramy formularz oraz rozwijane listy
const categorySelect = document.getElementById('car-category');
const modelSelect = document.getElementById('car-model');

// Dane o samochodach - modele przypisane do kategorii
const carsData = {
    "Premium": ["Mercedes S-Class", "BMW 7 Series", "Audi A8"],
    "Standard": ["Volkswagen Passat", "Opel Insignia", "Ford Mondeo"],
    "V-Class VIP": ["Mercedes V-Class"],
    "Bus do 9 osób": ["Ford Tourneo", "Renault Trafic", "Toyota PROACE Verso"]
};

// Funkcja, która aktualizuje dostępne modele w zależności od wybranej kategorii
function updateCarModels() {
    const selectedCategory = categorySelect.value;
    const availableModels = carsData[selectedCategory] || [];

    // Usuwamy wszystkie istniejące opcje w selekcie modelu
    modelSelect.innerHTML = '';

    // Tworzymy nowe opcje na podstawie dostępnych modeli
    availableModels.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });
}

// Funkcja, która ustawia formularz na podstawie klikniętego przycisku
carBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Zatrzymujemy domyślną akcję (czyli przeładowanie strony po kliknięciu linku)
        e.preventDefault();

        // Pobieramy kategorię i model z atrybutów data
        const category = btn.getAttribute('data-category');
        const car = btn.getAttribute('data-car');

        // Ustawiamy odpowiednią kategorię w selekcie
        categorySelect.value = category;

        // Zaktualizujemy dostępne modele po wyborze kategorii
        updateCarModels();

        // Ustawiamy wybrany model samochodu w formularzu
        modelSelect.value = car;
    });
});

// Nasłuchujemy na zmianę kategorii, aby dynamicznie zmieniać dostępne modele
categorySelect.addEventListener('change', updateCarModels);

// Ustawiamy początkowy stan formularza po załadowaniu strony
updateCarModels();

    
    
    // English translations for chat messages
    function getEnglishTranslation(polishText) {
        const translations = {
            'Witaj! W czym mogę pomóc?': 'Hi! How can I assist you with car rental?',
            'Ceny zaczynają się od 1,2 PLN/km. Wybierz kategorię w sekcji Cennik, aby zobaczyć szczegóły.': 'Prices start at 1.2 PLN/km. Select a category in the Pricing section to see details.',
            'Aby zarezerwować samochód, prosimy o wypełnienie formularza kontaktowego lub kontakt telefoniczny.': 'To book a car, please fill out the contact form or call us.',
            'Każdy samochód jest wynajmowany z profesjonalnym, elegancko ubranym kierowcą.': 'Each car comes with a professional, elegantly dressed chauffeur.',
            'V-Class VIP to luksusowy van z pełnym wyposażeniem — idealny na transfery lub eventy.': 'V-Class VIP is a luxury van with full amenities — ideal for transfers or events.',
            'Oferujemy transfery z i na lotnisko w pełnym komforcie i dyskrecji.': 'We offer transfers to and from the airport in full comfort and discretion.',
            'Dziękujemy za wiadomość! Jak mogę pomóc w sprawie wynajmu auta?': 'Thank you for your message! How can I assist you with your car rental?',
        };
    
        return translations[polishText] || polishText;
    }
    
    // Add dynamic hover effects to buttons and cards
    addDynamicHoverEffects();
    
    function addDynamicHoverEffects() {
        // Hero button 3D effect
        const heroBtn = document.querySelector('.hero-btn');
        if (heroBtn) {
            heroBtn.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                const rotateY = (x - 0.5) * 10;
                const rotateX = (0.5 - y) * 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            heroBtn.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        }
        
        // Car cards magnifying effect
        const carCards = document.querySelectorAll('.car-card');
        carCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const cardRect = this.getBoundingClientRect();
                const x = (e.clientX - cardRect.left) / cardRect.width - 0.5;
                const y = (e.clientY - cardRect.top) / cardRect.height - 0.5;
                
                const image = this.querySelector('.car-image img');
                if (image) {
                    image.style.transform = `scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const image = this.querySelector('.car-image img');
                if (image) {
                    image.style.transform = '';
                }
            });
        });
    }

    // Add custom scrollbar behavior
    customScrollbarBehavior();
    
    function customScrollbarBehavior() {
        // Highlight scrollbar on scroll
        window.addEventListener('scroll', function() {
            document.documentElement.classList.add('scrolling');
            
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }
            
            this.scrollTimeout = setTimeout(function() {
                document.documentElement.classList.remove('scrolling');
            }, 1000);
        });
    }

    // Add intersection observer for enhanced animations
    setupIntersectionObserver();
    
    function setupIntersectionObserver() {
        const sections = document.querySelectorAll('section');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Trigger section-specific animations
                    if (entry.target.id === 'about') {
                        const features = entry.target.querySelectorAll('.feature');
                        features.forEach((feature, index) => {
                            setTimeout(() => {
                                feature.classList.add('animated');
                            }, index * 200);
                        });
                    }
                    
                    if (entry.target.id === 'offers') {
                        const cards = entry.target.querySelectorAll('.car-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animated');
                            }, index * 150);
                        });
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Initialize any custom components or plugins
    initCustomComponents();
    
    function initCustomComponents() {
        // Example: Add scroll to top button dynamically
        const scrollTopBtn = document.createElement('div');
        scrollTopBtn.id = 'scroll-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollTopBtn.style.position = 'fixed';
        scrollTopBtn.style.bottom = '90px';
        scrollTopBtn.style.right = '20px';
        scrollTopBtn.style.width = '50px';
        scrollTopBtn.style.height = '50px';
        scrollTopBtn.style.backgroundColor = 'var(--gold)';
        scrollTopBtn.style.borderRadius = '50%';
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.justifyContent = 'center';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.color = 'var(--black)';
        scrollTopBtn.style.cursor = 'pointer';
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'translateY(20px)';
        scrollTopBtn.style.transition = 'all 0.3s';
        scrollTopBtn.style.zIndex = '90';
        scrollTopBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        
        document.body.appendChild(scrollTopBtn);
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add typed effect to hero title (if loaded)
    if (typeof Typed !== 'undefined') {
        const heroTitleElement = document.querySelector('.hero-title');
        
        if (heroTitleElement) {
            // Store original content
            const originalContent = heroTitleElement.innerHTML;
            
            // Set empty content for typing effect
            heroTitleElement.innerHTML = '';
            
            // Create typed instance
            new Typed(heroTitleElement, {
                strings: [originalContent],
                typeSpeed: 50,
                backSpeed: 0,
                loop: false,
                showCursor: false,
                onComplete: function() {
                    // Animation for subtitle after typing completes
                    const subtitle = document.querySelector('.hero-subtitle');
                    if (subtitle) {
                        subtitle.style.opacity = '1';
                        subtitle.style.transform = 'translateY(0)';
                    }
                }
            });
        }
    }
});