'use strict';

// DOM elements
const bodyEl = document.body;
const btnNew = document.querySelector('.again');
const btnCheck = document.querySelector('.check');
const guessEl = document.querySelector('.guess');
const chancesEl = document.querySelector('.chances');
const scoreEl = document.querySelector('.score');
const totalScoreEl = document.querySelector('.highscore');

let secretNumber,
  chances,
  score,
  turn,
  totalscore,
  newGame = true,
  playing = true;

//////////////////////////
// UI Functions
//////////////////////////
const changeSecretNumber = (msg, size) => {
  document.querySelector('.number').textContent = msg;
  document.querySelector('.number').style.width = size;
};

const displayMessage = msg => {
  document.querySelector('.message').textContent = msg;
};

const changeBgColor = newColor => {
  bodyEl.style.backgroundColor = newColor;
};

const refreshScoreDisplay = () => {
  chancesEl.textContent = chances;
  scoreEl.textContent = score;
  totalScoreEl.textContent = totalscore;
};

//////////////////////////
// Game Logic
//////////////////////////

// Start new round
const newRound = () => {
  playing = true;
  turn = 1;
  score = 20;
  secretNumber = Math.trunc(Math.random() * score) + 1;

  // Start new game
  if (newGame) {
    newGame = false;
    chances = 8;
    totalscore = 0;
  } else {
    chances += 2;
  }

  // Refresh UI
  changeBgColor('#1D2225');
  changeSecretNumber('?', '15rem');
  displayMessage('Start guessing...');
  refreshScoreDisplay();
  btnNew.textContent = 'Next Number';
  btnNew.classList.add('hidden');
  btnCheck.classList.remove('hidden');
  guessEl.value = '';
};

// Start new round
document.querySelector('.again').addEventListener('click', () => {
  if (!playing) newRound();
});

// Check number
document.querySelector('.check').addEventListener('click', () => {
  if (playing) {
    const guess = Number(guessEl.value);

    if (typeof guess !== 'number') {
      displayMessage('WRONG INPTUT ❌');
    } else if (guess === secretNumber) {
      // Guess is CORRECT!
      playing = false;
      totalscore += score;

      // Update UI
      changeBgColor('#60b347');
      changeSecretNumber(secretNumber, '30rem');
      displayMessage('YOU CHOSE WISELY! 🧙‍♂️');
      refreshScoreDisplay();
      btnNew.classList.remove('hidden');
      btnCheck.classList.add('hidden');
    } else {
      // Guess is WRONG!
      chances -= 1;

      if (chances > 0) {
        score -= turn++;
        displayMessage(guess < secretNumber ? 'TOO LOW! 🔵' : 'TOO HIGH! 🔴');
      } else {
        // GAME OVER
        playing = false;
        newGame = true;
        score = 0;

        // Update UI
        changeBgColor('#e33c3c');
        displayMessage(`FINAL SCORE: ${totalscore}`);
        btnNew.textContent = 'New Game';
        btnNew.classList.remove('hidden');
        btnCheck.classList.add('hidden');
      }

      refreshScoreDisplay();
    }
  }
});

newRound();
