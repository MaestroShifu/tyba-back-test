import request from 'supertest';
import app from '../../../src/infraestructure/server/server';

describe('Server management', () => {
  it('Successful server start', (done) => {
    request(app).get('/').expect(200, done);
  });
});
