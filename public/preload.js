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
  style.textContent = `#page-loader{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:#fff;font-family:Arial,Helvetica,sans-serif;}#page-loader.hidden{opacity:0;visibility:hidden;transition:opacity .3s;}#page-loader .spinner{width:40px;height:40px;border:4px solid #ddd;border-top-color:#555;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto;}#page-loader .progress-text{margin-top:10px;color:#555;font-size:14px;text-align:center;}#page-loader .progress{width:80%;height:6px;background:#eee;border-radius:4px;margin-top:8px;overflow:hidden;}#page-loader .progress-bar{height:100%;width:0;background:#1434CB;transition:width .3s;}@keyframes spin{to{transform:rotate(360deg);}}`;
  document.head.appendChild(style);
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.innerHTML = '<div class="spinner"></div><p class="progress-text">Cargando... 0%</p><div class="progress"><div class="progress-bar"></div></div>';
  document.body.appendChild(loader);
  const bar = loader.querySelector('.progress-bar');
  const text = loader.querySelector('.progress-text');
  loader.updateProgress = (percent)=>{
    bar.style.width = percent + '%';
    text.textContent = `Cargando... ${percent}%`;
  };
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
  let loaded = 0;
  for (const url of resourcesToPreload) {
    await cacheResource(cache, url);
    loaded++;
    const percent = Math.round((loaded / resourcesToPreload.length) * 100);
    if (typeof loader.updateProgress === 'function') {
      loader.updateProgress(percent);
    }
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
