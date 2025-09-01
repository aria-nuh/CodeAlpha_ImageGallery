document.addEventListener("DOMContentLoaded", () => {
  // --- selectors ---
  const thumbs = document.querySelectorAll(".gallery .image img");      // thumbnails (array)
  const previewBox = document.querySelector(".preview-box");           // overlay
  const previewImg = document.querySelector(".preview-box .img-box img");
  const closeBtn = document.querySelector(".preview-box .close-btn");
  // try to find prev/next by id first, then fallback to .slide.prev/.slide.next
  const prevBtn = document.querySelector("#prevBtn") || document.querySelector(".preview-box .slide.prev");
  const nextBtn = document.querySelector("#nextBtn") || document.querySelector(".preview-box .slide.next");
  const currentEl = document.querySelector(".preview-box .current-img");
  const totalEl = document.querySelector(".preview-box .total-img");

  if (!thumbs || thumbs.length === 0) return; // nothing to do

  // set total count
  if (totalEl) totalEl.textContent = thumbs.length;

  let currentIndex = 0;

  // show preview for index
  function openPreview(index) {
    currentIndex = index;
    const src = thumbs[currentIndex].src;
    if (previewImg) previewImg.src = src;
    if (currentEl) currentEl.textContent = currentIndex + 1;
    if (previewBox) previewBox.classList.add("show");
  }

  // close preview
  function closePreview() {
    if (previewBox) previewBox.classList.remove("show");
  }

  // hook thumbnail clicks
  thumbs.forEach((img, i) => {
    img.addEventListener("click", (e) => {
      openPreview(i);
    });
  });

  // prev / next (with stopPropagation so click won't bubble to overlay)
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
      openPreview(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % thumbs.length;
      openPreview(currentIndex);
    });
  }

  // close button
  if (closeBtn) closeBtn.addEventListener("click", closePreview);

  // click outside (on overlay) closes preview
  if (previewBox) {
    previewBox.addEventListener("click", (e) => {
      if (e.target === previewBox) closePreview();
    });
  }

  // keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!previewBox || !previewBox.classList.contains("show")) return;
    if (e.key === "Escape") closePreview();
    else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
      openPreview(currentIndex);
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % thumbs.length;
      openPreview(currentIndex);
    }
  });
});
