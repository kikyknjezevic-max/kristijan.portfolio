const images = document.querySelectorAll('.big-picture, .small-image-ui, .website-image, .card-image, .small-image, .gym-pic, .lightroom-image, .poster-img');
const popup = document.querySelector('.image-popup');
const popupImage = document.querySelector('.popup-image');

images.forEach(function (image) {

  image.addEventListener('click', function () {

    popupImage.src = image.src;
    popup.style.display = 'flex';

    setTimeout(function () {
      popup.classList.add('show');
    }, 10);

  });

});

popup.addEventListener('click', function () {

  popup.classList.remove('show');

  setTimeout(function () {
    popup.style.display = 'none';
  }, 250);

});


const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", function() {

    navMenu.classList.toggle("active");

});


document.addEventListener("click", function(event) {

    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {

        navMenu.classList.remove("active");

    }

});