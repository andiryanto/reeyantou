import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurants) => `
<h2 class="content-title-detail">${restaurants.name}</h2>
<img crossorigin="anonymous" class="content-thumbnail-detail" src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}" alt="${restaurants.name}" />
<h3>Information</h3>
<div class="content-rating-detail">Rating : ★${restaurants.rating}/★5</div>
<div class="content-location-detail">Lokasi : ${restaurants.city}</div>
<div class="content-address-detail">Alamat : ${restaurants.address}</div>
<div class="content-category-detail">Kategori : ${restaurants.categories.map((category) => category.name)}</div>
<div class="restaurant-overview">
  <h3>Description</h3>
  <div class="content-description"><p>${restaurants.description}</p></div>
  <h3>Foods Menu</h3>
  <div class="content-description-foods">${restaurants.menus.foods.map((food) => `<div class="content-foods">${food.name}</div>`).join('')}</div>
  <h3>Drinks Menu</h3>
  <div class="content-description-drinks">${restaurants.menus.drinks.map((drink) => `<div>${drink.name}</div>`).join('')}</div>
  <h3>Customer Reviews</h3>
  <div class="content-description">
    ${restaurants.customerReviews.map((review) => `<div>
      <h4 tabindex="0">Name : ${review.name}</h4>
      <p tabindex="0">Date : ${review.date}</p>
      <p tabindex="0">Review : ${review.review}</p>
      </div>`).join('')}
  </div>
</div>  
`;

const createRestaurantItemTemplate = (restaurants) => `
<article class="content-item ${restaurants.Id}">
  <img crossorigin="anonymous" class="content-thumbnail" src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}" alt="${restaurants.name}">
  <div class="content-paragraph">
      <div class="content-location"><p>${restaurants.city}</p><p>★${restaurants.rating}/★5</p></div>
  <div class="content-title"><a class="btn btn-full" href="${`/#/detail/${restaurants.id}`}">${restaurants.name}</a></div>
</article>
  `;

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
