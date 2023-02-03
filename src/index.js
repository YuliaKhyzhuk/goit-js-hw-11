import './css/styles.css';
import './css/gallery.css';
import { PixabayAPI } from './js/pixabay-api.js';
import { createGalleryCards } from './js/templates/gallery-cards.js';
import Notiflix from 'notiflix';

console.log('test');

const searchFormEl = document.querySelector('#search-form');
const galleryListEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const pixabayAPI = new PixabayAPI();
console.log(pixabayAPI);

const onSearchFormSubmit = async event => {
  event.preventDefault();
};

const onLoadMoreBtnClick = async event => {};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
