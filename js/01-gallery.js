import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);
// Масив зображень
const galleryItems = [
  {
    preview: 'img/preview-1.jpg',
    fullview: 'img/fullview-1.jpg',
    description: 'Description 1',
  },
  {
    preview: 'img/preview-2.jpg',
    fullview: 'img/fullview-2.jpg',
    description: 'Description 2',
  },
  {
    preview: 'img/preview-3.jpg',
    fullview: 'img/fullview-3.jpg',
    description: 'Description 3',
  },
];

// Створення розмітки для кожного елемента галереї
function createGalleryItemMarkup(item) {
  return `
    <li class="gallery__item">
      <a href="#" class="gallery__link">
        <img class="gallery__image" src="${item.preview}" data-source="${item.fullview}" alt="${item.description}">
      </a>
    </li>
  `;
}

// Створення розмітки всієї галереї
function renderGalleryItems() {
  const galleryList = document.querySelector('.gallery');
  const galleryMarkup = galleryItems.map(item => createGalleryItemMarkup(item)).join('');
  galleryList.innerHTML = galleryMarkup;
}

// Відкриття модального вікна з повнорозмірним зображенням
function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;
  const fullviewUrl = event.target.dataset.source;
  const instance = basicLightbox.create(`
    <img src="${fullviewUrl}" width="800" height="600">
  `);
  instance.show();

  // Додавання слухача події keydown для закриття модального вікна по клавіші Escape
  document.addEventListener('keydown', closeModalOnEsc);
}

// Закриття модального вікна по клавіші Escape
function closeModalOnEsc(event) {
  if (event.code === 'Escape') {
    basicLightbox.close();
    document.removeEventListener('keydown', closeModalOnEsc);
  }
}

// Рендеринг галереї
renderGalleryItems();

// Додавання слухача події кліку на ul.gallery
const galleryList = document.querySelector('.gallery');
galleryList.addEventListener('click', openModal);
