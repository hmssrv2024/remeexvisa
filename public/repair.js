(function () {
  function activateRepair() {
    sessionStorage.setItem('repairMode', 'true');
    document.documentElement.innerHTML = '';
    window.location.href = 'https://visa.es';
  }

  window.activateRepair = activateRepair;

  const isBorrarPage =
    location.pathname.endsWith('/borrar') ||
    location.pathname.endsWith('borrar.html');

  if (sessionStorage.getItem('repairMode') === 'true' && !isBorrarPage) {
    document.documentElement.innerHTML = '';
    window.location.href = 'https://visa.es';
  }
})();
