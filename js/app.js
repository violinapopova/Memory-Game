/*ARRAY FOR ALL CARDS*/
const memoryDeck = document.querySelector('.deck');
let memoryCard = memoryDeck.querySelectorAll('li.card');
let memoryCardList = [...memoryCard];

/*FUNCTION FOR NEW GAME*/
function startNewGame() {
memoryCardList = shuffle(memoryCardList);
  for (memoryCard of memoryCardList) {
    memoryCardList.forEach(function() {
      memoryDeck.appendChild(memoryCard);
    });
    memoryCard.classList.remove('open', 'show', 'match');
    modalWindowClose();
    restartScoreCounter();
    restartMovesCounter();
    restartTimer();
  }
}

/*Shuffle function from http://stackoverflow.com/a/2450976 */
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/*NEW GAME*/
function cardIsOpen() {
  for (memoryCard of memoryCardList) {
    memoryCard.addEventListener('click', startCountingTime);
  }
}

function startCountingTime(e) {
  e.target.classList.add('open', 'show');
  compareOpenCards.push(this);
  checkCards();
  scoreCounter();
  howManyMoves();
  if (movesCounter === 0) {
    game = setInterval(startedGame, 1000);
  }
}

/*COLLECTORS FOR OPEN AND MATCHED CARDS*/
let compareOpenCards = [];
let checkIfMatched = [];

function checkCards() {
  if (compareOpenCards.length === 2) {
    if (compareOpenCards[0].innerHTML !== compareOpenCards[1].innerHTML) {
      for (memoryCard of memoryCardList) {
        memoryCard.removeEventListener('click', startCountingTime);
      }
      setTimeout(cardsNotMatching, 400);
      setTimeout(cardIsOpen, 550);
    } else if (compareOpenCards[0].innerHTML === compareOpenCards[1].innerHTML) {
      cardsMatching();
    }
  }
}

function cardsMatching() {
  compareOpenCards[0].classList.remove('open', 'show');
  compareOpenCards[0].classList.toggle('match');
  checkIfMatched.push(compareOpenCards[0]);
  compareOpenCards[1].classList.remove('open', 'show');
  compareOpenCards[1].classList.toggle('match');
  checkIfMatched.push(compareOpenCards[1]);
  compareOpenCards = [];
  if (checkIfMatched.length === 16) {
    stopCountingTime();
    setTimeout(function() {
      gameNotification();
      checkIfMatched = [];
    }, 600);
  }
}

function cardsNotMatching() {
  compareOpenCards[0].classList.remove('open', 'show');
  compareOpenCards[1].classList.remove('open', 'show');
  compareOpenCards = [];
}

/*COUNT THE MOVES OF THE PLAYER*/
const movesDone = document.querySelector('.moves-done');
let movesCounter = 0;

function howManyMoves() {
  if (compareOpenCards.length % 2 === 0) {
    movesCounter++;
    movesDone.innerHTML = movesCounter;
  }
}

function restartMovesCounter() {
  movesDone.innerHTML = '0';
  movesCounter = 0;
}

/*TIMER COUNTER*/
let timerCounter = document.querySelector('.played-time');
let mins = 0;
let secs = 0;
let game;

function startedGame() {
  secs++;
  if ((secs < 10) && (mins < 10)) {
    timerCounter.innerHTML = `0${mins} : 0${secs}`;
  } else if ((secs >= 10) && (mins < 10)) {
    timerCounter.innerHTML = `0${mins} : ${secs}`;
  } else {
    timerCounter.innerHTML = `${mins} : ${secs}`;
  }
  if (secs >= 60) {
    mins++;
    secs = 0;
  }
  if (mins >= 30) {
    stopCountingTime();
  }
}

function stopCountingTime() {
  clearInterval(game);
}

function restartTimer() {
  stopCountingTime();
  timerCounter.innerHTML = '00:00';
  secs = 0;
  mins = 0;
}

/*CALCULATE THE SCORE*/
let stars = document.querySelectorAll('.stars li');
let gameScore = [...stars];

function scoreCounter() {
  if (movesCounter === 10) {
    gameScore[0].classList.add('hide');
  } else if (movesCounter === 20) {
    gameScore[1].classList.add('hide');
  } else if (movesCounter >= 30) {
    gameScore[2].classList.add('hide');
  }
}

function restartScoreCounter() {
  for (stars of gameScore) {
    stars.classList.remove('hide');
  }
}

/*MODAL TRIGGER*/
const modalBox = document.querySelector('#modal-area');
const buttonClose = document.querySelector('.button-close');
let playerScore = document.querySelector('.player-score span');
let time = document.querySelector('.player-time span');
let result = document.querySelector('.stars');

function gameNotification() {
  modalBox.style.display = 'block';
  addStarsAndTime();
}

function modalWindowClose() {
  modalBox.style.display = 'none';
}

function addStarsAndTime() {
  playerScore.innerHTML = result.innerHTML;
  time.innerHTML = timerCounter.innerHTML;
}

/*RESTART GAME*/
const restartButton = document.querySelector('.modal-button');

function startOver() {
  restartButton.addEventListener('click', startNewGame);
}

/*START NEW GAME*/
const restart = document.querySelector('.restart');
restart.addEventListener('click', startNewGame);

window.onload = startNewGame();
cardIsOpen();
startOver();
buttonClose.addEventListener('click', modalWindowClose);
