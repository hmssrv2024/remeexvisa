import request from 'supertest';

// Ensure the admin credentials are set for the test environment
process.env.ADMIN_USERNAME = 'admin';
process.env.ADMIN_PASSWORD = 'adminpass';

// Dynamically import the app after setting env vars
const app = (await import('../api/admin.js')).default;

describe('Admin API', () => {
  let token;

  it('rejects invalid login', async () => {
    const res = await request(app)
      .post('/admin/login')
      .send({ username: 'bad', password: 'creds' });
    expect(res.status).toBe(401);
  });

  it('logs in successfully', async () => {
    const res = await request(app)
      .post('/admin/login')
      .send({ username: 'admin', password: 'adminpass' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('returns users when authorized', async () => {
    const res = await request(app)
      .get('/admin/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
  });

  it('creates a user', async () => {
    const res = await request(app)
      .post('/admin/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'charlie', password: 'charlie789', balance: 300 });
    expect(res.status).toBe(201);
    expect(res.body.username).toBe('charlie');
  });

  it('updates and retrieves a user password', async () => {
    await request(app)
      .put('/admin/users/1/password')
      .set('Authorization', `Bearer ${token}`)
      .send({ password: 'newpass' })
      .expect(200);

    const res = await request(app)
      .get('/admin/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.password).toBe('newpass');
  });

  it('deletes a user', async () => {
    await request(app)
      .delete('/admin/users/2')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await request(app)
      .get('/admin/users/2')
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });
});
