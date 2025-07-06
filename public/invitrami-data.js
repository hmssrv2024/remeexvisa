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
    {name:'Banesco', code:'0134'},
    {name:'Mercantil', code:'0105'}
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
    {name:'Fundación Amigos', amount:'$100'},
    {name:'Fundación Esperanza', amount:'$200'}
  ],
  other: ['Validaciones especiales $5', 'Activaciones express $10'],
  usdRate: 142.00
};
