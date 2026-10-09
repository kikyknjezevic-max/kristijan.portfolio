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

let score = JSON.parse(localStorage.getItem('score')) ||
{
  wins: 0,
  losses: 0,
  ties: 0
}
updateScoreElement();

/* 
 
if (score === null) { 
score = { 
  wins: 0, 
  losses: 0, 
  ties: 0 
} 
} 
 
*/
let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const startAutoPlay = pickComputerMove();
      playGame(startAutoPlay);
    }, 1000);
    jsAutoplay.innerHTML = "Stop";
    isAutoPlaying = true;
  }
  else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    jsAutoplay.innerHTML = 'Auto Play';
  }
}

const jsRock = document.querySelector('.js-rock');
jsRock.addEventListener('click', () => {
  playGame('rock');
});

const jsPaper = document.querySelector('.js-paper');
jsPaper.addEventListener('click', () => {
  playGame('paper');
});

const jsScissors = document.querySelector('.js-scissors');
jsScissors.addEventListener('click', () => {
  playGame('scissors');
});

const jsReset = document.querySelector('.js-reset');
jsReset.addEventListener('click', () => {
  score.wins = 0; 
  score.losses = 0; 
  score.ties = 0; 
  localStorage.removeItem('score'); 
  updateScoreElement(); 
  document.querySelector('.js-moves').innerHTML = `You reset the score!`;
});

const jsAutoplay = document.querySelector('.js-autoplay');
jsAutoplay.addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  }
  else if (event.key === 'p') {
    playGame('paper');
  }
  else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();


  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }
  else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  }

  else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') { score.wins += 1 }
  else if (result === 'You lose.') { score.losses += 1 }
  else if (result === 'Tie.') { score.ties += 1 }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You picked <img class="rock" src="icons/${playerMove}-icon.png" style="width: 30px;">Computer picked <img class="rock" src="icons/${computerMove}-icon.png" style="width: 30px;">.`;

  console.log(`You picked ${playerMove}. Computer picked ${computerMove} 
Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};


function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
};



