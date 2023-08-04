export async function handleButtonClick(event) {
  const { default: currencies, localCurrency } = await import(
    './currencies.js'
  );
  console.log(currencies, localCurrency);
}
