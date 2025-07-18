import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Simple in-memory user store with session tracking
let users = [
  {
    id: 1,
    username: 'alice',
    password: 'alice123',
    balance: 100,
    phase: 'desconectado',
    sessions: []
  },
  {
    id: 2,
    username: 'bob',
    password: 'bob456',
    balance: 200,
    phase: 'desconectado',
    sessions: []
  }
];

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
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

app.get('/admin/connected', auth, (req, res) => {
  const connectedUsers = users.filter(u => u.sessions.some(s => !s.logout));
  res.json({ connected: connectedUsers.length, users: connectedUsers });
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

app.post('/admin/users', auth, (req, res) => {
  const { username, password, balance } = req.body;
  if (username && password && balance !== undefined) {
    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {
      id,
      username,
      password,
      balance: Number(balance),
      phase: 'desconectado',
      sessions: []
    };
    users.push(newUser);
    return res.status(201).json(newUser);
  }
  res.status(400).json({ error: 'Datos inválidos' });
});

// --- Public user session endpoints ---
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  user.sessions.push({ login: Date.now(), logout: null });
  user.phase = 'activo';
  res.json({ id: user.id });
});

app.post('/logout', (req, res) => {
  const { id } = req.body;
  const user = users.find(u => u.id === Number(id));
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  const session = user.sessions[user.sessions.length - 1];
  if (session && !session.logout) {
    session.logout = Date.now();
  }
  user.phase = 'desconectado';
  res.json({ success: true });
});

export default app;
