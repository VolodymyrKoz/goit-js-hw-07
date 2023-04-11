import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");

// Create and render gallery items
const createGalleryItem = ({ preview, original, description }) => `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
    </a>
  </li>
`;

galleryList.innerHTML = galleryItems.map(createGalleryItem).join("");

// Open lightbox on image click
const onGalleryItemClick = (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;

  const imgSrc = event.target.dataset.source;
  const imgAlt = event.target.alt;
  const lightboxImg = document.querySelector(".lightbox__image");

  lightboxImg.src = imgSrc;
  lightboxImg.alt = imgAlt;

  const lightbox = basicLightbox.create(document.querySelector(".lightbox"), {
    onClose: () => {
      lightboxImg.src = "";
      lightboxImg.alt = "";
    },
  });

  lightbox.show();
};

galleryList.addEventListener("click", onGalleryItemClick);

// Close lightbox on ESC press
const onEscPress = (event) => {
  const ESC_KEYCODE = "Escape";
  if (event.code === ESC_KEYCODE) {
    const lightbox = basicLightbox.get();
    if (lightbox.visible()) {
      lightbox.close();
    }
  }
};

document.addEventListener("keydown", onEscPress);
