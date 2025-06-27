import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Redirect URLs ending with .html to their extensionless versions
app.use((req, res, next) => {
  if (req.path.endsWith('.html')) {
    const query = req.url.slice(req.path.length);
    const newUrl = req.path.slice(0, -5) + query;
    return res.redirect(301, newUrl);
  }
  next();
});

// Serve static files and allow extensionless access to .html pages
app.use(express.static('public', { extensions: ['html'] }));

// Simple in-memory user store
let users = [
  { id: 1, username: 'alice', password: 'alice123', balance: 100 },
  { id: 2, username: 'bob', password: 'bob456', balance: 200 }
];

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'adminpass';
let sessionToken = null;

function auth(req, res, next) {
  const header = req.get('Authorization') || '';
  const token = header.replace('Bearer ', '');
  if (token && token === sessionToken) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
}

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    sessionToken = Math.random().toString(36).substring(2);
    return res.json({ token: sessionToken });
  }
  res.status(401).json({ error: 'Credenciales inválidas' });
});

app.get('/admin/users', auth, (req, res) => {
  res.json({ users });
});

app.get('/admin/users/:id', auth, (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    return res.json(user);
  }
  res.status(404).json({ error: 'Usuario no encontrado' });
});

app.put('/admin/users/:id/password', auth, (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  const { password } = req.body;
  if (user && password) {
    user.password = password;
    return res.json({ success: true });
  }
  res.status(400).json({ error: 'Datos inválidos' });
});

app.delete('/admin/users/:id', auth, (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return res.json({ success: true });
  }
  res.status(404).json({ error: 'Usuario no encontrado' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
