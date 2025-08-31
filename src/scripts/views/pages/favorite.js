import FavoriteRestaurantIdb from '../../data/database';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
        <section class="headline" id="headline">
        <h2>List Favorite Restaurant</h2>
        </section>
  
          <section class="content" id="list">
        
        </section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantContainer = document.querySelector('#list');
    if (restaurants.length < 1) {
      restaurantContainer.innerHTML = '<p class="textfav">There are no favorite restaurants yet</p>';
    } else {
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }
  },
};

export default Like;
