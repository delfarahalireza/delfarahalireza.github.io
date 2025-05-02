document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference or use default dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
    }

    // Add theme toggle to the navigation
    const navList = document.querySelector('.nav-links');
    const themeToggle = document.createElement('li');
    themeToggle.innerHTML = `<a href="#" id="theme-toggle"><i class="fas fa-${savedTheme === 'light' ? 'moon' : 'sun'}"></i> ${savedTheme === 'light' ? 'Dark' : 'Light'} Mode</a>`;
    navList.appendChild(themeToggle);

    // Toggle theme when the button is clicked
    document.getElementById('theme-toggle').addEventListener('click', (e) => {
        e.preventDefault();
        const isLightMode = document.documentElement.classList.toggle('light-mode');
        
        // Update the toggle text and icon
        const toggleText = isLightMode ? 'Dark Mode' : 'Light Mode';
        const toggleIcon = isLightMode ? 'moon' : 'sun';
        e.target.innerHTML = `<i class="fas fa-${toggleIcon}"></i> ${toggleText}`;
        
        // Save theme preference
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });

    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('nav-active');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger animation
        burger.classList.toggle('toggle');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server here
            // For now, we'll just show an alert
            alert('Thank you for your message! This is a demo form, so no message was actually sent.');
            contactForm.reset();
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            header.style.padding = '0.7rem 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            header.style.padding = '1.5rem 0';
        }
    });
});