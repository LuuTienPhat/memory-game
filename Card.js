import showSummaryBox from "./index.js";

const cards = document.querySelectorAll(".memory-card");

let firstCard, secondCard;
let isLockBoard = false;
let isFliped = false;
let countFinishedCard = 0;

function flipCard() {
  if (isLockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!isFliped) {
    isFliped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  return firstCard.dataset.name === secondCard.dataset.name ?
    disableCard() :
    disableFlipCard();
}

function disableCard() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  countFinishedCard += 2;
  if (countFinishedCard === 12) {
    showSummaryBox();
  }

  resetBoard();
}

function disableFlipCard() {
  isLockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [isLockBoard, isFliped, firstCard, secondCard] = [false, false, true, true];
}

function shuffle() {
  cards.forEach((card) => {
    card.style.order = Math.floor(Math.random() * 11);
  });
}

cards.forEach((card) => card.addEventListener("click", flipCard));

export default shuffle;