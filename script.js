const overlay = document.getElementById("menuOverlay");
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear();

let lastFocused = null;

function openMenu() {
  lastFocused = document.activeElement;
  overlay.classList.add("open");
  openBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";

  // focus the close button for accessibility
  closeBtn.focus();
}

function closeMenu() {
  overlay.classList.remove("open");
  openBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";

  if (lastFocused) lastFocused.focus();
}

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

// close if click backdrop
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeMenu();
});

// close on Escape
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("open")) closeMenu();
});

// close when a menu link is clicked
overlay.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => closeMenu());
});

// simple focus trap while open
overlay.addEventListener("keydown", (e) => {
  if (!overlay.classList.contains("open") || e.key !== "Tab") return;

  const focusables = overlay.querySelectorAll(
    'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".editorialList.editorialClamp").forEach((list) => {
    const items = list.querySelectorAll(":scope > .editorialItem");
    const btn = list.parentElement.querySelector(".listToggleBtn");

    if (!btn) return;

    // Hide the button if there's nothing beyond the first 3
    if (items.length <= 3) {
      btn.style.display = "none";
      return;
    }

    btn.textContent = "View all";
    btn.addEventListener("click", () => {
      const expanded = list.classList.toggle("expanded");
      btn.textContent = expanded ? "View less" : "View all";
    });
  });
});
