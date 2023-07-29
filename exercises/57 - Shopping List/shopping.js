const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

const items = [];

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  items.push(item);
  e.target.reset();

  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  const html = items
    .map(
      (item) => `
    <li class="shopping-item">
      <input
        value="${item.id}"
        type="checkbox" ${item.complete ? 'checked' : ''}
      >
        <span class="itemName">${item.name}</span>
      <button 
        aria-label="remove ${item.name}"
        value="${item.id}">
          &times;
        </button>
    </li>`
    )
    .join('');
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
  console.log(JSON.stringify(items));
}

function restoreFromLocalStorage() {
  const listItems = JSON.parse(localStorage.getItem('items'));
  if (listItems) {
    items.push(...listItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  console.log(`DELETEING ${id}`);
  const newItems = items.filter((item) => item.id !== id);
  items.splice(0);
  items.push(...newItems);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function toggleComplete(id) {
  console.log(`complete ${id}`);
  const itemRef = items.find((item) => item.id === id);
  itemRef.complete = !itemRef.complete;

  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
list.addEventListener('click', (e) => {
  const id = parseInt(e.target.value);
  if (e.target.matches('button')) deleteItem(id);
  if (e.target.matches('input[type="checkbox"]')) toggleComplete(id);
});

restoreFromLocalStorage();
