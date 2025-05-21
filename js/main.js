// main.js
const toggle = document.querySelector('.navbar__toggle');
const links = document.querySelector('.navbar__links');
toggle.addEventListener('click', () => {
  links.classList.toggle('navbar__links--open');
});

// Smooth scroll para anclas internas
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
  });
});
