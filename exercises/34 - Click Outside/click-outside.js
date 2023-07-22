const cardButtons = document.querySelectorAll('.card button');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

function handleCardButtonClick(e) {
  const button = e.currentTarget;
  const card = button.closest('.card');
  const imgSrc = card.querySelector('img').src;
  const desc = card.dataset.description;
  const name = card.querySelector('h2').textContent;

  modal.innerHTML = `
  <img width="600" height="600" src="${imgSrc.replace(
    '200',
    '600'
  )}" alt="${name}">
  <p>${desc}</p>
  `;

  backdrop.classList.add('open');
}

cardButtons.forEach((button) =>
  button.addEventListener('click', handleCardButtonClick)
);

function closeModal() {
  backdrop.classList.remove('open');
}

backdrop.addEventListener('click', (e) => {
  const isOutside = !e.target.closest('.modal');
  if (isOutside) closeModal();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
