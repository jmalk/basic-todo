var request = require('supertest')
var app = require('../server')

describe('GET /', () => {
  it('Responds with status 200', (done) => {
    request(app)
      .get('/')
      .expect(200, done)
  })
})
