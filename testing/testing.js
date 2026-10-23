const buttons = document.querySelectorAll('.add-button');
const cartNumber = document.querySelector('.js-cart-quantity');
const cartMsg = document.querySelector('.js-cart-msg');
const cartList = document.querySelector('.cart-list-products');
const totalPriceSection = document.querySelector('.total-price-section');
const cartMiniNumber = document.querySelector('.js-cart-number');
const checkoutButton = document.querySelector('.checkout-button');
const maintenanceOverlay = document.querySelector('#maintenance-overlay');
const closeModal = document.querySelector('#close-modal');
const inputBar = document.querySelector('.js-input');
let searchResult = '';

const cart = JSON.parse(localStorage.getItem('save')) || [];

inputBar.addEventListener('input', () => {
  searchResult = products.filter(product =>
    product.name.toLowerCase().includes(inputBar.value.toLowerCase())
  );

  console.log(searchResult);

  let productHTML = '';

  searchResult.forEach((product, index) => {
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

  attachAddToCartListeners();
});

function renderCartList() {
  let cartHTML = '';

  cart.forEach((product, index) => {
    cartHTML += `
      <div class="cart-container">
        <div class="left-side">
          <img
            class="cart-product-image"
            src="${product.image}"
            alt="${product.name}">
        </div>

        <div class="mid-side">
          <p class="cart-message">
            Product: ${product.name}
            <span class="intext">€${product.price.toFixed(2)}</span>
            <span>Quantity: ${product.quantity}</span>
          </p>
        </div>

        <div class="right-side">
          <button class="remove-button" data-index="${index}">
            Remove
          </button>
        </div>
      </div>`;
  });

  cartList.innerHTML = cartHTML;

  // Count all items, including quantities.
  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  cartNumber.innerHTML = totalItems;
  cartMiniNumber.innerHTML = totalItems;

  cartMsg.innerHTML = cart.length === 0
    ? '<span class="intext">Your cart is empty!</span>'
    : '';
}

function renderCartTotals() {
  let subtotalCents = 0;

  cart.forEach((item) => {
    subtotalCents += Math.round(item.price * 100) * item.quantity;
  });

  const taxCents = Math.round(subtotalCents * 0.1);
  const totalCents = subtotalCents + taxCents;

  totalPriceSection.innerHTML = `
    <p>Subtotal: €${(subtotalCents / 100).toFixed(2)}</p>
    <p>Tax (10%): €${(taxCents / 100).toFixed(2)}</p>
    <p>Total price: €${(totalCents / 100).toFixed(2)}</p>
  `;
}
// Add products to the cart.
function attachAddToCartListeners() {
  const buttons = document.querySelectorAll('.add-button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const matchingItem = cart.find((product) => {
        return product.name === button.dataset.product;
      });

      const something = button.closest('.product-container');
      const quantSelect = something.querySelector('.cs-quant');
      const quantity = Number(quantSelect.value);

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          name: button.dataset.product,
          price: Number(button.dataset.price),
          image: button.dataset.image,
          quantity: quantity
        });
      }

      renderCartList();
      renderCartTotals();


      localStorage.setItem('save', JSON.stringify(cart));

      Swal.fire({
        title: 'Succes!',
        text: `You added ${button.dataset.product}`,
        icon: 'success',
        iconColor: '#fa1e4e',
        confirmButtonText: 'OK',
        confirmButtonColor: '#fa1e4e',
        background: '#0b0b0f',
        color: '#ffffff'
      });
    });
  });
};

attachAddToCartListeners();

// Remove products from the cart.
cartList.addEventListener('click', (event) => {
  const clickedButton = event.target.closest('.remove-button');

  if (!clickedButton) {
    return;
  }

  const index = Number(clickedButton.dataset.index);

  Swal.fire({
    title: 'Remove product?',
    text: 'Are you sure?',
    icon: 'question',
    iconColor: '#fa1e4e',
    showCancelButton: true,
    confirmButtonColor: '#fa1e4e',
    background: '#0b0b0f',
    color: '#ffffff',
    confirmButtonText: 'Remove',
    cancelButtonText: 'Go back'
  }).then((result) => {
    if (result.isConfirmed) {
      cart.splice(index, 1);

      renderCartList();
      renderCartTotals();
    }
  });

  localStorage.setItem('save', JSON.stringify(cart));
});

// Display the initial cart and totals.
renderCartList();
renderCartTotals();

checkoutButton.addEventListener('click', () => {
  maintenanceOverlay.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  maintenanceOverlay.style.display = 'none';
});
