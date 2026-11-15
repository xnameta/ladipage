(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Mobile Navigation Toggle
  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Reveal on Scroll
  const revealElements = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // 3. Project Status Filter
  const filterTabs = document.querySelectorAll(".filter-tab");
  const projectCards = document.querySelectorAll(".project-card");

  filterTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const selected = tab.getAttribute("data-filter");

      filterTabs.forEach(function (item) {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });

      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      projectCards.forEach(function (card) {
        const status = card.getAttribute("data-status");
        if (selected === "all" || status === selected) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  // 4. Back to Top & Active Section Highlight
  const backToTopBtn = document.getElementById("back-to-top");
  const navLinks = document.querySelectorAll(".primary-nav .nav-link[href^='#']");
  const sections = document.querySelectorAll("main section[id]");

  function handleScroll() {
    const scrollY = window.scrollY;

    if (backToTopBtn) {
      if (scrollY > 420) {
        backToTopBtn.classList.add("is-visible");
      } else {
        backToTopBtn.classList.remove("is-visible");
      }
    }

    let currentId = "";
    sections.forEach(function (section) {
      const top = section.offsetTop - 130;
      if (scrollY >= top) {
        currentId = section.getAttribute("id") || "";
      }
    });

    navLinks.forEach(function (link) {
      const target = link.getAttribute("href");
      if (target === "#" + currentId) {
        link.classList.add("is-active");
      } else {
        link.classList.remove("is-active");
      }
    });
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });
  }

  // 5. Subtle Background Particles
  const canvas = document.getElementById("bg-particles");
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      let width = 0;
      let height = 0;
      let particles = [];
      let rafId = null;

      function initParticles() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        const count = Math.min(48, Math.max(18, Math.floor((width * height) / 36000)));
        particles = [];

        for (let i = 0; i < count; i += 1) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            radius: Math.random() * 1.6 + 0.6,
            color: i % 2 === 0 ? "rgba(139, 92, 246, 0.45)" : "rgba(34, 211, 238, 0.38)"
          });
        }
      }

      function renderParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i += 1) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        rafId = window.requestAnimationFrame(renderParticles);
      }

      initParticles();
      renderParticles();

      window.addEventListener("resize", function () {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
        }
        initParticles();
        renderParticles();
      });
    }
  }
})();
