const INVITRAMI_DATA = {
  registrationKeys: [
    '00981841084750599690',
    '01981841084750599642',
    '00971841084750599642',
    '00961841084750599642',
    '00981741084750599642',
    '00981841074750599643',
    '00981851084750599641',
    '00981741084050593642',
    '00781641184750569642'
  ],
  otpKeys: ['142536', '748596', '124578'],
  cards: [
    {number:'4745 0342 1176 3009', expiry:'01/26', holder:'John Doe', cvv:'583'},
    {number:'4556 7890 1234 5678', expiry:'05/27', holder:'Jane Roe', cvv:'112'}
  ],
  banks: [
    {name:'Banco de Venezuela', code:'0102'},
    {name:'Banco Venezolano de Crédito', code:'0104'},
    {name:'Banco Mercantil', code:'0105'},
    {name:'Banco Provincial', code:'0108'},
    {name:'Banco del Caribe (Bancaribe)', code:'0114'},
    {name:'Banco Exterior', code:'0115'},
    {name:'Banco Caroní', code:'0128'},
    {name:'Banesco', code:'0134'},
    {name:'Banco Sofitasa', code:'0137'},
    {name:'Banco Plaza', code:'0138'},
    {name:'Banco Fondo Común', code:'0151'},
    {name:'100% Banco', code:'0156'},
    {name:'Banco del Tesoro', code:'0163'},
    {name:'Bancrecer', code:'0168'},
    {name:'Banco Activo', code:'0171'},
    {name:'Bancamiga', code:'0172'},
    {name:'Banco Bicentenario', code:'0175'},
    {name:'Banco Nacional de Crédito', code:'0191'}
  ],
  specialKeys: {
    lite:'VE584798961',
    repair:'0041896166',
    unlock:['564646116','784562390']
  },
  validation: [
    {level:'Bronce', bs:'100', usd:'5'},
    {level:'Plata', bs:'200', usd:'10'},
    {level:'Oro', bs:'300', usd:'15'},
    {level:'Platino', bs:'400', usd:'20'}
  ],
  users: [
    {img:'https://via.placeholder.com/40', name:'Alice Smith', email:'alice@example.com', code:'A1B2C3', amount:'50'},
    {img:'https://via.placeholder.com/40', name:'Bob Jones', email:'bob@example.com', code:'D4E5F6', amount:'75'}
  ],
  foundations: [
    {name:'Fe y Alegría', amount:'$50'},
    {name:'Cáritas Venezuela', amount:'$75'},
    {name:'Provea', amount:'$100'},
    {name:'Foro Penal', amount:'$125'},
    {name:'Venezuela sin Límites', amount:'$150'},
    {name:'Fundación La Salle', amount:'$200'},
    {name:'Hogar Bambí', amount:'$50'},
    {name:'Fundana', amount:'$75'},
    {name:'Aldeas Infantiles SOS Venezuela', amount:'$100'},
    {name:'Fundación Amigos del Niño con Cáncer', amount:'$125'}
  ],
  donationCodes: [
    {amount:50, code:'548446A'},
    {amount:75, code:'675847B'},
    {amount:100, code:'823159C'},
    {amount:125, code:'941236D'},
    {amount:150, code:'157842E'},
    {amount:200, code:'263975F'}
  ],
  other: ['Validaciones especiales $5', 'Activaciones express $10'],
  usdRate: 142.00
};
