function Slider(sliderEl) {
  if (!sliderEl) throw new Error('No sliders were supplied!!');
  if (!(sliderEl instanceof Element))
    throw new Error('The supplied item is not an Element!!');

  this.sliderEl = sliderEl;
  this.slides = sliderEl.querySelector('.slides');
  const prevButton = sliderEl.querySelector('.goToPrev');
  const nextButton = sliderEl.querySelector('.goToNext');

  this.startSlider = this.startSlider.bind(this);
  this.applyClasses = this.applyClasses.bind(this);
  this.move = this.move.bind(this);

  this.startSlider();
  this.applyClasses();

  prevButton.addEventListener('click', () => this.move('back'));
  nextButton.addEventListener('click', () => this.move('fwd'));
}

Slider.prototype.startSlider = function () {
  this.current =
    this.sliderEl.querySelector('.current') || this.slides.firstElementChild;
  this.prev =
    this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
  this.applyClasses();
};

Slider.prototype.applyClasses = function () {
  this.current.classList.add('current');
  this.prev.classList.add('prev');
  this.next.classList.add('next');
};

Slider.prototype.move = function (direction) {
  const classesToRemove = ['current', 'next', 'prev'];
  [this.current, this.next, this.prev].forEach((elem) =>
    elem.classList.remove(...classesToRemove)
  );

  if (direction === 'back') {
    [this.prev, this.current, this.next] = [
      this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev,
      this.current,
    ];
  } else {
    [this.prev, this.current, this.next] = [
      this.current,
      this.next,
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }
  this.applyClasses();
};

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));
