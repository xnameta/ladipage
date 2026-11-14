/**
 * SUB24H.NET — Landing Page Demo (Vanilla JavaScript)
 */
(function () {
  "use strict";

  const DEMO_MESSAGES = {
    login: {
      title: "Đăng nhập tài khoản (Demo)",
      body: "Đây là bản giao diện Frontend DEMO của SUB24H.NET. Chức năng đăng nhập chưa kết nối máy chủ xác thực thật."
    },
    register: {
      title: "Đăng ký miễn phí (Demo)",
      body: "Đây là bản giao diện Frontend DEMO của SUB24H.NET. Tính năng tạo tài khoản và cấp số dư tự động chưa kết nối backend."
    },
    privacy: {
      title: "Chính sách bảo mật (Demo)",
      body: "Trang Chính sách bảo mật là nội dung minh họa trong bản Frontend Demo. Không có dữ liệu cá nhân nào được thu thập hoặc lưu trữ."
    },
    terms: {
      title: "Điều khoản dịch vụ (Demo)",
      body: "Trang Điều khoản dịch vụ là nội dung minh họa trong bản Frontend Demo của SUB24H.NET."
    },
    support: {
      title: "Hỗ trợ khách hàng 24/7 (Demo)",
      body: "Đây là giao diện minh họa kênh hỗ trợ khách hàng 24/7. Không có yêu cầu nào được gửi đi trong bản Demo này."
    }
  };

  function initHeaderAndBackToTop() {
    const header = document.getElementById("site-header");
    const backToTop = document.getElementById("back-to-top");

    function onScroll() {
      const y = window.scrollY || window.pageYOffset;
      if (header) {
        header.classList.toggle("scrolled", y > 24);
      }
      if (backToTop) {
        backToTop.classList.toggle("visible", y > 420);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (backToTop) {
      backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  function initMobileMenu() {
    const hamburger = document.getElementById("hamburger-btn");
    const nav = document.getElementById("main-nav");
    if (!hamburger || !nav) return;

    function closeMenu() {
      hamburger.classList.remove("is-open");
      nav.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    }

    hamburger.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      hamburger.classList.toggle("is-open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a, button").forEach(function (el) {
      el.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  function initSmoothScrolling() {
    const header = document.getElementById("site-header");
    const navLinks = document.querySelectorAll(".nav-link");

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const offset = header ? header.offsetHeight : 76;
        const top = target.getBoundingClientRect().top + window.scrollY - offset + 2;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

        if (anchor.classList.contains("nav-link")) {
          navLinks.forEach(function (l) {
            l.classList.remove("active");
          });
          anchor.classList.add("active");
        }
      });
    });
  }

  function initDemoModal() {
    const modal = document.getElementById("demo-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.getElementById("modal-close-btn");
    const confirmBtn = document.getElementById("modal-confirm-btn");
    if (!modal || !modalTitle || !modalBody) return;

    function openModal(title, body) {
      modalTitle.textContent = title;
      modalBody.textContent = body;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      if (confirmBtn) confirmBtn.focus();
    }

    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-demo-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const key = btn.getAttribute("data-demo-action");
        const msg = DEMO_MESSAGES[key] || {
          title: "Thông báo Demo",
          body: "Tính năng này chỉ mô phỏng trên giao diện Frontend Demo."
        };
        openModal(msg.title, msg.body);
      });
    });

    document.querySelectorAll("[data-service-name]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const name = btn.getAttribute("data-service-name");
        const platform = btn.getAttribute("data-service-platform");
        const price = btn.getAttribute("data-service-price");
        openModal(
          name + " (" + platform + ")",
          "Mức giá tham khảo: " + price + ". Đây là dữ liệu minh họa trong bản Frontend Demo, không phải bảng giá đang bán chính thức và chưa hỗ trợ đặt đơn thật."
        );
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (confirmBtn) confirmBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) {
        closeModal();
      }
    });

    return openModal;
  }

  function initPricingFilterAndSearch(openModal) {
    const tabs = document.querySelectorAll(".filter-tab");
    const searchInput = document.getElementById("service-search");
    const items = document.querySelectorAll(".pricing-item");
    const emptyState = document.getElementById("pricing-empty");

    let activePlatform = "all";

    function applyFilter() {
      const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      let visibleCount = 0;

      items.forEach(function (item) {
        const platform = item.getAttribute("data-platform") || "";
        const searchText = (item.getAttribute("data-search") || "") + " " + item.textContent.toLowerCase();
        const matchPlatform = activePlatform === "all" || platform === activePlatform;
        const matchQuery = !query || searchText.includes(query);

        const show = matchPlatform && matchQuery;
        item.classList.toggle("hidden", !show);
        if (show) visibleCount += 1;
      });

      if (emptyState) {
        emptyState.classList.toggle("hidden", visibleCount > 0);
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activePlatform = tab.getAttribute("data-filter") || "all";
        tabs.forEach(function (t) {
          const isActive = t === tab;
          t.classList.toggle("active", isActive);
          t.setAttribute("aria-selected", String(isActive));
        });
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilter);
    }

    document.querySelectorAll("[data-explore-platform]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const platform = btn.getAttribute("data-explore-platform");
        const matchingTab = Array.from(tabs).find(function (t) {
          return t.getAttribute("data-filter") === platform;
        });

        if (matchingTab) {
          matchingTab.click();
          const pricingSection = document.getElementById("pricing");
          const header = document.getElementById("site-header");
          if (pricingSection) {
            const offset = header ? header.offsetHeight : 76;
            const top = pricingSection.getBoundingClientRect().top + window.scrollY - offset + 2;
            window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
          }
        } else if (typeof openModal === "function") {
          openModal(
            "Dịch vụ " + platform + " (Demo)",
            "Nền tảng " + platform + " nằm trong hệ sinh thái hỗ trợ của SUB24H.NET. Trong bản Frontend Demo này, danh mục bảng giá mẫu tập trung vào Facebook, TikTok, Instagram, YouTube và Telegram."
          );
        }
      });
    });
  }

  function initFaqAccordion() {
    const items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      const btn = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!btn || !answer) return;

      btn.addEventListener("click", function () {
        const willOpen = !item.classList.contains("is-open");

        items.forEach(function (other) {
          if (other !== item) {
            other.classList.remove("is-open");
            const otherBtn = other.querySelector(".faq-question");
            const otherAns = other.querySelector(".faq-answer");
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
            if (otherAns) otherAns.hidden = true;
          }
        });

        item.classList.toggle("is-open", willOpen);
        btn.setAttribute("aria-expanded", String(willOpen));
        answer.hidden = !willOpen;
      });
    });
  }

  function initScrollRevealAndCounters() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll(".reveal");
    const counters = document.querySelectorAll("[data-counter]");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });

    function animateCounter(el) {
      const target = parseInt(el.getAttribute("data-counter"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      if (isNaN(target)) return;

      const duration = 1100;
      const startTime = performance.now();

      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        el.textContent = current + suffix;
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    }

    const statsSection = document.getElementById("statistics");
    if (statsSection && counters.length > 0) {
      let animated = false;
      const statsObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !animated) {
              animated = true;
              counters.forEach(animateCounter);
              statsObserver.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      statsObserver.observe(statsSection);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeaderAndBackToTop();
    initMobileMenu();
    initSmoothScrolling();
    const openModal = initDemoModal();
    initPricingFilterAndSearch(openModal);
    initFaqAccordion();
    initScrollRevealAndCounters();
  });
})();
