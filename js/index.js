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


/* const createrGalleryItem = galleryItems.map((img, index) => {
  const galleryItem = document.createElement('li');
  const link = document.createElement('a');
  const image = document.createElement('img');

  galleryItem.classList.add("gallery__item");
  link.classList.add("gallery__link");
  image.classList.add("gallery__image");
  image.dataset.index = `${index}`;

  link.setAttribute('href', img.original);
  image.setAttribute('src', img.preview);
  image.setAttribute('alt', img.description);
  image.setAttribute('data-source', img.original);
  link.appendChild(image);
  galleryItem.appendChild(link);
  return galleryItem;
});

gallery.append(...createrGalleryItem); */


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
  modalImg.src = e.target.dataset.source;
  modalImg.alt = e.target.alt;

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

  if (index === galleryArray.length - 1) {
    index = 0;
    setImgAttr(index, 0);
    return;
  };
  
  setImgAttr(index, 1);
};

function moveByArrowLeft() {
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

function closeModal() {
  modal.classList.remove("is-open");
  modalImg.src = "";
};
