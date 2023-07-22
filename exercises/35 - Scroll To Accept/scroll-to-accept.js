const tac = document.querySelector('.terms-and-conditions');
const button = document.querySelector('.accept');

function obCallback(payload) {
  if (payload[0].intersectionRatio === 1) {
    button.disabled = false;
    ob.unobserve(tac.lastElementChild);
  }
}

const ob = new IntersectionObserver(obCallback, { threshold: 1, root: tac });

ob.observe(tac.lastElementChild);
