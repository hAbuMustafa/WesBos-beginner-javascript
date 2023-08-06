export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);
export const $$$ = (selector) => Array.from($$(selector));
export function on(element, event, callback, options = undefined) {
  element.addEventListener(event, callback, options);
}
