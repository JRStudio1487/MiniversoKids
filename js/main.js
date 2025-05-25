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

document.addEventListener('DOMContentLoaded', () => {
  const switcher = document.querySelector('.language-switcher');
  const btnCurrent = switcher.querySelector('.language-switcher__current img');
  const dropdown = switcher.querySelector('.language-switcher__dropdown');
  const options = Array.from(switcher.querySelectorAll('.language-switcher__option'));

  // Detectar idioma actual de la URL
  const params = new URLSearchParams(window.location.search);
  const currentLang = params.get('lang') || 'es';

  // Actualizar bandera visible
  btnCurrent.src = `assets/${currentLang}.png`;
  btnCurrent.alt = currentLang.toUpperCase();

  // Ocultar la opción actual del desplegable
  options.forEach(opt => {
    if (opt.dataset.lang === currentLang) {
      opt.style.display = 'none';
    }
  });

  // Toggle dropdown
  switcher.querySelector('.language-switcher__current').addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  // Al hacer click en una opción
  options.forEach(opt => {
    if (opt.dataset.lang !== currentLang) {
      opt.addEventListener('click', () => {
        const newLang = opt.dataset.lang;
        const url = new URL(window.location);
        url.searchParams.set('lang', newLang);
        window.location = url.toString();
      });
    }
  });

  // Cerrar al click fuera
  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
  });
});

// Back to Top button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

//

// Elementos
// const backToTopBtn = document.getElementById('back-to-top');
const serviciosSection = document.getElementById('servicios');

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Cuando la sección Servicios entra en el viewport
      backToTopBtn.classList.add('fade');
    } else {
      backToTopBtn.classList.remove('fade');
    }
  });
}, {
  root: null,            // viewport
  threshold: 0,          // desencadena al aparecer cualquier parte
  rootMargin: '0px 0px -100px 0px' 
  /* el rootMargin negativo en bottom retrasa el fade 
     hasta que la sección esté bien dentro de la vista */
});

// Arrancamos el observer
observer.observe(serviciosSection);


