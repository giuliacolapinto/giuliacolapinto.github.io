document.addEventListener("DOMContentLoaded", () => {
    // Reveal Animations using Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    const delay = 100; // Staggered delay for elements

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * delay); // Staggering effect
                // Unobserve so it only happens once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            
            // Hamburger animation
            const spans = menuToggle.querySelectorAll('span');
            if(navLinks.classList.contains('mobile-active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Backup reveal for hidden elements
    setTimeout(() => {
        const stillHidden = document.querySelectorAll('.reveal:not(.active)');
        stillHidden.forEach(el => el.classList.add('active'));
    }, 1500);
});
