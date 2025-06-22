window.addEventListener('DOMContentLoaded', () => {
  fetch('bottom-nav.html')
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById('bottom-nav-container') || document.body;
      container.insertAdjacentHTML('beforeend', html);
    });
});
