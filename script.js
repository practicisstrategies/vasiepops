/* ======================================================
   KLEO — script.js
   ====================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ======================================================
     1) TESTIMONIAL STRIP CAROUSEL
     ====================================================== */

  function setupStripCarousel() {
    const strip = document.getElementById("tStrip");
    if (!strip) return;

    const cards = Array.from(strip.querySelectorAll(".shot"));
    if (!cards.length) return;

    const btnPrev = document.querySelector("[data-strip-prev]");
    const btnNext = document.querySelector("[data-strip-next]");

    let index = 0;

    function scrollToIndex(i) {
      index = (i + cards.length) % cards.length;

      const card = cards[index];

      strip.scrollTo({
        left: card.offsetLeft - strip.offsetLeft,
        behavior: "smooth"
      });
    }

    // Arrow buttons
    btnPrev?.addEventListener("click", () => scrollToIndex(index - 1));
    btnNext?.addEventListener("click", () => scrollToIndex(index + 1));

    // Sync index when user scrolls manually
    let raf = null;
    strip.addEventListener("scroll", () => {
      if (raf) cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const stripLeft = strip.getBoundingClientRect().left;

        let best = 0;
        let bestDist = Infinity;

        cards.forEach((card, i) => {
          const left = card.getBoundingClientRect().left;
          const distance = Math.abs(left - stripLeft);

          if (distance < bestDist) {
            bestDist = distance;
            best = i;
          }
        });

        index = best;
      });
    }, { passive: true });

    // Keyboard support
    strip.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToIndex(index - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollToIndex(index + 1);
      }
    });

    // Start aligned to first card
    strip.scrollLeft = 0;
    index = 0;
  }

  setupStripCarousel();


  /* ======================================================
     2) HEADER COLOR TRANSITION (Top → Coral → Blue)
     ====================================================== */

  const header = document.querySelector(".siteHeader");

  if (header) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      const scrollBottom = scrollTop + viewportHeight;

      // Near bottom threshold (92%)
      const nearBottom = scrollBottom > pageHeight * 0.92;

      if (scrollTop <= 10) {
        // At very top
        header.classList.remove("isScrolled", "isBlue");
      } else if (nearBottom) {
        // Near bottom → blue
        header.classList.add("isBlue");
        header.classList.remove("isScrolled");
      } else {
        // Mid scroll → coral
        header.classList.add("isScrolled");
        header.classList.remove("isBlue");
      }
    });
  }

});