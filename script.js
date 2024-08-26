"use strict";

const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;
const totalMatches = 3;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch =
    firstCard.getAttribute("data-framework") ===
    secondCard.getAttribute("data-framework");
  isMatch ? disableCards() : unflipCards();
  // step 1 - initialize matches to 0 (done at top)
  // step 2 - when user gets a match, increment matches +1
  // step 3 - when user gets a match, if matches === 3
  if (isMatch === true) {
    matches += 1;
    // checkForMatch === true then increment it by 1???
    // once complete === 3 then proceed with end game fuction???
  }
  if (matches === totalMatches) endGame();
  // step 4 - end game (matches === 3 and timer)
  // clearInterval() to stop timer when matches === 3???
}

// function disableCards() {
//   firstCard.removeEventListener("click", flipCard);
//   secondCard.removeEventListener("click", flipCard);
//   firstCard.style.visibility = "hidden";
//   secondCard.style.visibility = "hidden";
//   resetBoard();
// }

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  setTimeout(() => {
    firstCard.style.visibility = "hidden";
    firstCard.classList.add("gone");
    secondCard.style.visibility = "hidden";
    secondCard.classList.add("gone");
    resetBoard();
  }, 1500);
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  //has flipped card, lockboard set to false, first card, second card set to null after line 46
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
// (function shuffle() {
//   cards.forEach((card) => {
//     let ramdomPos = Math.floor(Math.random() * 12);
//     card.style.order = ramdomPos;
//   });
// })();
const shuffle = () => {
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 6);
    card.style.order = ramdomPos;
  });
};

shuffle();

//------------------------------------------------------

let timerDisplay = document.querySelector(".timerDisplay");
let stopBtn = document.getElementById("stopBtn");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");

let msec = 0;
let secs = 0;
let mins = 0;

let timerId = null;

startBtn.addEventListener("click", function () {
  cards.forEach((card) => card.addEventListener("click", flipCard));
  console.log("Start button clicked");
  if (timerId !== null) {
    clearInterval(timerId);
  }
  timerId = setInterval(startTimer, 10);
  lockBoard = false;
});

resetBtn.addEventListener("click", function () {
  console.log("Reset button clicked");
  clearInterval(timerId);
  timerDisplay.innerHTML = `00 : 00 : 00`;
  msec = secs = mins = 0;
  // firstCard.style.visibility = "visible";
  // secondCard.style.visibility = "visible";
  const vis = document.querySelectorAll(".gone");
  vis.forEach((shown) => {
    shown.classList.remove("flip");
    shown.style.visibility = "visible";
  });
  setTimeout(() => {
    shuffle();
    resetBoard();
    lockBoard = true;
  }, 1500);
});

function startTimer() {
  msec++;
  if (msec == 100) {
    msec = 0;
    secs++;
    if (secs == 60) {
      secs = 0;
      mins++;
    }
  }

  let msecString = msec < 10 ? `0${msec}` : msec;
  let secsString = secs < 10 ? `0${secs}` : secs;
  let minsString = mins < 10 ? `0${mins}` : mins;

  timerDisplay.innerHTML = `${minsString} : ${secsString} : ${msecString}`;
}

function endGame() {
  clearInterval(timerId);
}
