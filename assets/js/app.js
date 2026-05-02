// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Filtering
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");

function setActiveChip(target) {
  chips.forEach(c => c.classList.toggle("is-active", c === target));
}

function filterProjects(filter) {
  cards.forEach(card => {
    const cats = (card.dataset.categories || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const show = filter === "all" || cats.includes(filter);
    card.style.display = show ? "" : "none";
  });
}

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    setActiveChip(chip);
    filterProjects(chip.dataset.filter);
  });
});



// Optional: toggle filters on mobile
const openFilters = document.getElementById("openFilters");
const filters = document.getElementById("filters");

if (openFilters && filters) {
  openFilters.addEventListener("click", () => {
    const isHidden = filters.hasAttribute("data-hidden");
    if (isHidden) {
      filters.removeAttribute("data-hidden");
      openFilters.setAttribute("aria-expanded", "true");
    } else {
      filters.setAttribute("data-hidden", "");
      openFilters.setAttribute("aria-expanded", "false");
    }
  });

  // default: show filters (tu peux inverser si tu préfères)
  // filters.setAttribute("data-hidden", "");
}



document.addEventListener("click", (e) => {
  console.log("CLICK TARGET:", e.target);
}, true); // capture

// Simple carousel (next/prev + swipe)
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".carousel__track");
  const slides = Array.from(carousel.querySelectorAll(".carousel__slide"));
  const nextBtn = carousel.querySelector(".carousel__next");
  const prevBtn = carousel.querySelector(".carousel__prev"); // NEW

  if (!track || slides.length === 0) return;

  let index = 0;
  const max = slides.length - 1;

  function update() {
    track.style.transform = `translateX(${-index * 100}%)`;

    // hide/show arrows like Instagram
    if (nextBtn) nextBtn.classList.toggle("is-hidden", index >= max);
    if (prevBtn) prevBtn.classList.toggle("is-hidden", index <= 0);
  }
  update();

  function next() {
    if (index < max) { index += 1; update(); }
  }
  function prev() {
    if (index > 0) { index -= 1; update(); }
  }

  if (nextBtn) nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    next();
  });

  if (prevBtn) prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    prev();
  });

  // Swipe
  let startX = 0;
  let isDown = false;

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDown = true;
  }, { passive: true });

  carousel.addEventListener("touchend", (e) => {
    if (!isDown) return;
    isDown = false;

    const endX = (e.changedTouches && e.changedTouches[0])
      ? e.changedTouches[0].clientX
      : startX;

    const dx = endX - startX;
    const threshold = 40;

    if (dx < -threshold) next();
    if (dx > threshold) prev();
  });
});

// Rotation des étoiles au mouvement de la souris
const stars = document.querySelectorAll('.animated-welcome img');

document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
  
  stars.forEach(star => {
    star.style.transform = `rotate(${angle}deg)`;
  });
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".carousel__track");
  const slides = Array.from(carousel.querySelectorAll(".carousel__slide"));
  const nextBtn = carousel.querySelector(".carousel__next");
  const prevBtn = carousel.querySelector(".carousel__prev");

  if (!track || slides.length === 0) return;

  // Remplace le texte par les images
  if (prevBtn) prevBtn.innerHTML = '<img src="assets/img/logo/left.png" alt="Précédent">';
  if (nextBtn) nextBtn.innerHTML = '<img src="assets/img/logo/right.png" alt="Suivant">';
});