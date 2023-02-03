import './css/styles.css';
import './css/gallery.css';
import { PixabayAPI } from './js/pixabay-api.js';
import { createGalleryCards } from './js/templates/gallery-cards.js';
import Notiflix from 'notiflix';

const searchFormEl = document.querySelector('#search-form');
const galleryDivEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const pixabayAPI = new PixabayAPI();
console.log(pixabayAPI);

loadMoreBtnEl.classList.add('is-hidden');

const onSearchFormSubmit = async event => {
  event.preventDefault();

  pixabayAPI.query = event.target.elements.user_search_query.value.trim();
  //   console.log(pixabayAPI.query);
  pixabayAPI.page = 1;

  try {
    const response = await pixabayAPI.fetchPhotosByQuery();
    // console.log('from fetch', response);

    const { data } = response;
    // console.log('const data', data);
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      event.target.reset();

      galleryDivEl.innerHTML = '';

      loadMoreBtnEl.classList.add('is-hidden');

      return;
    }

    if (data.hits.length > 10) {
      loadMoreBtnEl.classList.remove('is-hidden');
    }

    galleryDivEl.innerHTML = createGalleryCards(data.hits);
    console.log('data.hits:', data.hits);
  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnClick = async event => {
  pixabayAPI.page += 1;

  try {
    const response = await pixabayAPI.fetchPhotosByQuery();
    const { data } = response;

    galleryDivEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
