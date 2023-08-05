import { jokeEl, jButton } from './elements.js';
import { fetchJoke } from './index.js';
import { randomItemFromArray } from '../utils.js';
import buttonText from '../data/buttonText.js';

export async function handleClick(e) {
  const { joke } = await fetchJoke();
  jokeEl.textContent = joke;
  jButton.textContent = randomItemFromArray(buttonText, jButton.textContent);
}
