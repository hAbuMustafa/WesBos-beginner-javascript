export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);
export const $$$ = (selector) => Array.from($$(selector));
export function on(element, event, func) {
  element.addEventListener(event, func);
}

export function randomItemFromArray(arr, not) {
  const item = arr[Math.floor(Math.random() * arr.length)];

  if (item === not) return randomItemFromArray(arr, not);

  return item;
}
