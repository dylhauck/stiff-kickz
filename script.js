document.addEventListener("DOMContentLoaded", () => {
  // Swatches -> Image swap (per product card)
  // Uses: assets/<data-base>-<color>.png
  document.querySelectorAll(".pcard").forEach((card) => {
    const img = card.querySelector(".pcard-img");
    if (!img) return;

    const base = img.getAttribute("data-base") || "";
    if (!base) return;

    const defaultSrc = img.getAttribute("src");
    const swatches = card.querySelectorAll(".swatch[data-color]");
    if (!swatches.length) return;

    swatches.forEach((swatch) => {
      swatch.addEventListener("click", () => {
        const color = swatch.dataset.color;
        if (!color) return;

        const nextSrc = `assets/${base}-${color}.png`;

        const test = new Image();
        test.onload = () => {
          img.src = nextSrc;
        };
        test.onerror = () => {
          // optional fallback:
          // img.src = defaultSrc;
          console.warn("Missing image:", nextSrc, "Keeping current image.");
        };
        test.src = nextSrc;

        // active swatch state
        swatches.forEach((s) => s.classList.remove("is-active"));
        swatch.classList.add("is-active");
      });
    });

    // default active
    swatches[0].classList.add("is-active");
  });

  // Size chip visual toggle (per product)
  document.querySelectorAll(".pcard").forEach((card) => {
    const chips = card.querySelectorAll(".sizechip");
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
      });
    });

    // optional default active size:
    // chips[0]?.classList.add("is-active");
  });
});
