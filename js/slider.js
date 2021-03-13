import galleryItems from "./gallery-items.js";

const galleryArray = galleryItems.map(img => {
  return img.description;
});

// Переключение по стрелкам
export function moveByArrowRight() {
  let index = galleryArray.indexOf(modalImg.alt);

  if (index === galleryArray.length - 1) {
    index = 0;
    setImgAttr(index, 0);
    return;
  };
  
  setImgAttr(index, 1);
};

export function moveByArrowLeft() {
  let index = galleryArray.indexOf(modalImg.alt);

  if (index === 0) {
    index = galleryArray.length - 1;
    setImgAttr(index, 0);
    return;
  };

  setImgAttr(index, -1);
  
};

function setImgAttr(index, step) {
  modalImg.src = galleryItems[index + step].original;
  modalImg.alt = galleryItems[index + step].description;
};


