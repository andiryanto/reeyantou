import API_ENDPOINT from '../globals/api-endpoint';

const loadingBar = document.getElementById('loadingBar');

class DicodingDB {
  static async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static async HomePage() {
    loadingBar.style.display = 'block';

    // Menunda eksekusi selama 1 detik
    await this.delay(1000);

    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    if (responseJson.message) {
      loadingBar.style.display = 'none';
    }
    return responseJson.restaurants;
  }

  static async DetailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }
}

export default DicodingDB;
