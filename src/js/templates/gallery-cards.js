export const createGalleryCards = cardsInfo => {
  const galleryCardArr = cardsInfo.map(el => {
    // console.log(el);
    return `
    <div class="photo-card">
      <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" class="gallery-img" />
      <div class="info">
        <p class="info-item">
          <b>Likes ${el.likes}</b>
        </p>
        <p class="info-item">
          <b>Views ${el.views}</b>
        </p>
        <p class="info-item">
          <b>Comments ${el.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads ${el.downloads}</b>
        </p>
      </div>
    </div>
          `;
  });

  return galleryCardArr.join('');
  console.log('gallery');
};
