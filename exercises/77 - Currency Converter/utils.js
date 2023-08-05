const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $$$ = (selector) => Array.from($$(selector));
function on(element, event, func, options = undefined) {
  element.addEventListener(event, func, options);
}

function generateOptions(options) {
  return Object.entries(options)
    .map(([code, name]) => `<option value="${code}">${code} - ${name}</option>`)
    .join('');
}

function formatByCurrency(amount, currency) {
  return Intl.NumberFormat(undefined, { style: 'currency', currency }).format(
    amount
  );
}

export { $, $$, $$$, on, generateOptions, formatByCurrency };
