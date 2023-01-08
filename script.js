'use strict';

const newGameButton = document.querySelector('.new-game');
const diceImg = document.querySelector('.dice');
const throwDiceButton = document.querySelector('.throw-dice');
const safePointsButton = document.querySelector('.safe-points');
const modal = document.querySelector('.modal');
const modalMessage = document.querySelector('.modal__message');
const modalCloseButton = document.querySelector('.modal__close');

let generalPontsPlayer1;
let generalPontsPlayer2;

let currentPontsPlayer1;
let currentPontsPlayer2;

let isPlayer1Active = true;
let isPlayer2Active = false;

init();

newGameButton.addEventListener('click', init);
throwDiceButton.addEventListener('click', getStep);
safePointsButton.addEventListener('click', safePoints);

function init() {
  generalPontsPlayer1 = 0;
  generalPontsPlayer2 = 0;
  currentPontsPlayer1 = 0;
  currentPontsPlayer2 = 0;

  document.getElementById('general-points1').textContent = generalPontsPlayer1;
  document.getElementById('general-points2').textContent = generalPontsPlayer2;
  document.getElementById('points1').textContent = currentPontsPlayer1;
  document.getElementById('points2').textContent = currentPontsPlayer2;

  diceImg.style.display = 'none';

  isPlayer1Active = true;
  isPlayer2Active = false;

  document.querySelector('.left-side').style.backgroundColor = 'rgba(226, 208, 198, 0.755)';
    
  document.querySelector('.right-side').style.backgroundColor = 'rgba(229, 158, 120, 0.755)';
}

function getStep() {
  let randomNumber = Math.ceil(Math.random() * 6);
  diceImg.src = `./assets/Dice${randomNumber}.svg`;
  diceImg.style.display = 'block';

  if(randomNumber === 1) {

    isPlayer1Active ? currentPontsPlayer1 = 0 : currentPontsPlayer2 = 0;
    
    isPlayer1Active ? document.getElementById('points1').textContent = currentPontsPlayer1 : document.getElementById('points2').textContent = currentPontsPlayer2;


    isPlayer1Active = !isPlayer1Active;
    isPlayer2Active = !isPlayer2Active;

    shangeStyles();
    return;
  }

  if(isPlayer1Active) {
    currentPontsPlayer1 += randomNumber;
    document.getElementById('points1').textContent = currentPontsPlayer1;

  }

  if(isPlayer2Active) {
    currentPontsPlayer2 += randomNumber;
    document.getElementById('points2').textContent = currentPontsPlayer2;
  }

}

function shangeStyles() {
  isPlayer1Active ? document.querySelector('.left-side').style.backgroundColor = 'rgba(226, 208, 198, 0.755)' : document.querySelector('.right-side').style.backgroundColor = 'rgba(226, 208, 198, 0.755)';
    
  isPlayer2Active ? document.querySelector('.left-side').style.backgroundColor = 'rgba(229, 158, 120, 0.755)' : document.querySelector('.right-side').style.backgroundColor = 'rgba(229, 158, 120, 0.755)';
}

function safePoints() {
  if(isPlayer1Active) {
    generalPontsPlayer1 += currentPontsPlayer1;
    document.getElementById('general-points1').textContent = generalPontsPlayer1;

    currentPontsPlayer1 = 0;
    document.getElementById('points1').textContent = currentPontsPlayer1;

    isPlayer1Active = !isPlayer1Active;
    isPlayer2Active = !isPlayer2Active;

    shangeStyles();

    if(generalPontsPlayer1 >= 100) {
      showModalWindow(`Игрок 1 победил со счетом ${generalPontsPlayer1} / ${generalPontsPlayer2}`);
      init();
    }
    return;
  }

  if(isPlayer2Active) {
    generalPontsPlayer2 += currentPontsPlayer2;
    document.getElementById('general-points2').textContent = generalPontsPlayer2;

    currentPontsPlayer2 = 0;
    document.getElementById('points2').textContent = currentPontsPlayer2;

    isPlayer1Active = !isPlayer1Active;
    isPlayer2Active = !isPlayer2Active;

    shangeStyles();

    if(generalPontsPlayer2 >= 100) {
      showModalWindow(`Игрок 2 победил со счетом ${generalPontsPlayer1} / ${generalPontsPlayer2}`);
      init();
    }

    return;
  }
}

function showModalWindow(text) {
  document.querySelector('.container').style.filter = 'blur(2px)';

  modal.style.display = 'flex';
  modalMessage.textContent = text;
}

modalCloseButton.addEventListener('click', closeModalWindow);

function closeModalWindow() {
  document.querySelector('.container').style.filter = 'none';
  modal.style.display = 'none';
  modalMessage.textContent = '';
}