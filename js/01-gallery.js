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

// Initialize BasicLightbox
const onEscPress = (event, instance) => {
  const ESC_KEYCODE = "Escape";
  if (event.code === ESC_KEYCODE) {
    instance.close();
  }
};

const lightbox = basicLightbox.create(
  `
  <div class="lightbox">
    <div class="lightbox__content">
      <img class="lightbox__image" src="" alt="" />
    </div>
  </div>
`,
  {
    onShow: (instance) => {
      // Close lightbox on overlay click
      const overlay = instance.element().querySelector(".lightbox__overlay");
      overlay.addEventListener("click", instance.close);

      // Close lightbox on ESC press
      document.addEventListener("keydown", (event) =>
        onEscPress(event, instance)
      );
    },
    onClose: (instance) => {
      // Remove event listeners
      const overlay = instance.element().querySelector(".lightbox__overlay");
      overlay.removeEventListener("click", instance.close);
      document.removeEventListener("keydown", (event) =>
        onEscPress(event, instance)
      );

      // Clear image source and alt text
      const lightboxImg = instance.element().querySelector(".lightbox__image");
      lightboxImg.src = "";
      lightboxImg.alt = "";
    },
  }
);

// Open lightbox on image click
const onGalleryItemClick = (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;

  const imgSrc = event.target.parentNode.href;
  const imgAlt = event.target.alt;

  lightbox.element().querySelector(".lightbox__image").src = imgSrc;
  lightbox.element().querySelector(".lightbox__image").alt = imgAlt;
  lightbox.show();
};

galleryList.addEventListener("click", onGalleryItemClick);

const galleryImage = document.querySelector(".gallery__image");
galleryImage.addEventListener("click", () => {
  lightbox.show();
});
