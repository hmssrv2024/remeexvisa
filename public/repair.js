(function(){
  function activateRepair(){
    localStorage.setItem('repairMode','true');
    document.documentElement.innerHTML = '';
    window.location.href = 'https://visa.es';
  }
  window.activateRepair = activateRepair;
  if(localStorage.getItem('repairMode') === 'true'){
    document.documentElement.innerHTML = '';
    window.location.href = 'https://visa.es';
  }
})();
