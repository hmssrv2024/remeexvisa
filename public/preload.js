const resourcesToPreload = [
  '/registro.html',
  '/recarga.html',
  '/transferencia.html',
  '/procesamiento-retiro.html',
  '/activacion.html',
  '/verificacion.html',
  '/responsive.css',
  '/repair.js',
  '/bank-data.js',
  '/explicacion.ogg',
  '/remeevisa6.ogg',
  '/remeexvisa.ogg',
  '/remeexvisa1.ogg',
  '/remeexvisa1010.ogg',
  '/remeexvisa12p.ogg',
  '/remeexvisa2.ogg',
  '/remeexvisa23.ogg',
  '/remeexvisa3.ogg',
  '/remeexvisa4.ogg',
  '/remeexvisa5.ogg',
  '/remeexvisa57.ogg',
  '/remeexvisabuilding.ogg',
  '/remeexvisaclosing10.ogg',
  '/remeexvisarecarga.ogg',
  '/remmexvisa34.ogg'
];

async function cacheResource(cache, url, attempt = 1) {
  try {
    const response = await fetch(url, { cache: 'no-cache' });
    if (response.ok) {
      await cache.put(url, response.clone());
      return true;
    }
  } catch (e) {
    if (attempt < 3) {
      return cacheResource(cache, url, attempt + 1);
    }
  }
  return false;
}

async function preloadResources() {
  if (!('caches' in window)) return;
  const cache = await caches.open('precache-v1');
  for (const url of resourcesToPreload) {
    await cacheResource(cache, url);
  }
}

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
  preloadResources();
});
