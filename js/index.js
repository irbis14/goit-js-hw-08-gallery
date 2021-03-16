import galleryItems from "./gallery-items.js";

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');
const modalBtn = document.querySelector('button[data-action="close-lightbox"]');

// Cоздание разметки

const createrGalleryItem = (image) => {
    const { preview, original, description } = image;
    const galleryItem = 
    `<li class="gallery__item">
        <a
        class="gallery__link"
        href="${original}"
        >
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
             />
        </a>
    </li>`;
  return galleryItem;
};

const createGallery = galleryItems.map(createrGalleryItem).join('');

gallery.insertAdjacentHTML('afterbegin', createGallery);


// ОТКРЫТИЕ МОДАЛКИ

gallery.addEventListener('click', (e) => {
  e.preventDefault();
  
  if (e.target.nodeName === "IMG") {
    openModal(e);
  };
    
  // Закрытие модалки по бэкдропу
  modal.addEventListener('click', (e) => {
    if (e.target.nodeName !== "IMG") {
      closeModal();
    };
  });
  
  // Закрытие модалки по Escape
  window.addEventListener('keydown', (e) => {
    if (e.code === "Escape") {
      closeModal();
    };
  });
    
  // Закрытие модалки по кнопке
  modalBtn.addEventListener('click', closeModal);
});

function openModal(e) {
  modal.classList.add("is-open");
  setImgAttr(e.target.dataset.source, e.target.alt);

  // Пролистывание вправо
  window.addEventListener('keydown', (e) => {
    if (e.code === "ArrowRight") {
      moveByArrowRight();
    };
  });

  // Пролистывание влево
  window.addEventListener('keydown', (e) => {
    if (e.code === "ArrowLeft") {
      moveByArrowLeft();
    };
  });
};


// СЛАЙДЕР

const galleryArray = galleryItems.map(img => {
  return img.description;
});

function moveByArrowRight() {
  let index = galleryArray.indexOf(modalImg.alt);
  let step = 1;

  if (index === galleryArray.length - 1) {
    index = 0;
    step = 0;
    setImgAttr(
    galleryItems[index + step].original,
    galleryItems[index + step].description
    );
    return;
  };
  
  setImgAttr(
  galleryItems[index + step].original,
  galleryItems[index + step].description
  );
};

function moveByArrowLeft() {
  let index = galleryArray.indexOf(modalImg.alt);
  let step = -1;
 
  if (index === 0) {
    index = galleryArray.length - 1;
    step = 0;
    setImgAttr(
    galleryItems[index + step].original,
    galleryItems[index + step].description
    );
    
    return;
  };

  setImgAttr(
  galleryItems[index + step].original,
  galleryItems[index + step].description
  );
  
};

function setImgAttr(src, alt) {
modalImg.src = src;
modalImg.alt = alt;
}

function closeModal() {
  modal.classList.remove("is-open");
  modalImg.src = "";
};
