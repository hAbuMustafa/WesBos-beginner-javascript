import { convert } from './lib.js';
import { fromInput, fromCurrency, toCurrency, toInput } from './elements.js';
import { formatByCurrency } from './utils.js';

export async function handleInput(e) {
  const rawAmount = await convert(
    parseInt(fromInput.value),
    fromCurrency.value,
    toCurrency.value
  );
  toInput.textContent = formatByCurrency(rawAmount, toCurrency.value);
}
