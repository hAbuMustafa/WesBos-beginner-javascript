function Gallery(gallery) {
  if (!gallery) throw new Error('Gallery Not Found!!');

  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  function openModal() {
    if (modal.matches('.open')) return;
    modal.classList.add('open');

    window.addEventListener('keydown', handleEscapeButton);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');

    window.removeEventListener('keydown', handleEscapeButton);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    if (!e.target.closest('.modalInner')) closeModal();
  }

  function handleEscapeButton(e) {
    switch (e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
      default:
        break;
    }
  }

  function showImage(el) {
    if (!el) return;

    console.log(el);

    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }
  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  images.forEach((image) =>
    image.addEventListener('click', (e) => {
      showImage(e.currentTarget);
    })
  );

  images.forEach((image) =>
    image.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') showImage(e.currentTarget);
    })
  );

  modal.addEventListener('click', handleClickOutside);
}

const gal1 = Gallery(document.querySelector('.gallery1'));
const gal2 = Gallery(document.querySelector('.gallery2'));
