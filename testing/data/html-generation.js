const myArray = [
  {
    name: 'Kristijan',
    gender: 'male'
  }, {
    name: 'Ioana',
    gender: 'female'
  }, {
    name: 'Ted',
    gender: 'male'
  }, {
    name: 'Sophie',
    gender: 'female'
  }
];

let catHTML = '';

myArray.forEach((person) => {
  console.log(person.name);
});

let productHTML = '';

products.forEach((product, index) => {
  productHTML += `<div class="product-container">
  <div class="up-side">
    <img class="shop-image" src="${product.image}">
  </div>  
  <div class="down-side">
      <img class="small-image" src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div>
        <label for="quantity">Quantity:</label>
        <select class="cs-quant" data-index="${index}" id="quantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </div>      
      <h3>${product.name}</h3>
      <p>Price: €${(product.priceCents / 100).toFixed(2)}</p>
      <button class="add-button" data-product="${product.name}" data-price="${product.priceCents / 100}" data-image="${product.image}">Add to Cart</button>
  </div>
  </div>`;
});

document.querySelector('.grid').innerHTML = productHTML;