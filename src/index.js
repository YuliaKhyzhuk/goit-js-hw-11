// import './css/styles.css';
import './css/gallery.css';
import { PixabayAPI } from './js/pixabay-api.js';
import { createGalleryCards } from './js/templates/gallery-cards.js';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchFormEl = document.querySelector('#search-form');
const galleryDivEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const pixabayAPI = new PixabayAPI();

let lightboxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 1000,
});

loadMoreBtnEl.classList.add('is-hidden');



const onSearchFormSubmit = async event => {
  event.preventDefault();

  pixabayAPI.query = event.target.elements.user_search_query.value.trim();

  pixabayAPI.page = 1;

  try {
    const response = await pixabayAPI.fetchPhotosByQuery();

    const { data } = response;

    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      event.target.reset();

      galleryDivEl.innerHTML = '';      

      loadMoreBtnEl.classList.add('is-hidden');

      return;
    }

    if (data.totalHits > 40) {
      loadMoreBtnEl.classList.remove('is-hidden');
    }

    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    galleryDivEl.innerHTML = createGalleryCards(data.hits);

    lightboxGallery.on('show.simplelightbox');
      lightboxGallery.refresh();
  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnClick = async event => {
  pixabayAPI.page += 1;

  try {
    const response = await pixabayAPI.fetchPhotosByQuery();
    const { data } = response;

    if (pixabayAPI.page === Math.ceil(data.totalHits / 40)) {
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
      loadMoreBtnEl.classList.add('is-hidden');
    }
    galleryDivEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
    
    lightboxGallery.on('show.simplelightbox');
    lightboxGallery.refresh();

  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
