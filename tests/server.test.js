import request from 'supertest';
import app from '../backend/server.js';

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
});
