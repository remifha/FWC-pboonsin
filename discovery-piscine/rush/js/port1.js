window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (nav && window.scrollY > 50) {
        nav.style.padding = '15px 40px';
    } else if (nav) {
        nav.style.padding = '20px 40px';
    }
});

const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault(); 
            const targetSection = document.querySelector(href);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        }
    });
});