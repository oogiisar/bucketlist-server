const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 404 there should be no default path', () => {
    return supertest(app)
      .get('/')
      .expect(404)
  })
})

