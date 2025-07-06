const INVITRAMI_DATA = {
  registrationKeys: ['REG-0098', 'REG-1234', 'REG-5678'],
  otpKeys: ['OTP-111222', 'OTP-333444', 'OTP-555666'],
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
  other: ['Validaciones especiales $5', 'Activaciones express $10']
};
