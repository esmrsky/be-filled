(function () {
  /* ---------- expanders ---------- */
  function setExp(exp, open) {
    exp.dataset.open = open ? "true" : "false";
    var head = exp.querySelector(".exp-head");
    if (head) head.setAttribute("aria-expanded", open ? "true" : "false");
  }
  function syncReadLabel() {
    var all = document.querySelectorAll(".exp");
    var open = document.querySelectorAll('.exp[data-open="true"]').length;
    allOpen = open === all.length;
    readLabel.textContent = allOpen ? "Collapse all" : "Open all";
    readBtn.setAttribute("aria-pressed", allOpen ? "true" : "false");
  }
  document.querySelectorAll(".exp-head").forEach(function (head) {
    head.addEventListener("click", function () {
      var exp = head.closest(".exp");
      setExp(exp, exp.dataset.open !== "true");
      syncReadLabel();
    });
  });

  /* ---------- slots ---------- */
  document.querySelectorAll(".slot").forEach(function (slot) {
    function toggle() {
      var open = slot.dataset.open !== "true";

      // close siblings for a clean single-open feel
      slot.parentElement.querySelectorAll(".slot").forEach(function (s) {
        s.dataset.open = "false"; s.setAttribute("aria-expanded", "false");
      });
      slot.dataset.open = open ? "true" : "false";
      slot.setAttribute("aria-expanded", open ? "true" : "false");

      if (open) {
        // Let the DOM settle after siblings collapse, then scroll card to top (below sticky stepper)
        setTimeout(function () {
          var stepperEl = document.getElementById("stepper");
          var offset = stepperEl ? stepperEl.offsetHeight : 0;
          var top = slot.getBoundingClientRect().top + window.scrollY - offset - 8;
          window.scrollTo({ top: top, behavior: "smooth" });
        }, 80);
      }
    }
    function runToggleWithTransition() {
      var isMobile = window.innerWidth < 768;
      if (document.startViewTransition && !isMobile) {
        document.startViewTransition(toggle);
      } else {
        toggle();
      }
    }
    slot.addEventListener("click", runToggleWithTransition);
    slot.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); runToggleWithTransition(); }
    });
  });

  /* ---------- open-all / collapse-all ---------- */
  var readBtn = document.getElementById("readmode");
  var readLabel = document.getElementById("readmode-label");
  var allOpen = false;
  readBtn.addEventListener("click", function () {
    allOpen = !allOpen;
    document.querySelectorAll(".exp").forEach(function (exp) { setExp(exp, allOpen); });
    readLabel.textContent = allOpen ? "Collapse all" : "Open all";
    readBtn.setAttribute("aria-pressed", allOpen ? "true" : "false");
  });

  /* ---------- theme toggle ---------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme");
  var icon = document.getElementById("theme-icon");
  var textEl = document.getElementById("theme-text");
  var sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>';
  var moon = '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>';
  
  function updateThemeUI(theme) {
    var isDark = theme === "dark";
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", isDark);
    if (icon) {
      icon.innerHTML = isDark ? sun : moon;
    }
    if (textEl) {
      textEl.textContent = isDark ? "Light mode" : "Dark mode";
    }
  }

  // load saved theme if any, default to light
  var savedTheme = localStorage.getItem("theme") || "light";
  updateThemeUI(savedTheme);
  
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var currentlyLight = root.getAttribute("data-theme") === "light";
      var nextTheme = currentlyLight ? "dark" : "light";
      updateThemeUI(nextTheme);
      localStorage.setItem("theme", nextTheme);
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll("section > .col, .slots-grid, .loop-frame");
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          e.target.classList.add("active");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
      el.classList.add("active");
    });
  }

  /* ---------- stepper active state ---------- */
  var stepIds = ["hunt","slots","split","loop","fountain","turn","riverbed","feast","objections"];
  var steps = Array.prototype.slice.call(document.querySelectorAll(".step"));
  var sections = stepIds.map(function (id) { return document.getElementById(id); });
  var stepper = document.getElementById("stepper");
  function activate(id) {
    steps.forEach(function (s) {
      var isActive = s.getAttribute("href") === "#" + id;
      s.classList.toggle("active", isActive);
      if (isActive && stepper) {
        var containerWidth = stepper.clientWidth;
        var stepLeft = s.offsetLeft;
        var stepWidth = s.clientWidth;
        var targetScroll = stepLeft - (containerWidth / 2) + (stepWidth / 2);
        stepper.scrollTo({ left: targetScroll, behavior: "smooth" });
      }
    });
  }
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) activate(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }
  // keep active step scrolled into view in the horizontal nav
  steps.forEach(function (s) {
    s.addEventListener("click", function () {
      setTimeout(function () { s.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" }); }, 50);
    });
  });
})();
