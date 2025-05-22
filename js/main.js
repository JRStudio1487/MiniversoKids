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
