document.addEventListener("DOMContentLoaded", () => {
  const thumbs = document.querySelectorAll(".gallery .image img");
  const previewBox = document.querySelector(".preview-box");
  const previewImg = document.querySelector("#galleryImage");
  const closeBtn = document.querySelector(".close-btn");
  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");
  const currentEl = document.querySelector(".current-img");
  const totalEl = document.querySelector(".total-img");

  if (!thumbs.length) return;

  totalEl.textContent = thumbs.length;
  let currentIndex = 0;

  function openPreview(index) {
    currentIndex = index;
    previewImg.src = thumbs[currentIndex].src;
    currentEl.textContent = currentIndex + 1;
    previewBox.classList.add("show");
  }

  function closePreview() {
    previewBox.classList.remove("show");
  }

  thumbs.forEach((img, i) => {
    img.addEventListener("click", () => openPreview(i));
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
    openPreview(currentIndex);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % thumbs.length;
    openPreview(currentIndex);
  });

  closeBtn.addEventListener("click", closePreview);

  previewBox.addEventListener("click", (e) => {
    if (e.target === previewBox) closePreview();
  });

  document.addEventListener("keydown", (e) => {
    if (!previewBox.classList.contains("show")) return;
    if (e.key === "Escape") closePreview();
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
      openPreview(currentIndex);
    }
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % thumbs.length;
      openPreview(currentIndex);
    }
  });
});
