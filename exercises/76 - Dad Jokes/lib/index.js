export async function fetchJoke() {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
  });
  return res.json();
}
