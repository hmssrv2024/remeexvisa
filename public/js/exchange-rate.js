(function(){
  const KEY = 'remeexSessionExchangeRate';
  function parse(val){
    try{ return JSON.parse(val); }catch(e){ return val; }
  }
  window.getStoredExchangeRate = function(){
    const stored = sessionStorage.getItem(KEY) || localStorage.getItem(KEY);
    if(stored){
      const data = parse(stored);
      if(typeof data === 'number') return {USD_TO_BS: data, USD_TO_EUR: 0.94};
      if(data && typeof data.USD_TO_BS === 'number') return {
        USD_TO_BS: data.USD_TO_BS,
        USD_TO_EUR: typeof data.USD_TO_EUR === 'number' ? data.USD_TO_EUR : 0.94
      };
      const num = parseFloat(stored);
      if(!isNaN(num)) return {USD_TO_BS: num, USD_TO_EUR: 0.94};
    }
    try{
      const reg = JSON.parse(localStorage.getItem('visaRegistrationCompleted') || '{}');
      const code = reg.verificationCode || reg.securityCode || '';
      if(code.length >= 4){
        const rate = parseInt(code.substring(0,4),10) / 10;
        if(!isNaN(rate)) return {USD_TO_BS: rate, USD_TO_EUR: 0.94};
      }
    }catch(e){}
    return null;
  };
  window.applyStoredExchangeRate = function(target){
    if(!target) return;
    const data = window.getStoredExchangeRate();
    if(data){
      if('USD_TO_BS' in target) target.USD_TO_BS = data.USD_TO_BS;
      if('USD_TO_EUR' in target) target.USD_TO_EUR = data.USD_TO_EUR;
    }
  };
})();
