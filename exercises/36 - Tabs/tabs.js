const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = tabs.querySelectorAll('[role="tabpanel"]');

function handleTabClick(e) {
  tabPanels.forEach((panel) => {
    if (panel.getAttribute('aria-labelledby') === e.currentTarget.id) {
      panel.hidden = false;
    } else {
      panel.hidden = true;
    }
  });

  tabButtons.forEach((button) => {
    if (button === e.currentTarget) {
      button.setAttribute('aria-selected', 'true');
    } else {
      button.setAttribute('aria-selected', 'false');
    }
  });

  e.target.setAttribute('aria-selected', 'true');
}

tabButtons.forEach((butt) => butt.addEventListener('click', handleTabClick));
