document.addEventListener("DOMContentLoaded", () => {

  // ── Intersection Observer for all reveal variants ──
  const revealSelectors = '.reveal, .reveal-left, .reveal-fade';
  const reveals = document.querySelectorAll(revealSelectors);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  });

  // Add stagger delay to sibling cards
  const addStaggerToCards = () => {
    const groups = document.querySelectorAll('main, .container');
    groups.forEach(group => {
      const cards = group.querySelectorAll('.item-card.reveal');
      cards.forEach((card, i) => {
        const delay = Math.min(i * 0.1, 0.4);
        card.style.transitionDelay = `${delay}s`;
      });
    });
  };
  addStaggerToCards();

  reveals.forEach(el => {
    // Navbar and initially-active elements skip observer
    if (el.classList.contains('active')) return;
    observer.observe(el);
  });

  // Fallback: ensure everything is visible after 1.8s
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.active), .reveal-left:not(.active), .reveal-fade:not(.active)')
      .forEach(el => el.classList.add('active'));
  }, 1800);


  // ── Navbar scroll shadow ──
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });


  // ── Mobile menu ──
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks   = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('mobile-active');
      const [s0, s1, s2] = menuToggle.querySelectorAll('span');
      if (open) {
        s0.style.transform = 'rotate(45deg) translate(5px, 5px)';
        s1.style.opacity   = '0';
        s2.style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        s0.style.transform = s2.style.transform = 'none';
        s1.style.opacity   = '1';
      }
    });

    // Close menu when a link is tapped
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        const [s0, s1, s2] = menuToggle.querySelectorAll('span');
        s0.style.transform = s2.style.transform = 'none';
        s1.style.opacity   = '1';
      });
    });
  }

});
