/*** Create a list that holds all of your cards ***/
const memoryDeck = document.querySelector('.deck');
let memoryCard = memoryDeck.querySelectorAll('li.card');
let memoryCardList = [...memoryCard];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*function for new game*/
function startNewGame() {
memoryCardList = shuffle(memoryCardList);
  for (memoryCard of memoryCardList) {
    memoryCardList.forEach(function() {
      memoryDeck.appendChild(memoryCard);
    });
    memoryCard.classList.remove('open', 'show', 'match');
    modalWindowClose();
    resetScoreCounter();
    resetMovesCounter();
    resetTimer();
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

/*new game*/
function cardIsOpen() {
  for (memoryCard of memoryCardList) {
    memoryCard.addEventListener('click', playGame);
  }
}


function playGame(e) {
  e.target.classList.add('open', 'show');
  compareOpenCards.push(this);
  compare();
  scoreCounter();
  countMoves();
  if (counter === 0) {
    time = setInterval(playTime, 1000);
  }matchedCards
}

/*** Compare pairs of cards ***/
let compareOpenCards = []; //temporary collector of open cards
let matchCollector = []; //temporary collector of matching pairs of cards

function compare() {
  if (compareOpenCards.length === 2) {
    if (compareOpenCards[0].innerHTML !== compareOpenCards[1].innerHTML) {
      for (memoryCard of memoryCardList) {
        memoryCard.removeEventListener('click', playGame);
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
  matchCollector.push(compareOpenCards[0]);
  compareOpenCards[1].classList.remove('open', 'show');
  compareOpenCards[1].classList.toggle('match');
  matchCollector.push(compareOpenCards[1]);
  compareOpenCards = [];
  if (matchCollector.length === 16) {
    stopTimer();
    setTimeout(function() {
      displayMessage();
      matchCollector = [];
    }, 600);
  }
}


function mismatchedCards() {
  compareOpenCards[0].classList.remove('open', 'show');
  compareOpenCards[1].classList.remove('open', 'show');
  compareOpenCards = []; //no match -> empty array
}

/*count the moves of the player*/
const moves = document.querySelector('.moves');
let counter = 0;

function countMoves() {
  if (compareOpenCards.length % 2 === 0) {
    counter++;
    moves.innerHTML = counter;
  }
}

function resetMovesCounter() {
  moves.innerHTML = '0';
  counter = 0;
}

/*timer counter*/
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

function resetTimer() {
  stopTimer();
  timerCounter.innerHTML = '00:00';
  secs = 0;
  mins = 0;
}


/*** Stars ***/
let stars = document.querySelectorAll('.stars li');
let starRate = [...stars];

function scoreCounter() {
  if (counter === 15) {
    starRate[0].classList.add('hide');
  } else if (counter === 24) {
    starRate[1].classList.add('hide');
  } else if (counter >= 40) {
    starRate[2].classList.add('hide');
  }
}

function resetScoreCounter() {
  for (stars of starRate) {
    stars.classList.remove('hide');
  }
}

/*** Modal Box ***/
const modal = document.querySelector('#modal-window');
const closeBtn = document.querySelector('.close');
let starWon = document.querySelector('.star-m span');
let t = document.querySelector('.time-m span');
let finalStars = document.querySelector('.stars');

function displayMessage() {
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

/*restart game*/
const restart = document.querySelector('.restart');
restart.addEventListener('click', startNewGame);


window.onload = startNewGame();
cardIsOpen();
playAgain();
closeBtn.addEventListener('click', modalWindowClose);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
