import axios from 'axios';

export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com/';
  static API_KEY = '15090936-31f0088bbfe3b64ca1007e23b';

  constructor() {
    this.page = null;
    this.query = null;
  }

  fetchPhotosByQuery() {
    const searchParams = {
      params: {
        key: PixabayAPI.API_KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 40,
      },
    };

    return axios.get(`${PixabayAPI.BASE_URL}/api/`, searchParams);
  }
}
