(function(){
  function applyTheme(){
    const theme = localStorage.getItem('remeexTheme');
    document.body.classList.remove('dark-mode','silver-mode');
    if(theme === 'dark') document.body.classList.add('dark-mode');
    if(theme === 'silver') document.body.classList.add('silver-mode');
  }
    function init(){
      applyTheme();
      const darkToggle = document.getElementById('dark-mode-toggle');
      const silverToggle = document.getElementById('silver-mode-toggle');
      if(darkToggle){
      darkToggle.checked = localStorage.getItem('remeexTheme') === 'dark';
      darkToggle.addEventListener('change', () => {
        if(darkToggle.checked){
          localStorage.setItem('remeexTheme','dark');
          if(silverToggle) silverToggle.checked = false;
        }else{
          localStorage.removeItem('remeexTheme');
        }
        applyTheme();
        });
      }
      if(silverToggle){
      silverToggle.checked = localStorage.getItem('remeexTheme') === 'silver';
      silverToggle.addEventListener('change', () => {
        if(silverToggle.checked){
          localStorage.setItem('remeexTheme','silver');
          if(darkToggle) darkToggle.checked = false;
        }else{
          localStorage.removeItem('remeexTheme');
        }
        applyTheme();
        });
      }
      window.addEventListener('storage', (e) => {
        if(e.key === 'remeexTheme'){
          applyTheme();
          if(darkToggle) darkToggle.checked = e.newValue === 'dark';
          if(silverToggle) silverToggle.checked = e.newValue === 'silver';
        }
      });
    }
  document.addEventListener('DOMContentLoaded', init);
  window.applyTheme = applyTheme;
})();
