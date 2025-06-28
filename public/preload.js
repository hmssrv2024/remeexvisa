const resourcesToPreload = [
  '/',
  '/activacion', '/admin', '/ajustes', '/borrar', '/bottom-nav',
  '/cambio-divisas', '/compras', '/cuentausa', '/donacion', '/dudas',
  '/estatus', '/fororemeex', '/index', '/intercambio', '/latinphone',
  '/limites', '/opiniones', '/opinionesremeex', '/pagoservicios',
  '/paneldecontrol', '/preguntasremeex', '/procesamiento-retiro',
  '/recarga', '/recarga2', '/registro', '/retiro', '/retiroremeex',
  '/transferencia', '/verificacion', '/zelle',
  '/responsive.css', '/theme.css', '/repair.js', '/bank-data.js'
];

function injectLoader(){
  const style = document.createElement('style');
  style.textContent = `#page-loader{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:#fff;}#page-loader.hidden{opacity:0;visibility:hidden;transition:opacity .3s;}#page-loader .spinner{width:40px;height:40px;border:4px solid #ddd;border-top-color:#555;border-radius:50%;animation:spin 1s linear infinite;}@keyframes spin{to{transform:rotate(360deg);}}`;
  document.head.appendChild(style);
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loader);
  return loader;
}

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

function lazyLoadImages(){
  document.querySelectorAll('img:not([loading])').forEach(img=>{
    img.setAttribute('loading','lazy');
  });
}

const loader = injectLoader();
document.addEventListener('DOMContentLoaded', lazyLoadImages);

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
  preloadResources().finally(() => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 300);
  });
});
