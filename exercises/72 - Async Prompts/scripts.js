const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $$$ = (selector) => Array.from($$(selector));

function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  let myPopup = popup;
  popup.classList.remove('open');
  await wait(1000);
  popup.remove();
  myPopup = null;
}

function ask(options) {
  return new Promise(async (resolve) => {
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin',
      `
        <fieldset name="fields">
          <label>${options.title}</label>
          <input type="text" name="input" />
          <button type="submit">Submit</button>
        </fieldset>
      `
    );

    if (options.cancel) {
      const skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel';
      popup.fields.insertAdjacentElement('beforeend', skipButton);
      skipButton.addEventListener(
        'click',
        () => {
          resolve(null);
          destroyPopup(popup);
        },
        { once: true }
      );
    }

    popup.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        resolve(e.target.input.value);

        destroyPopup(popup);
      },
      { once: true }
    );

    document.body.appendChild(popup);
    await wait();
    popup.classList.add('open');
    popup.input.focus();
  });
}

async function askQuestion(e) {
  const button = e.currentTarget;

  const answer = await ask({
    title: button.dataset.question,
    cancel: button.dataset.hasOwnProperty('cancel') /* OR simply type: 
    'cancel' in button.dataset 
    OR EVEN SIMPLER:
    button.hasAttribute('data-cancel') */,
  });
  console.log(answer);
}

const buttons = $$$('[data-question]');

buttons.forEach((btn) => btn.addEventListener('click', askQuestion));

const questions = [
  { title: "What's your name?" },
  { title: 'How old are ya?', cancel: true },
  { title: 'Any Dog name?' },
];

async function asyncMap(array, callback) {
  const results = [];

  for (const item of array) {
    const result = await callback(item);
    results.push(result);
  }

  return results;
}

async function go() {
  const answers = await asyncMap(questions, ask);
  console.log(answers);
}

go();
