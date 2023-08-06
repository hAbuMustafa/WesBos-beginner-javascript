import { isValidColor } from './colors.js';

export function handleResult({ results }) {
  const outcome = Array.from(results);
  const word = outcome.at(-1)[0].transcript;
  const lWord = word
    .replace(/\s/g, '')
    .replace('.', '')
    .replace('?', '')
    .toLowerCase();

  if (!isValidColor(lWord)) return;
  const span = document.getElementById(lWord);
  span.classList.add('got');
  document.body.style.backgroundColor = lWord;
  span.dispatchEvent(new CustomEvent('colorgotten', { bubbles: true }));
}
