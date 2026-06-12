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
    }
    function runToggleWithTransition() {
      if (document.startViewTransition) {
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
  var sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>';
  var moon = '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>';
  
  // load saved theme if any, default to dark
  var savedTheme = localStorage.getItem("theme");
  var isDark = savedTheme ? (savedTheme === "dark") : true;
  var activeTheme = isDark ? "dark" : "light";
  
  root.setAttribute("data-theme", activeTheme);
  root.classList.toggle("dark", isDark);
  if (icon) {
    icon.innerHTML = activeTheme === "light" ? moon : sun;
  }
  
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var currentlyLight = root.getAttribute("data-theme") === "light";
      var nextTheme = currentlyLight ? "dark" : "light";
      root.setAttribute("data-theme", nextTheme);
      root.classList.toggle("dark", nextTheme === "dark");
      if (icon) {
        icon.innerHTML = nextTheme === "light" ? moon : sun;
      }
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
  function activate(id) {
    steps.forEach(function (s) {
      s.classList.toggle("active", s.getAttribute("href") === "#" + id);
    });
  }
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) activate(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }
  // keep active step scrolled into view in the horizontal nav
  var stepper = document.getElementById("stepper");
  steps.forEach(function (s) {
    s.addEventListener("click", function () {
      setTimeout(function () { s.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" }); }, 50);
    });
  });
})();
