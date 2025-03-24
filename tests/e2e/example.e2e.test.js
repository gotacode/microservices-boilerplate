import request from 'supertest';
import express from 'express';
import routes from '../../src/api/routes/index.js';

const app = express();
app.use(express.json());
app.use('/api', routes);

describe('GET /api/example', () => {
  it('should return a sample entity', async () => {
    const res = await request(app).get('/api/example');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
  });
});
