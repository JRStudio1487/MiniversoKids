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
document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn   = document.getElementById('back-to-top');
  const serviciosSec   = document.getElementById('servicios');

  window.addEventListener('scroll', () => {
    const scrollY     = window.scrollY;
    const vh         = window.innerHeight;
    const midpoint   = scrollY + vh / 2;

    // 1) Mostrar/ocultar
    if (scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }

    // 2) Fade solo mientras el POINT-MIDDLE esté dentro de Servicios
    const top    = serviciosSec.offsetTop;
    const bottom = top + serviciosSec.offsetHeight;
    if (midpoint >= top && midpoint <= bottom) {
      backToTopBtn.classList.add('fade');
    } else {
      backToTopBtn.classList.remove('fade');
    }
  });

  // 3) Smooth scroll
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});



// Mensaje de agradecimiento tras envio mensaje contacto
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const thanks = document.getElementById('contact-thanks');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();  // evitamos recarga

    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.style.display = 'none';
        thanks.style.display = 'block';
      } else {
        console.error('Error enviando el form:', res.statusText);
        // aquí podrías mostrar un mensaje de error
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  });
});

// GALERIA
document.addEventListener('DOMContentLoaded', () => {
  // Elementos del carrusel
  const carouselInner = document.querySelector('.carousel__inner');
  const items         = Array.from(carouselInner.children);
  const prevBtn       = document.querySelector('.carousel__btn.prev');
  const nextBtn       = document.querySelector('.carousel__btn.next');
  let index           = 0;

  // Función para mover el carrusel
  function update() {
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
  }

  // Botón “Anterior”
  prevBtn.addEventListener('click', () => {
    index = (index === 0) ? items.length - 1 : index - 1;
    update();
  });

  // Botón “Siguiente”
  nextBtn.addEventListener('click', () => {
    index = (index === items.length - 1) ? 0 : index + 1;
    update();
  });

  // Avance automático cada 3 segundos
  setInterval(() => {
    nextBtn.click();
  }, 3000);
});

// ABRIR Y CERRAR MODAL EXTRAS
document.addEventListener('DOMContentLoaded', () => {
  // Definimos las opciones de cada extra
  const extrasData = {
    decoracion: [
      'Globos',
      'Guirnaldas temáticas',
      'Photocall',
      'Vinilos decorativos',
      'Cartelería'
    ],
    animacion: [
      'Payasos profesionales',
      'Magos infantiles',
      'Pintacaras',
      'Show de burbujas',
      'Minidisco'
    ],
    sonido: [
      'Altavoces PA básicos',
      'Luces LED dinámicas',
      'Microfonía inalámbrica'
    ],
    pasteleria: [
      'Tartas personalizadas',
      'Cupcakes temáticos',
      'Mesas dulces',
      'Galletas decoradas'
    ],
    bebidas: [
      'Refrescos surtidos',
      'Zumos naturales',
      'Bebidas alcohólicas (* Sólo para adultos)',
      'Agua mineral',
      'Hielo y vasos'
    ]
  };

  const modal      = document.getElementById('extras-modal');
  const titleEl    = document.getElementById('modal-title');
  const listEl     = document.getElementById('modal-list');
  const closeBtn   = modal.querySelector('.modal__close');
  const overlay    = modal.querySelector('.modal__overlay');

  // Abrir modal al clickar cada “Ver opciones”
  document.querySelectorAll('.extras__btn-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.closest('.extras__card').dataset.extra;
      // Poblar título y lista
      titleEl.textContent = btn.closest('.extras__card').querySelector('h2').textContent;
      listEl.innerHTML    = extrasData[key].map(item => `<li>${item}</li>`).join('');
      modal.classList.remove('hidden');
    });
  });

  // Cerrar modal
  [closeBtn, overlay].forEach(el =>
    el.addEventListener('click', () => modal.classList.add('hidden'))
  );
});



