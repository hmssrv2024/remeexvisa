window.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    // Cargar el fragmento utilizando una ruta sin extensión
    fetch('bottom-nav').then(res => res.text()),
    fetch('global-data.js').then(res => res.text())
  ]).then(([html, dataJs]) => {
    const container = document.getElementById('bottom-nav-container') || document.body;
    container.insertAdjacentHTML('beforeend', html);
    const script = document.createElement('script');
    script.textContent = dataJs;
    document.body.appendChild(script);
    document.dispatchEvent(new Event('bottomNavLoaded'));
  });
});
