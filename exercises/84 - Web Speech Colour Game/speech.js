import { colorsByLength, isDark } from './colors.js';
import { handleResult } from './handlers.js';
import { $, $$$, on } from './utils.js';

const colorEl = $('.colors');
const cScoreEl = $('#currentScore');
const tScoreEl = $('#totalScore');

function displayColors(colors) {
  return colors
    .map(
      (color) =>
        `<span class="color${
          isDark(color) ? ' dark' : ''
        }" style="background: ${color};" id="${color}">${color}</span>`
    )
    .join('');
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function startRecognition() {
  const reco = new SpeechRecognition();
  reco.continuous = true;
  reco.interimResults = true;
  reco.onresult = handleResult;
  reco.addEventListener('end', reco.start);
  reco.start();
}

function start() {
  if (!('SpeechRecognition' in window)) {
    console.log('No support for SpeechRecognition');
    return;
  }

  startRecognition();
}

function recalculateScore() {
  cScoreEl.textContent = $$$('.got').length;
}

function saveToLocalStorage() {
  localStorage.setItem(
    'gottenColors',
    JSON.stringify($$$('.got').map((element) => element.textContent))
  );
}

function getFromLocalStorage() {
  const gottenColors = JSON.parse(localStorage.getItem('gottenColors'));
  console.log(gottenColors);
  if (Array.isArray(gottenColors)) {
    $$$('.color').forEach((element) => {
      if (gottenColors.includes(element.textContent)) {
        element.classList.add('got');
        console.log(element);
      }
    });
  }
}

colorEl.innerHTML = displayColors(colorsByLength);

getFromLocalStorage();

start();

tScoreEl.textContent = colorsByLength.length;

recalculateScore();

on(document, 'colorgotten', () => {
  recalculateScore();
  saveToLocalStorage();
});
