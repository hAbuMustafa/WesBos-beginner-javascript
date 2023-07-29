function Gallery(gallery) {
  if (!gallery) throw new Error('Gallery Not Found!!');

  this.gallery = gallery;

  this.images = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');

  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleEscapeButton = this.handleEscapeButton.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  this.images.forEach((image) =>
    image.addEventListener('click', (e) => {
      this.showImage(e.currentTarget);
    })
  );

  this.images.forEach((image) => {
    image.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') this.showImage(e.currentTarget);
    });
  });

  this.modal.addEventListener('click', this.handleClickOutside);
}

Gallery.prototype.openModal = function () {
  if (this.modal.matches('.open')) return;
  this.modal.classList.add('open');

  window.addEventListener('keydown', this.handleEscapeButton);
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');

  window.removeEventListener('keydown', this.handleEscapeButton);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
};

Gallery.prototype.handleClickOutside = function (e) {
  if (!e.target.closest('.modalInner')) this.closeModal();
};

Gallery.prototype.handleEscapeButton = function (e) {
  switch (e.key) {
    case 'Escape':
      this.closeModal();
      break;
    case 'ArrowRight':
      this.showNextImage();
      break;
    case 'ArrowLeft':
      this.showPrevImage();
      break;
    default:
      break;
  }
};

Gallery.prototype.showNextImage = function () {
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild
  );
};

Gallery.prototype.showPrevImage = function () {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild
  );
};

Gallery.prototype.showImage = function (el) {
  if (!el) return;

  this.modal.querySelector('img').src = el.src;
  this.modal.querySelector('h2').textContent = el.title;
  this.modal.querySelector('figure p').textContent = el.dataset.description;
  this.currentImage = el;
  this.openModal();
};

const gal1 = new Gallery(document.querySelector('.gallery1'));
const gal2 = new Gallery(document.querySelector('.gallery2'));
