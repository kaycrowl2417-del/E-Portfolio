const menuButton = document.querySelector(".btn__menu");
const menuIcon = document.querySelector(".btn__menu i");
const menu = document.querySelector(".menu");
const menuBackdrop = document.querySelector(".menu__backdrop");
const menuCloseItems = document.querySelectorAll("[data-menu-close]");
const firstMenuLink = document.querySelector(".menu__link");
const themeButtons = document.querySelectorAll(".theme__button");

function setTheme(isDark) {
  document.body.classList.toggle("dark-theme", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");

  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", isDark);
    button.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  });
}

const savedTheme = localStorage.getItem("theme");
const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

setTheme(savedTheme ? savedTheme === "dark" : prefersDarkTheme);

function setMenuOpen(isOpen) {
  document.body.classList.toggle("menu--open", isOpen);
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menu.setAttribute("aria-hidden", !isOpen);
  menuIcon.classList.toggle("fa-bars", !isOpen);
  menuIcon.classList.toggle("fa-xmark", isOpen);

  if (isOpen) {
    firstMenuLink.focus();
  } else {
    menuButton.focus();
  }
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

menuBackdrop.addEventListener("click", () => setMenuOpen(false));

menuCloseItems.forEach((item) => {
  item.addEventListener("click", () => setMenuOpen(false));
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-theme");
    setTheme(isDark);
  });
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false);
  }
});
