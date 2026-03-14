const navItems = [
  { label: "Paper Preservation", href: "paper-preservation.html" },
  { label: "Digital Preservation", href: "digital-preservation.html" },
  { label: "Media Resources", href: "media-resources.html" },
  { label: "Disaster Management", href: "disaster-management.html" },
  { label: "Supplies & Vendors", href: "supplies-vendors.html" },
  { label: "FAQ", href: "faq.html" },
];

const mainNavList = document.getElementById("mainNavList");
const panelNavList = document.getElementById("panelNavList");
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const menuPanel = document.getElementById("menuPanel");
const menuBackdrop = document.getElementById("menuBackdrop");
const mobileQuery = window.matchMedia("(max-width: 768px)");

function isMobileViewport() {
  return mobileQuery.matches;
}

function createNavItem({ label, href }, className) {
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.className = className;
  link.href = href;
  link.textContent = label;
  link.setAttribute("aria-label", `${label} page`);
  li.appendChild(link);
  return li;
}

function buildNavLists() {
  if (mainNavList) {
    const mainFragment = document.createDocumentFragment();
    navItems.forEach((item) => {
      mainFragment.appendChild(createNavItem(item, "nav-button"));
    });
    mainNavList.appendChild(mainFragment);
  }

  if (panelNavList) {
    const panelFragment = document.createDocumentFragment();
    navItems.forEach((item) => {
      panelFragment.appendChild(createNavItem(item, "menu-link"));
    });
    panelNavList.appendChild(panelFragment);
  }
}

function setMenuState(isOpen) {
  if (!menuPanel || !menuToggle || !menuBackdrop) {
    return;
  }

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
  const isOpen = menuToggle?.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
}

function closeMenu() {
  setMenuState(false);
}

function attachEvents() {
  if (!menuToggle || !menuPanel || !menuBackdrop) {
    return;
  }

  menuToggle.addEventListener("click", toggleMenu);
  menuClose?.addEventListener("click", closeMenu);
  menuBackdrop.addEventListener("click", closeMenu);

  menuPanel.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement && target.classList.contains("menu-link")) {
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
