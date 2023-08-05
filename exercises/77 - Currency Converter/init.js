import { currenciesSelectMenus, toCurrency, form } from './elements.js';
import { on, generateOptions } from './utils.js';
import currencies from './currencies.js';
import { handleInput } from './handlers.js';

export function init() {
  const currencyOptions = generateOptions(currencies);

  currenciesSelectMenus.forEach((menu) => {
    menu.innerHTML = currencyOptions;
  });

  toCurrency.value = 'EGP';

  on(form, 'input', handleInput);
}
