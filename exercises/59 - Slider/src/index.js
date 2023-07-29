function Slider(sliderEl) {
  if (!sliderEl) throw new Error('No sliders were supplied!!');
  if (!(sliderEl instanceof Element))
    throw new Error('The supplied item is not an Element!!');

  let current;
  let next;
  let prev;

  const slides = sliderEl.querySelector('.slides');
  const prevButton = sliderEl.querySelector('.goToPrev');
  const nextButton = sliderEl.querySelector('.goToNext');

  function startSlider() {
    current = sliderEl.querySelector('.current') || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    applyClasses();
  }

  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }

  function move(direction) {
    const classesToRemove = ['current', 'next', 'prev'];
    [current, next, prev].forEach((elem) =>
      elem.classList.remove(...classesToRemove)
    );

    if (direction === 'back') {
      [prev, current, next] = [
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      [prev, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }
    applyClasses();
  }

  startSlider();
  applyClasses();

  prevButton.addEventListener('click', () => move('back'));
  nextButton.addEventListener('click', () => move('fwd'));
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
