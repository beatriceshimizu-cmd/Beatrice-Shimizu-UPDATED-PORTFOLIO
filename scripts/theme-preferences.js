(function () {
  function setFooterIconsByTheme(mode) {
    var icons = document.querySelectorAll(".footer-links img");

    for (var i = 0; i < icons.length; i++) {
      var icon = icons[i];
      var src = (icon.getAttribute("src") || "").toLowerCase();

      if (mode === "dark") {
        if (src.indexOf("mail%20icon.svg") !== -1 || src.indexOf("mail icon.svg") !== -1) {
          icon.setAttribute("src", "images/red-email-icon_1.svg");
        } else if (src.indexOf("insta%20icon.svg") !== -1 || src.indexOf("insta icon.svg") !== -1) {
          icon.setAttribute("src", "images/red-instragram-icon.svg");
        } else if (src.indexOf("linked%20in%20icon.svg") !== -1 || src.indexOf("linked in icon.svg") !== -1) {
          icon.setAttribute("src", "images/red-indesign-icon.svg");
        }
      } else {
        if (src.indexOf("red-email-icon_1.svg") !== -1) {
          icon.setAttribute("src", "images/mail%20icon.svg");
        } else if (src.indexOf("red-instragram-icon.svg") !== -1) {
          icon.setAttribute("src", "images/insta%20icon.svg");
        } else if (src.indexOf("red-indesign-icon.svg") !== -1) {
          icon.setAttribute("src", "images/linked%20in%20icon.svg");
        }
      }
    }
  }

  function ensureThemeMenu() {
    var navList = document.querySelector(".site-nav .nav-list");
    if (!navList || navList.querySelector(".theme-menu")) {
      return;
    }

    var item = document.createElement("li");
    item.className = "nav-item has-dropdown theme-menu";
    item.innerHTML =
      '<a href="#" data-theme-menu-toggle="true" aria-label="Display settings">' +
      '  <span class="theme-trigger-icon" aria-hidden="true">\u25D0</span>' +
      '  <span class="chev" aria-hidden="true">\u25BE</span>' +
      '</a>' +
      '<ul class="dropdown theme-dropdown" aria-label="Theme settings">' +
      '  <li class="theme-controls">' +
      '    <p class="theme-row-title">Mode:</p>' +
      '    <div class="mode-switch-wrap" role="group" aria-label="Color mode">' +
      '      <span class="mode-label">Light</span>' +
      '      <button class="mode-switch" type="button" data-theme-mode-toggle="true" aria-label="Toggle dark mode" aria-pressed="false">' +
      '        <span class="mode-switch-track"><span class="mode-switch-thumb"></span></span>' +
      '      </button>' +
      '      <span class="mode-label">Dark</span>' +
      '    </div>' +
      '  </li>' +
      '  <li class="theme-controls">' +
      '    <p class="theme-row-title">Font Size:</p>' +
      '    <div class="theme-options" role="group" aria-label="Font size">' +
      '      <button class="theme-option" type="button" data-font-size="small" aria-pressed="false">Small</button>' +
      '      <button class="theme-option" type="button" data-font-size="medium" aria-pressed="false">Medium</button>' +
      '      <button class="theme-option" type="button" data-font-size="large" aria-pressed="false">Large</button>' +
      '    </div>' +
      '  </li>' +
      '</ul>';

    navList.appendChild(item);
  }

  function applyPreferences() {
    var mode = localStorage.getItem("siteMode") || "light";
    var size = localStorage.getItem("siteFontSize") || "medium";

    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.setAttribute("data-font-size", size);

    var modeToggle = document.querySelector("button[data-theme-mode-toggle]");
    if (modeToggle) {
      var isDark = mode === "dark";
      modeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      modeToggle.classList.toggle("is-dark", isDark);
    }

    var sizeButtons = document.querySelectorAll("button[data-font-size]");
    for (var i = 0; i < sizeButtons.length; i++) {
      var isActiveSize = sizeButtons[i].getAttribute("data-font-size") === size;
      sizeButtons[i].setAttribute("aria-pressed", isActiveSize ? "true" : "false");
      sizeButtons[i].classList.toggle("is-active", isActiveSize);
    }

    setFooterIconsByTheme(mode);
  }

  function initializeThemeMenu() {
    ensureThemeMenu();
    applyPreferences();
  }

  document.addEventListener("click", function (event) {
    var modeToggle = event.target.closest("button[data-theme-mode-toggle]");
    if (modeToggle) {
      event.preventDefault();
      var nextMode = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem("siteMode", nextMode);
      applyPreferences();
      return;
    }

    var modeButton = event.target.closest("button[data-theme-mode]");
    if (modeButton) {
      event.preventDefault();
      localStorage.setItem("siteMode", modeButton.getAttribute("data-theme-mode"));
      applyPreferences();
      return;
    }

    var sizeButton = event.target.closest("button[data-font-size]");
    if (sizeButton) {
      event.preventDefault();
      localStorage.setItem("siteFontSize", sizeButton.getAttribute("data-font-size"));
      applyPreferences();
      return;
    }

    if (event.target.closest("[data-theme-menu-toggle]")) {
      event.preventDefault();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeThemeMenu);
  } else {
    initializeThemeMenu();
  }
})();
