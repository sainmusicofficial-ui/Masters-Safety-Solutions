(function () {
    "use strict";

    var targets = document.querySelectorAll(
        '.section-title, .page-banner h1, .page-banner nav, ' +
        '[class$="-card"], [class$="-box"], ' +
        '.about-image, .about-content, .about-text, .about > img, ' +
        '.rental-content, .rental-image, .form-content, .contact-form, ' +
        '.cta-section h2, .cta-section p, .cta-section a'
    );

    if (!('IntersectionObserver' in window) || !targets.length) {
        targets.forEach(function (el) { el.classList.add('reveal-visible'); });
        return;
    }

    // Stagger items that share the same parent (grids of cards, etc.)
    var groups = new Map();
    targets.forEach(function (el) {
        var siblings = groups.get(el.parentElement) || 0;
        el.classList.add('reveal-init');
        el.style.transitionDelay = Math.min(siblings * 0.08, 0.4) + 's';
        groups.set(el.parentElement, siblings + 1);
    });

    var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
})();
