/* =========================================================
   ExtinGard — site etkileşimleri
   Bağımlılık yok. Tüm davranışlar "progressive enhancement".
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Mobil menü ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav__toggle");
    var links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      links.classList.toggle("is-open", open);
      document.body.style.overflow = open && window.innerWidth <= 980 ? "hidden" : "";
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) setOpen(false);
    });
  }

  /* ---------- 2. Yapışkan başlık gölgesi ---------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 3. Görünüme girince ortaya çıkma ---------- */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 4. Maliyet çubuklarının canlanması ---------- */
  function initCostChart() {
    var bars = document.querySelectorAll(".cost-row__bar");
    if (!bars.length) return;

    var draw = function (bar) {
      bar.style.width = (bar.dataset.width || "0") + "%";
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      bars.forEach(draw);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        draw(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    bars.forEach(function (bar) { io.observe(bar); });
  }

  /* ---------- 5. Sayaçlar ---------- */
  function initCounters() {
    var nodes = document.querySelectorAll("[data-count]");
    if (!nodes.length) return;

    var run = function (el) {
      var target = parseFloat(el.dataset.count);
      var decimals = parseInt(el.dataset.decimals || "0", 10);
      var prefix = el.dataset.prefix || "";
      var suffix = el.dataset.suffix || "";
      var duration = 1300;
      var start = null;

      var fmt = function (v) {
        return prefix + v.toLocaleString("tr-TR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }) + suffix;
      };

      if (reduceMotion) { el.textContent = fmt(target); return; }

      var step = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = fmt(target);
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(run);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    nodes.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 6. SSS akordiyonu ---------- */
  function initFaq() {
    document.querySelectorAll(".faq-q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
      });
    });
  }

  /* ---------- 7. Yukarı çık ---------- */
  function initToTop() {
    var btn = document.querySelector(".to-top");
    if (!btn) return;
    var onScroll = function () {
      btn.classList.toggle("is-visible", window.scrollY > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- 8. Kıvılcım parçacıkları (hero) ---------- */
  function initEmbers() {
    var hero = document.querySelector(".hero");
    if (!hero || reduceMotion) return;
    for (var i = 0; i < 14; i++) {
      var s = document.createElement("span");
      s.className = "hero__ember";
      var size = 2 + Math.random() * 4;
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = 20 + Math.random() * 70 + "%";
      s.style.animationDelay = (Math.random() * 9).toFixed(2) + "s";
      s.style.animationDuration = (7 + Math.random() * 6).toFixed(2) + "s";
      hero.appendChild(s);
    }
  }

  /* ---------- 9. İletişim formu (mailto ile gönderim) ---------- */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var get = function (name) {
        var el = form.elements[name];
        return el ? String(el.value).trim() : "";
      };

      var subject = "[ExtinGard] " + (get("konu") || "İletişim talebi");
      var body = [
        "Ad Soyad: " + get("ad"),
        "Kurum: " + (get("kurum") || "—"),
        "E-posta: " + get("eposta"),
        "Telefon: " + (get("telefon") || "—"),
        "Konu: " + (get("konu") || "—"),
        "",
        "Mesaj:",
        get("mesaj")
      ].join("\n");

      var href = "mailto:extingard@gmail.com"
        + "?subject=" + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(body);

      window.location.href = href;

      var status = form.querySelector(".form__status");
      if (status) {
        status.textContent = "E-posta uygulamanız hazırlanan mesajla açılıyor. Açılmazsa doğrudan extingard@gmail.com adresine yazabilirsiniz.";
        status.classList.add("is-visible");
      }
    });
  }

  /* ---------- 10. Yıl damgası ---------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ---------- Başlat ---------- */
  function boot() {
    initNav();
    initHeader();
    initReveal();
    initCostChart();
    initCounters();
    initFaq();
    initToTop();
    initEmbers();
    initContactForm();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
