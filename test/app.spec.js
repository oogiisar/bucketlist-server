const knex = require('knex')
const app = require('../src/app');
const AuthService = require('../src/auth/auth-service');

describe('App', () => {
  it('GET / responds with 404 there should be no default path', () => {
    return supertest(app)
      .get('/')
      .expect(404)
  })
})


describe('Bucketlist endpoints', function() {

  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.DATABASE_URL,
    })
    app.set('db', db)
  })

  let token

  before('get AuthToken', () => {
    const sub = 'oogiisar@gmail.com'
    const payload = {user_is: 1}
    token = AuthService.createJwt(sub, payload)
  })

  after('disconnect from db', () => db.destroy())

  it('Gets users bucket', () => {
    return supertest(app)
      .get('/api/bucketlist/1')
      .set('authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf.at.least(1)
        const bucket = res.body[0]
        expect(bucket).to.include.key('item')
        expect(bucket.item).to.include.all.keys('id', 'text', 'completed', 'tasks')
        expect(bucket.item.tasks).to.be.an('array')
      })   
  })

  it('Adds item and task to bucket', (done) => {
    const user_id = 1 
    const item = 'testItem' 
    const type = 'item'
    supertest(app)
      .post('/api/bucketlist/1')
      .set('authorization', `bearer ${token}`)
      .send({
        user_id: user_id, 
        item: item,
        type: type
      })
      .expect(201)
      .end(done());

    supertest(app)
      .post('/api/bucketlist/1')
      .set('authorization', `bearer ${token}`)
      .send({
        item: task,
        item_id: item_id,
        type: type
      })
      .expect(201)
      .end(done());
  })

  /*it('Adds task to item', (done) => {
    const task = 'testTask' 
    const item_id =  1
    const type = 'task'
    return supertest(app)
      .post('/api/bucketlist/1')
      .set('authorization', `bearer ${token}`)
      .send({
        item: task,
        item_id: item_id,
        type: type
      })
      .expect(201)
      .end(done());
  })*/
})

describe('Users Endpoint', function() {

  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.DATABASE_URL,
    })
    app.set('db', db)
  })

  let token

  before('get AuthToken', () => {
    const sub = 'oogiisar@gmail.com'
    const payload = {user_is: 1}
    token = AuthService.createJwt(sub, payload)
  })

  after('Remove added user from db,', () =>
    db('users')
      .where('email', 'testing@test.com')
      .del()
  )
  after('disconnect from db', () => db.destroy())

  it('Adds user to db', () => {
    const password = '!QAZ2wsx' 
    const email = 'testing@test.com' 
    return supertest(app)
      .post('/api/users')
      .send({
        email: email, 
        password: password
      })
      .expect(201)
  })
})

describe('Auth Endpoint', function() {

  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.DATABASE_URL,
    })
    app.set('db', db)
  })

  before('Add test user', () => {
    const password = '!QAZ2wsx' 
    const email = 'testing@test.com' 
    return supertest(app)
      .post('/api/users')
      .send({
        email: email, 
        password: password, 
      })
  })

  after('Remove added user from db,', () =>
  db('users')
    .where('email', 'testing@test.com')
    .del()
  )
  after('disconnect from db', () => db.destroy())

  it('Login and gets Token', () => {
    return supertest(app)
      .post('/api/auth/login')
      .send({
        email: 'testing@test.com',
        password: '!QAZ2wsx'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('object')
        const token = res.body
        expect(token).to.include.all.keys('authToken')
      })   
  })
})