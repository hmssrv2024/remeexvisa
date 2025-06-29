(function(){
  const translations = {
    es: {
      'nav-services': 'Servicios',
      'nav-cards': 'Tarjetas',
      'nav-home': 'Inicio',
      'nav-support': 'Ayuda',
      'nav-settings': 'Ajustes'
    },
    en: {
      'nav-services': 'Services',
      'nav-cards': 'Cards',
      'nav-home': 'Home',
      'nav-support': 'Help',
      'nav-settings': 'Settings'
    }
  };

  function applyLanguage(lang){
    const texts = translations[lang] || translations.es;
    document.documentElement.lang = lang;
    for(const key in texts){
      const el = document.querySelector('[data-i18n="'+key+'"]');
      if(el) el.textContent = texts[key];
    }
    localStorage.setItem('remeexLanguage', lang);
  }

  function init(){
    const select = document.getElementById('interface-language');
    const lang = localStorage.getItem('remeexLanguage') || 'es';
    if(select){
      select.value = lang;
      select.addEventListener('change', ()=>applyLanguage(select.value));
    }
    applyLanguage(lang);
  }

  document.addEventListener('DOMContentLoaded', init);
  window.applyLanguage = applyLanguage;
})();
