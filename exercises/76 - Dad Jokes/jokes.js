const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $$$ = (selector) => Array.from($$(selector));
function on(element, event, func) {
  element.addEventListener(event, func);
}

const jButton = $('.getJoke');
const jokeEl = $('.joke p');

const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

async function fetchJoke() {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
  });
  return res.json();
}

function randomItemFromArray(arr, not) {
  const item = arr[Math.floor(Math.random() * arr.length)];

  if (item === not) return randomItemFromArray(arr, not);

  return item;
}

async function handleClick(e) {
  const { joke } = await fetchJoke();
  jokeEl.textContent = joke;
  jButton.textContent = randomItemFromArray(buttonText, jButton.textContent);
}

on(jButton, 'click', handleClick);
