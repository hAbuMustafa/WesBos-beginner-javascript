import currencies from './currencies.js';

const endpoint = 'https://api.apilayer.com/currency_data/live';
const ratesBySource = {};
const myHeaders = new Headers();
myHeaders.append('apikey', 'lqkyCdvuRrTmtKNzzF3knYDhNJsMNbxM');

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

export { fetchRates, convert, endpoint, ratesBySource };
