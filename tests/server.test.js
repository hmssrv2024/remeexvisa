import request from 'supertest';

// Configure admin credentials for the test environment before the server is imported
process.env.ADMIN_USERNAME = 'admin';
process.env.ADMIN_PASSWORD = 'adminpass';

// Dynamically import the server after setting env vars
const app = (await import('../backend/server.js')).default;

describe('Backend server', () => {
  it('redirects html pages to extensionless routes', async () => {
    const res = await request(app).get('/recarga.html');
    expect(res.status).toBe(301);
    expect(res.headers.location).toBe('/recarga');
  });

  it('handles admin login and fetches users', async () => {
    const login = await request(app)
      .post('/admin/login')
      .send({ username: 'admin', password: 'adminpass' })
      .expect(200);
    const token = login.body.token;

    const users = await request(app)
      .get('/admin/users')
      .set('Authorization', `Bearer ${token}`);
    expect(users.status).toBe(200);
    expect(Array.isArray(users.body.users)).toBe(true);
  });

  it('creates a user via the API', async () => {
    const login = await request(app)
      .post('/admin/login')
      .send({ username: 'admin', password: 'adminpass' });
    const token = login.body.token;

    const res = await request(app)
      .post('/admin/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'dave', password: 'dave123', balance: 50 });
    expect(res.status).toBe(201);
    expect(res.body.username).toBe('dave');
  });
});
