(function(){
  if(window.GlobalData) return;
  function parse(val){
    try{ return JSON.parse(val); }catch(e){ return val; }
  }
  const api = {
    getAll(){
      const data = {};
      for(let i=0;i<localStorage.length;i++){
        const key = localStorage.key(i);
        data[key] = parse(localStorage.getItem(key));
      }
      return data;
    },
    get(key){
      return parse(localStorage.getItem(key));
    },
    set(key,value){
      if(typeof value === 'object'){
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, value);
      }
    }
  };
  window.GlobalData = api;
  document.dispatchEvent(new CustomEvent('globalDataReady', { detail: api.getAll() }));
})();

