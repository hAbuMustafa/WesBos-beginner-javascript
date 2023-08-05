import {$,
  $$,
  $$$,
  on} from "./utils.js";

const currenciesSelectMenus = $$$('select');
const fromInput = $('[name="from_amount"]');
const toInput = $('.to_amount');
const fromCurrency = $('[name="from_currency"]');
const toCurrency = $('[name="to_currency"]');
const form = $('.app form');

export {currenciesSelectMenus,
  fromInput,
  toInput,
  fromCurrency,
  toCurrency,
  form}