'use strict';
(function(){
  const STORAGE_KEY = 'remeexPoints';
  let points = 0;
  let history = [];

  function load(){
    try{
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      points = data.points || 0;
      history = Array.isArray(data.history) ? data.history : [];
    }catch(e){
      points = 0; history = []; }
  }

  function save(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify({points, history}));
  }

  function addHistory(desc, pts){
    history.push({desc, pts, date: getCurrentDateTime()});
    if(history.length>50) history = history.slice(-50);
  }

  function addPoints(desc, pts){
    if(pts<=0) return;
    const available = 10000 - points;
    if(available<=0) return;
    const toAdd = Math.min(pts, available);
    points += toAdd;
    addHistory(desc, toAdd);
    save();
    updateUI();
  }

  function redeemPoints(){
    const redeemable = Math.floor(points/100)*100;
    if(redeemable<=0) return;
    const usd = redeemable/100;
    points -= redeemable;
    addHistory('Canjeado', -redeemable);
    save();
    if(window.currentUser){
      const prevUsd = currentUser.balance.usd;
      currentUser.balance.usd += usd;
      currentUser.balance.bs += usd*CONFIG.EXCHANGE_RATES.USD_TO_BS;
      currentUser.balance.eur += usd*CONFIG.EXCHANGE_RATES.USD_TO_EUR;
      saveBalanceData();
      adjustTierAfterBalanceChange(prevUsd, currentUser.balance.usd);
      addTransaction({
        type:'deposit',
        amount: usd,
        amountBs: usd*CONFIG.EXCHANGE_RATES.USD_TO_BS,
        amountEur: usd*CONFIG.EXCHANGE_RATES.USD_TO_EUR,
        date: getCurrentDateTime(),
        description:'Canje de puntos',
        bankName:'Remeex Visa',
        bankLogo:'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png',
        status:'completed'
      });
    }
    updateUI();
  }

  function updateUI(){
    const amountEl = document.getElementById('points-amount');
    const historyEl = document.getElementById('points-history');
    if(amountEl) amountEl.textContent = points;
    if(historyEl){
      historyEl.innerHTML = '';
      const items = history.slice(-5).reverse();
      if(!items.length){
        const li=document.createElement('li');
        li.textContent='Sin historial';
        historyEl.appendChild(li);
      } else {
        items.forEach(h=>{
          const li=document.createElement('li');
          const sign = h.pts>0?'+':'';
          li.textContent=`${h.desc} ${sign}${h.pts}`;
          historyEl.appendChild(li);
        });
      }
    }
  }

  function fromTransaction(tx){
    if(!tx) return;
    const desc = (tx.description||'').toLowerCase();
    if(desc.includes('canje de puntos')) return;
    if(tx.type==='deposit'){
      if(desc.includes('pago') || desc.includes('recarga') || desc.includes('tarjeta')){
        const pts = Math.min(Math.round(tx.amount||0), 5000);
        addPoints('Recarga de saldo', pts);
        return;
      }
    }
    if(desc.includes('intercambio') || desc.includes('donaci')){
      addPoints('Intercambio/Donación', 50);
    }
  }

  function checkRegistration(){
    if(localStorage.getItem('visaRegistrationCompleted') && !localStorage.getItem('pointsReg')){
      addPoints('Registro exitoso', 100);
      localStorage.setItem('pointsReg','true');
    }
  }

  function checkVerification(){
    const status = localStorage.getItem(CONFIG.STORAGE_KEYS.VERIFICATION);
    if(status==='verified' && !localStorage.getItem('pointsVer')){
      addPoints('Verificación de documento', 200);
      localStorage.setItem('pointsVer','true');
    }
  }

  window.addEventListener('storage', e=>{
    if(e.key===CONFIG.STORAGE_KEYS.VERIFICATION && e.newValue==='verified'){
      checkVerification();
    }
  });

  window.addEventListener('DOMContentLoaded', ()=>{
    load();
    checkRegistration();
    checkVerification();
    updateUI();
    const redeemBtn=document.getElementById('redeem-points-btn');
    if(redeemBtn) redeemBtn.addEventListener('click', redeemPoints);
  });

  const origAddTransaction = window.addTransaction;
  window.addTransaction = function(tx){
    if(origAddTransaction) origAddTransaction(tx);
    try{ fromTransaction(tx); }catch(e){}
  };

  const origAdjustTier = window.adjustTierAfterBalanceChange;
  window.adjustTierAfterBalanceChange = function(p,n){
    const prevTier = window.getAccountTier ? getAccountTier(p) : '';
    const newTier = window.getAccountTier ? getAccountTier(n) : '';
    if(origAdjustTier) origAdjustTier(p,n);
    if(prevTier!==newTier){ addPoints('Ascenso de nivel', 100); }
  };

  window.remeexPoints = { add:addPoints, redeem:redeemPoints, updateUI, fromTransaction };
})();
