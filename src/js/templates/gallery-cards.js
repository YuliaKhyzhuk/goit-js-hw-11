export const createGalleryCards = cardsInfo => {
  const galleryCardArr = cardsInfo.map(el => {
    // console.log(el);
    return `
    <div class="photo-card">
      <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" class="gallery-img" />
      <div class="info">
        <p class="info-item">
          <b>Likes </b>${el.likes}
        </p>
        <p class="info-item">
          <b>Views </b>${el.views} 
        </p>
        <p class="info-item">
          <b>Comments </b>${el.comments}
        </p>
        <p class="info-item">
          <b>Downloads </b>${el.downloads}
        </p>
      </div>
    </div>
          `;
  });

  return galleryCardArr.join('');
  console.log('gallery');
};
