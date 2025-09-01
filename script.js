document.addEventListener("DOMContentLoaded", () => {
  const thumbs = document.querySelectorAll(".gallery .image img");      
  const previewBox = document.querySelector(".preview-box");          
  const previewImg = document.querySelector(".preview-box .img-box img");
  const closeBtn = document.querySelector(".preview-box .close-btn");
  const prevBtn = document.querySelector("#prevBtn") || document.querySelector(".preview-box .slide.prev");
  const nextBtn = document.querySelector("#nextBtn") || document.querySelector(".preview-box .slide.next");
  const currentEl = document.querySelector(".preview-box .current-img");
  const totalEl = document.querySelector(".preview-box .total-img");

  if (!thumbs || thumbs.length === 0) return;
  if (totalEl) totalEl.textContent = thumbs.length;

  let currentIndex = 0;
  function openPreview(index) {
    currentIndex = index;
    const src = thumbs[currentIndex].src;
    if (previewImg) previewImg.src = src;
    if (currentEl) currentEl.textContent = currentIndex + 1;
    if (previewBox) previewBox.classList.add("show");
  }
  
  function closePreview() {
    if (previewBox) previewBox.classList.remove("show");
  }

  thumbs.forEach((img, i) => {
    img.addEventListener("click", (e) => {
      openPreview(i);
    });
  });

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

  if (closeBtn) closeBtn.addEventListener("click", closePreview);
  
  if (previewBox) {
    previewBox.addEventListener("click", (e) => {
      if (e.target === previewBox) closePreview();
    });
  }

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

