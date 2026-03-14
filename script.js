const navLabels = [
  "Paper Preservation",
  "Digital Preservation",
  "Media Resources",
  "Disaster Management",
  "Supplies & Vendors",
  "FAQ",
];

const mainNavList = document.getElementById("mainNavList");
const panelNavList = document.getElementById("panelNavList");
const menuToggle = document.getElementById("menuToggle");
const menuPanel = document.getElementById("menuPanel");
const menuBackdrop = document.getElementById("menuBackdrop");
const mobileQuery = window.matchMedia("(max-width: 768px)");

function isMobileViewport() {
  return mobileQuery.matches;
}

function createNavItem(label, className) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  button.setAttribute("aria-label", `${label} section`);
  li.appendChild(button);
  return li;
}

function buildNavLists() {
  const mainFragment = document.createDocumentFragment();
  const panelFragment = document.createDocumentFragment();

  navLabels.forEach((label) => {
    mainFragment.appendChild(createNavItem(label, "nav-button"));
    panelFragment.appendChild(createNavItem(label, "menu-link"));
  });

  mainNavList.appendChild(mainFragment);
  panelNavList.appendChild(panelFragment);
}

function setMenuState(isOpen) {
  menuPanel.classList.toggle("open", isOpen);
  menuPanel.setAttribute("aria-hidden", String(!isOpen));
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
  menuBackdrop.hidden = !isOpen || isMobileViewport();
  document.body.classList.toggle("menu-open", isOpen && isMobileViewport());
}

function toggleMenu() {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
}

function closeMenu() {
  setMenuState(false);
}

function attachEvents() {
  menuToggle.addEventListener("click", toggleMenu);
  menuBackdrop.addEventListener("click", closeMenu);

  menuPanel.addEventListener("click", (event) => {
    const target = event.target;
    if (
      (target instanceof HTMLButtonElement || target instanceof HTMLAnchorElement) &&
      target.classList.contains("menu-link")
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (!isOpen || isMobileViewport()) {
      return;
    }

    const clickTarget = event.target;
    if (
      clickTarget instanceof Node &&
      !menuPanel.contains(clickTarget) &&
      !menuToggle.contains(clickTarget)
    ) {
      closeMenu();
    }
  });

  mobileQuery.addEventListener("change", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuBackdrop.hidden = !isOpen || isMobileViewport();
    document.body.classList.toggle("menu-open", isOpen && isMobileViewport());
  });
}

buildNavLists();
attachEvents();
setMenuState(false);
