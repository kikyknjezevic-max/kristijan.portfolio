const image = document.querySelector('.example-image');
const overlay = document.querySelector('.hidden-view');
const closeButton = document.querySelector('.close-button');

const games = [
  { name: 'Elden Ring', genre: 'RPG', price: 59, rating: 9.5, inStock: true },
  { name: 'Minecraft', genre: 'Sandbox', price: 29, rating: 9.0, inStock: true },
  { name: 'Cyberpunk 2077', genre: 'RPG', price: 49, rating: 8.5, inStock: false },
  { name: 'Counter-Strike 2', genre: 'FPS', price: 0, rating: 8.0, inStock: true },
  { name: 'The Witcher 3', genre: 'RPG', price: 39, rating: 9.5, inStock: true },
  { name: 'Stardew Valley', genre: 'Simulation', price: 15, rating: 9.0, inStock: true },
  { name: 'Call of Duty', genre: 'FPS', price: 69, rating: 7.5, inStock: false },
  { name: 'Hades', genre: 'Roguelike', price: 25, rating: 9.0, inStock: true },
  { name: 'Forza Horizon 5', genre: 'Racing', price: 49, rating: 8.5, inStock: false },
  { name: 'Baldurs Gate 3', genre: 'RPG', price: 59, rating: 9.5, inStock: true }
];

let tempArray = '';

tempArray = games.filter(product => product.name.toLowerCase().includes('cy'));
console.log(tempArray);

image.addEventListener('click', () => {
  overlay.style.display = 'flex';
  
});

closeButton.addEventListener('click', () => {
    overlay.style.display = 'none';
  }
 );

 overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    overlay.style.display = 'none';
  }
  });
