// main.js (versión consolidada y robusta)
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     NAV: HAMBURGER + AUTOCLOSE
  ========================== */
  const navToggle = document.querySelector(".navbar__toggle");
  const navLinks = document.querySelector(".navbar__links");

  const openMenu = () => {
    if (!navLinks) return;
    navLinks.classList.add("navbar__links--open");
    navToggle?.setAttribute("aria-expanded", "true");
  };
  const closeMenu = () => {
    if (!navLinks) return;
    navLinks.classList.remove("navbar__links--open");
    navToggle?.setAttribute("aria-expanded", "false");
  };
  const toggleMenu = (e) => {
    if (!navLinks) return;
    e?.stopPropagation?.();
    const isOpen = navLinks.classList.toggle("navbar__links--open");
    navToggle?.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  navToggle?.addEventListener("click", toggleMenu);

  // Cerrar al clicar un enlace del menú
  navLinks?.addEventListener("click", (e) => {
    const t = e.target;
    if (t.matches("a")) closeMenu();
  });

  // Cerrar al clicar fuera
  document.addEventListener("click", (e) => {
    if (!navLinks || !navToggle) return;
    const clickInsideMenu = navLinks.contains(e.target);
    const clickOnToggle = navToggle.contains(e.target);
    if (!clickInsideMenu && !clickOnToggle) closeMenu();
  });

  // Cerrar al hacer scroll y con Esc
  window.addEventListener("scroll", closeMenu, { passive: true });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
      closeExtrasModal(); // por si hay modal abierto
    }
  });

  /* =========================
     SMOOTH SCROLL (anclas internas)
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const hash = a.getAttribute("href");
      // Ignorar si es solo "#" o si no existe el destino
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* =========================
     LANGUAGE SWITCHER (null-safe)
  ========================== */
  const switcher = document.querySelector(".language-switcher");
  const btnCurrent = switcher?.querySelector(".language-switcher__current img");
  const dropdown = switcher?.querySelector(".language-switcher__dropdown");
  const options = switcher
    ? Array.from(switcher.querySelectorAll(".language-switcher__option"))
    : [];

  if (switcher && btnCurrent && dropdown) {
    const params = new URLSearchParams(window.location.search);
    const currentLang = params.get("lang") || "es";

    // Actualizar bandera visible
    btnCurrent.src = `assets/${currentLang}.png`;
    btnCurrent.alt = currentLang.toUpperCase();

    // Ocultar la opción actual del desplegable
    options.forEach((opt) => {
      if (opt.dataset.lang === currentLang) opt.style.display = "none";
    });

    // Toggle dropdown
    switcher
      .querySelector(".language-switcher__current")
      ?.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("open");
      });

    // Al hacer click en una opción
    options.forEach((opt) => {
      if (opt.dataset.lang !== currentLang) {
        opt.addEventListener("click", () => {
          const newLang = opt.dataset.lang;
          const url = new URL(window.location);
          url.searchParams.set("lang", newLang);
          window.location = url.toString();
        });
      }
    });

    // Cerrar al click fuera
    document.addEventListener("click", () => dropdown.classList.remove("open"));
  }

  /* =========================
     BACK TO TOP (como tenías, con null-safe)
  ========================== */
  const backToTopBtn = document.getElementById("back-to-top");
  const serviciosSec = document.getElementById("servicios");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const midpoint = scrollY + vh / 2;

      // 1) Mostrar/ocultar
      if (scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }

      // 2) Fade cuando el punto medio esté en Servicios
      if (serviciosSec) {
        const top = serviciosSec.offsetTop;
        const bottom = top + serviciosSec.offsetHeight;
        if (midpoint >= top && midpoint <= bottom) {
          backToTopBtn.classList.add("fade");
        } else {
          backToTopBtn.classList.remove("fade");
        }
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* =========================
     GALERÍA (modo antiguo con .carousel__inner si existe)
     * Tu carrusel actual es "cinta continua" por CSS; dejamos esto
       solo por compatibilidad si en algún sitio mantienes el antiguo.
  ========================== */
  (function initLegacyCarousel() {
    const carouselInner = document.querySelector(".carousel__inner");
    if (!carouselInner) return; // no hay carrusel "antiguo", no hacemos nada

    const items = Array.from(carouselInner.children);
    const prevBtn = document.querySelector(".carousel__btn.prev");
    const nextBtn = document.querySelector(".carousel__btn.next");
    let index = 0;

    const update = () => {
      carouselInner.style.transform = `translateX(-${index * 100}%)`;
    };

    prevBtn?.addEventListener("click", () => {
      index = index === 0 ? items.length - 1 : index - 1;
      update();
    });
    nextBtn?.addEventListener("click", () => {
      index = index === items.length - 1 ? 0 : index + 1;
      update();
    });

    const auto = setInterval(() => nextBtn?.click(), 3000);
    // detener al pasar el ratón (si quieres)
    carouselInner.addEventListener("mouseenter", () => clearInterval(auto));
  })();

  /* =========================
   EXTRAS: MODAL (robusto + mueve al body)
========================= */
  (() => {
    let modal = document.getElementById("extras-modal");
    if (!modal) return; // no estamos en extras.html

    // Si el modal no está directamente bajo <body>, lo movemos (evita bugs de stacking/transform)
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    const modalTitle = modal.querySelector("#modal-title");
    const modalList = modal.querySelector("#modal-list");
    const modalCloseBtn = modal.querySelector(".modal__close");
    const modalOverlay = modal.querySelector(".modal__overlay");

    // Contenido por tipo (coincidir con data-extra)
    const EXTRAS = {
      decoracion: [
        "Globos",
        "Arcos",
        "Guirnaldas temáticas",
        "Photocall",
        "Vinilos decorativos"
      ],
      carrito: [
        "Decoración personalizada",
        "Donuts",
        "Galletas",
        "Chuches"
      ],
      bebidas: [
        "Refrescos surtidos",
        "Zumos",
        "Bebidas alcohólicas (* Sólo para adultos)",
        "Hielo y vasos"
      ]
    };

    // Guardamos scroll previo para restaurar sin “quedarse colgado”
    let prevScrollY = 0;

    function openModal(kind, fallbackTitle) {
      const cardTitle =
        document
          .querySelector(`.extras__card[data-extra="${kind}"] h2`)
          ?.textContent?.trim() ||
        fallbackTitle ||
        "Opciones";

      const items = EXTRAS[kind]?.length
        ? EXTRAS[kind]
        : ["Cuéntanos tu idea y te asesoramos."];

      modalTitle.textContent = cardTitle;
      modalList.innerHTML = items.map((t) => `<li>${t}</li>`).join("");

      // abrir
      prevScrollY = window.scrollY;
      modal.classList.add("is-open");
      modal.classList.remove("hidden");
      document.body.classList.add("modal-open");
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.classList.add("hidden");
      document.body.classList.remove("modal-open");
      // restaurar posición exacta
      window.scrollTo(0, prevScrollY);
    }

    // Delegación: cualquier botón .extras__btn-more abre su modal
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".extras__btn-more");
      if (!btn) return;

      const card = btn.closest(".extras__card");
      if (!card) return;

      const kind = card.dataset.extra;
      const fallbackTitle = card.querySelector("h2")?.textContent?.trim();
      openModal(kind, fallbackTitle);
    });

    // Cerrar: ✕, overlay click “real”, Escape
    modalCloseBtn?.addEventListener("click", closeModal);
    modalOverlay?.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open"))
        closeModal();
    });
  })();
});
