/* eslint-disable prefer-const */
import { async } from 'regenerator-runtime';
import Toastify from 'toastify-js';
import UrlParser from '../../routes/url-parser';
import DicodingDB from '../../data/dicodingdb';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import CONFIG from '../../globals/config';

let name = '';
let review = '';
let restaurants = {};

const changeName = (e) => {
  name = e.target.value;
};

const changeReview = (e) => {
  review = e.target.value;
};

const Detail = {
  async render() {
    return `
    <div id="likeButtonContainer"></div>
      <div id="restaurant" class="restaurant"></div>
      <div class="inputReview">
          <form id="formReview">
            <input id="inputName" type="text" placeholder="Nama" />
            <input id="inputReview" type="text" placeholder="Review" />
            <button type="submit">Submit</button>
          </form>
      </div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const nameInput = document.getElementById('inputName');
    const reviewInput = document.getElementById('inputReview');
    const reviewForm = document.getElementById('formReview');
    const restaurantContainer = document.querySelector('#restaurant');
    const uri = window.location.hash.split('/');
    const idResto = uri[2];

    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${CONFIG.BASE_URL}review`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: idResto,
            name,
            review,
          }),
        });
        const responseJson = await response.json();
        const { error, message } = await responseJson;
        if (!error) {
          Toastify({
            text: message,
            style: {
              background: 'linear-gradient(to right, #00b09b, #96c93d)',
            },
          }).showToast();
        } else {
          Toastify({
            text: message,
            style: {
              background: 'linear-gradient(to right, #ff0000, #ff1493)',
            },
          }).showToast();
          throw new Error(message);
        }
      } catch (error) {
        console.error(error);
      }

      restaurants = await DicodingDB.DetailRestaurant(idResto);
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurants);
    };

    nameInput.addEventListener('change', changeName);
    reviewInput.addEventListener('change', changeReview);
    reviewForm.addEventListener('submit', onSubmit);
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    restaurants = await DicodingDB.DetailRestaurant(url.id);
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurants);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: { ...restaurants },
    });
  },
};

export default Detail;
