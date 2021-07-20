'use strict';

const DOM_RangeMsg = document.querySelector('.between');

let secretNumber,
  chances,
  score,
  turn,
  totalscore,
  reset = true,
  locked = true;

const displayMessage = msg => {
  document.querySelector('.message').textContent = msg;
};

const updateChances = newChances => {
  chances = newChances;
  document.querySelector('.chances').textContent = chances;
};

const displaySecretNumber = (msg, size) => {
  document.querySelector('.number').textContent = msg;
  document.querySelector('.number').style.width = size;
};

const updateTotalScore = newScore => {
  totalscore = newScore;
  document.querySelector('.highscore').textContent = totalscore;
};

const updateScore = newScore => {
  score = newScore;
  document.querySelector('.score').textContent = score;
};

const setBackgroundColor = newColor => {
  document.body.style.backgroundColor = newColor;
};


// Prepare a new round
const newRound = () => {
  if (locked) {

    // Reset round values
    turn = 1;
    locked = false;
    updateScore(20);

    // Generate new secret number
    secretNumber = Math.trunc(Math.random() * score) + 1;
    
    // Refresh UI
    setBackgroundColor('#222');
    displaySecretNumber('?', '15rem');
    document.querySelector('.guess').value = '';
    displayMessage('Start guessing...');

    // If it's a new game, reset chances and total score
    if (reset) {
      reset = false;
      updateChances(8);
      updateTotalScore(0);
    }

    // for tests
    // console.log(secretNumber);
  }
};

// End round, check if won/lost
const endRound = won => {

  // lock game
  locked = true;

  if (won) {
    setBackgroundColor('#60b347');
    displaySecretNumber(secretNumber, '30rem');
    displayMessage('YOU CHOSE WISELY! 🧙‍♂️');
    updateChances(chances + 2);
    updateTotalScore(totalscore + score);
  } else {

    // Game over!
    reset = true;
    displayMessage(`FINAL SCORE: ${totalscore}`);
    setBackgroundColor('#e33c3c');
  }
};

// Again! btn event
document.querySelector('.again').addEventListener('click', () => newRound());

// Check! btn event
document.querySelector('.check').addEventListener('click', () => {
  if (!locked) {
    const guess = Number(document.querySelector('.guess').value);
    if (!guess || guess <= 0 || guess > 20) {
      displayMessage('WRONG INPTUT ❌');
    } else {
      if (guess === secretNumber) {
        endRound(true);
      } else {
        updateChances(chances - 1);
        updateScore(score - turn);
        turn++;
        console.log('next turn =>', turn);
        if (chances > 0) {
          displayMessage(guess < secretNumber ? 'TOO LOW! 🔵' : 'TOO HIGH! 🔴');
        } else {
          updateScore(0);
          endRound(false);
        }
      }
    }
  }
});

newRound();
