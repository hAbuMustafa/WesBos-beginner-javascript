const $ = document.querySelector.bind(document);
function on(element, event, func) {
  element.addEventListener(event, func);
}

const baseEndpoint = 'https://recipes.beginnerjavascript.com/api';
const form = $('form.search');
const recipesDiv = $('.recipes');

async function fetchRecipes(query) {
  const res = await fetch(`${baseEndpoint}?q=${query}`);
  const data = await res.json();
  return data.results;
}

function displayRecipes(recipes) {
  const html = recipes
    .map(
      (recipe) => `
  <div class="recipe">
    <h2>${recipe.title}</h2>
    <p>${recipe.ingredients}</p>
    ${
      recipe.thumbnail &&
      `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`
    }
    <a href="${recipe.href}">View recipe ⇢</a>
  </div>
  `
    )
    .join('');

  recipesDiv.innerHTML = html;
}

async function fetchAndDisplay(query) {
  const recipes = await fetchRecipes(query);
  form.submit.disabled = true;
  displayRecipes(recipes);
  form.submit.disabled = false;
}

async function handleSubmit(e) {
  e.preventDefault();
  const formEl = e.currentTarget;
  fetchAndDisplay(formEl.query.value);
}

on(form, 'submit', handleSubmit);

fetchAndDisplay(form.query.value);
