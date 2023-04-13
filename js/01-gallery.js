import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");

// Create and render gallery items
const createGalleryItem = ({ preview, original, description }) => `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
  </li>
`;

galleryList.innerHTML = galleryItems.map(createGalleryItem).join("");

// Initialize BasicLightbox for each image
const instances = galleryItems.map(({ original }) =>
  basicLightbox.create(`
    <img src="${original}" width="800" height="600">
  `)
);

// Show corresponding instance when image is clicked
galleryList.addEventListener("click", (event) => {
  event.preventDefault();
  const { target } = event;
  if (target.classList.contains("gallery__image")) {
    const index = Array.from(target.parentNode.parentNode.children).indexOf(
      target.parentNode
    );
    instances[index].show();
    document.addEventListener("keydown", (event) =>
      onEscPress(event, instances[index])
    );
  }
});

// Close instance on Esc key press
const onEscPress = (event, instance) => {
  const ESC_KEYCODE = "Escape";
  if (event.code === ESC_KEYCODE) {
    instance.close();
    document.removeEventListener("keydown", (event) =>
      onEscPress(event, instance)
    );
  }
};
