/*ARRAY FOR ALL CARDS*/
const memoryDeck = document.querySelector('.deck');
let memoryCard = memoryDeck.querySelectorAll('li.card');
let memoryCardList = [...memoryCard];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

/*** Shuffle function from http://stackoverflow.com/a/2450976 ***/
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
    time = setInterval(playTime, 1000);
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
      setTimeout(mismatchedCards, 400);
      setTimeout(cardIsOpen, 550);
    } else if (compareOpenCards[0].innerHTML === compareOpenCards[1].innerHTML) {
      matchedCards();
    }
  }
}

function matchedCards() {
  compareOpenCards[0].classList.remove('open', 'show');
  compareOpenCards[0].classList.toggle('match');
  checkIfMatched.push(compareOpenCards[0]);
  compareOpenCards[1].classList.remove('open', 'show');
  compareOpenCards[1].classList.toggle('match');
  checkIfMatched.push(compareOpenCards[1]);
  compareOpenCards = [];
  if (checkIfMatched.length === 16) {
    stopTimer();
    setTimeout(function() {
      gameNotification();
      checkIfMatched = [];
    }, 600);
  }
}

function mismatchedCards() {
  compareOpenCards[0].classList.remove('open', 'show');
  compareOpenCards[1].classList.remove('open', 'show');
  compareOpenCards = []; //no match -> empty array
}

/*COUNT THE MOVES OF THE PLAYER*/
const moves = document.querySelector('.moves-done');
let movesCounter = 0;

function howManyMoves() {
  if (compareOpenCards.length % 2 === 0) {
    movesCounter++;
    moves.innerHTML = movesCounter;
  }
}

function restartMovesCounter() {
  moves.innerHTML = '0';
  movesCounter = 0;
}

/*TIMER COUNTER*/
let timerCounter = document.querySelector('.timer');
let mins = 0;
let secs = 0;
let time;

function playTime() {
  secs++;
  if ((secs < 10) && (mins < 10)) {
    timerCounter.innerHTML = `0${mins} : 0${secs}`;
  } else if ((secs >= 10) && (mins < 10)) {
    timerCounter.innerHTML = `0${mins} : ${secs}`;
  } else {
    timerCounter.innerHTML = `${mins} : ${secs}`;
  }
  if (secs > 59) {
    mins++;
    secs = 0;
  }
  if (mins > 29) {
    stopTimer();
  }
}

function stopTimer() {
  clearInterval(time);
}

function restartTimer() {
  stopTimer();
  timerCounter.innerHTML = '00:00';
  secs = 0;
  mins = 0;
}

/*CALCULATE THE SCORE*/
let stars = document.querySelectorAll('.stars li');
let starRate = [...stars];

function scoreCounter() {
  if (movesCounter === 10) {
    starRate[0].classList.add('hide');
  } else if (movesCounter === 20) {
    starRate[1].classList.add('hide');
  } else if (movesCounter >= 30) {
    starRate[2].classList.add('hide');
  }
}

function restartScoreCounter() {
  for (stars of starRate) {
    stars.classList.remove('hide');
  }
}

/*MODAL TRIGGER*/
const modal = document.querySelector('#modal-window');
const closeBtn = document.querySelector('.close');
let starWon = document.querySelector('.star-m span');
let t = document.querySelector('.time-m span');
let finalStars = document.querySelector('.stars');

function gameNotification() {
  modal.style.display = 'block';
  addStarsAndTime();
}

function modalWindowClose() {
  modal.style.display = 'none';
}

function addStarsAndTime() {
  starWon.innerHTML = finalStars.innerHTML;
  t.innerHTML = timerCounter.innerHTML;
}

/*** Play Again button ***/
const btnRestart = document.querySelector('.button');

function playAgain() {
  btnRestart.addEventListener('click', startNewGame);
}

/*START NEW GAME*/
const restart = document.querySelector('.restart');
restart.addEventListener('click', startNewGame);

window.onload = startNewGame();
cardIsOpen();
playAgain();
closeBtn.addEventListener('click', modalWindowClose);
