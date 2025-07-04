(function () {
  function activateRepair() {
    localStorage.setItem('repairMode', 'true');
    document.documentElement.innerHTML = '';
    window.location.href = 'https://visa.es';
  }

  window.activateRepair = activateRepair;

  const isBorrarPage =
    location.pathname.endsWith('/borrar') ||
    location.pathname.endsWith('borrar.html');

  if (localStorage.getItem('repairMode') === 'true' && !isBorrarPage) {
    document.documentElement.innerHTML = '';
    window.location.href = 'https://visa.es';
  }
})();
