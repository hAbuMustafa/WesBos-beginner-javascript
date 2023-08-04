const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $$$ = (selector) => Array.from($$(selector));

function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function random(max = 150, min = 20, randomNumber = Math.random()) {
  return Math.round(min + randomNumber * (max - min));
}

// async for of loop
/* async function draw(el) {
  const text = el.textContent;
  let soFar = '';
  for (const letter of text) {
    soFar += letter;
    el.textContent = soFar;

    const { typeMax, typeMin } = el.dataset;
    const timeToWait = random(parseInt(typeMax), parseInt(typeMin));
    await wait(timeToWait);
  }
} */

// recursion: a function that calls itself untill something calls it to stop
function draw(el) {
  let index = 1;
  const text = el.textContent;
  const { typeMax, typeMin } = el.dataset;

  async function drawLetter() {
    el.textContent = text.slice(0, index);
    index += 1;

    const timeToWait = random(parseInt(typeMax), parseInt(typeMin));
    await wait(timeToWait);

    if (index <= text.length) drawLetter();
  }

  drawLetter();
}

$$$('[data-type]').forEach(draw);
