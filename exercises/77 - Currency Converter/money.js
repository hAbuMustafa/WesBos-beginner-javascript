const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $$$ = (selector) => Array.from($$(selector));
function on(element, event, func) {
  element.addEventListener(event, func);
}

const currenciesSelectMenus = $$$('select');
const fromInput = $('[name="from_amount"]');
const toInput = $('.to_amount');
const fromCurrency = $('[name="from_currency"]');
const toCurrency = $('[name="to_currency"]');
const form = $('.app form');

const endpoint = 'https://api.apilayer.com/currency_data/live';
const ratesBySource = {};

const myHeaders = new Headers();
myHeaders.append('apikey', 'lqkyCdvuRrTmtKNzzF3knYDhNJsMNbxM');

const currencies = {
  USD: 'United States Dollar',
  EGP: 'Egyptian Pound',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};

function generateOptions(options) {
  return Object.entries(options)
    .map(([code, name]) => `<option value="${code}">${code} - ${name}</option>`)
    .join('');
}

async function fetchRates(sourceCurrency) {
  const source = sourceCurrency.toUpperCase();
  const res = await fetch(
    `${endpoint}?source=${source}&currencies=${Object.keys(currencies).join(
      ','
    )}`,
    {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    }
  );
  const rates = await res.json();
  const ratesOfThis = {
    source,
    rates: Object.fromEntries(
      Object.entries(rates.quotes).map(([k, v]) => [k.replace(source, ''), v])
    ),
  };

  return ratesOfThis;
}

async function convert(amount, from, to) {
  const ffrom = from.toUpperCase();
  const tto = to.toUpperCase();

  if (!ratesBySource[ffrom]) {
    const rates = await fetchRates(ffrom);
    ratesBySource[ffrom] = rates;
    ratesBySource[ffrom].rates[ffrom] = 1;
  }

  const rate = ratesBySource[ffrom].rates[tto];
  const convertedAmount = rate * amount;
  return convertedAmount;
}

function formatByCurrency(amount, currency) {
  return Intl.NumberFormat(undefined, { style: 'currency', currency }).format(
    amount
  );
}

async function handleInput(e) {
  const rawAmount = await convert(
    parseInt(fromInput.value),
    fromCurrency.value,
    toCurrency.value
  );
  toInput.textContent = formatByCurrency(rawAmount, toCurrency.value);
}

const currencyOptions = generateOptions(currencies);

currenciesSelectMenus.forEach((menu) => {
  menu.innerHTML = currencyOptions;
});

toCurrency.value = 'EGP';

on(form, 'input', handleInput);
