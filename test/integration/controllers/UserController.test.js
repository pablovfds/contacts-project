require('../../lifecycle.test');

// let User = require("../../../api/models/User");

describe('UserController', () => {

  beforeEach((done) => {
    User.destroy({}, (err) => {
      done();
    });
  });

  describe('#create - create a new user - success', () => {
    it('should create a new user', (done) => {
      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send({
          "name":"Test",
          "email":"test44@gmail.com",
          "password":"11223344",
          "phone": "(23) 99811-2280"
        })
        .expect(HTTP.CREATED, done);
    });
  });

  describe('#create - with email already registered', async () => {

    let user = {
      "name":"Test",
      "email":"test44@gmail.com",
      "password":"11223344",
      "phone": "(23) 99811-2280"
    };

    await User.create(user);

    it('should show status 400 when trying to create a new user with an email already registered', (done) => {
      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send(user)
        .expect(HTTP.BAD_REQUEST, done);
    });
  });

  describe('#create - without an email', () => {
    it('should show status 400 when trying to create a new user without an email', (done) => {
      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send({
          "name":"Test",
          "password":"11223344",
          "phone": "(23) 99811-2280"
        })
        .expect(HTTP.BAD_REQUEST, done);
    });
  });

  describe('#create - without a name', () => {
    it('should show status 400 when trying to create a new user without a name', (done) => {
      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send({
          "email":"test5@gmail.com",
          "password":"11223344",
          "phone": "(23) 99811-2280"
        })
        .expect(HTTP.BAD_REQUEST, done);
    });
  });

  describe('#create - without a password', () => {
    it('should show status 400 when trying to create a new user without a password', (done) => {
      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send({
          "email":"test2@gmail.com",
          "name":"Test",
          "phone": "(23) 99811-2280"
        })
        .expect(HTTP.BAD_REQUEST, done);
    });
  });

  describe('#create - without a password', () => {
    it('should show status 400 when trying to create a new user with a password of less than 5 characters', (done) => {
      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send({
          "email":"test1@gmail.com",
          "name":"Test",
          "password":"1122",
          "phone": "(23) 99811-2280"
        })
        .expect(HTTP.BAD_REQUEST, done);
    });
  });

  describe('#find - find one user by id - success', () => {

    it('should find a user by id', (done) => {

      let user = {
        "name":"Test2",
        "email":"test442@gmail.com",
        "password":"112223344",
        "phone": "(23) 99811-2280"
      };

      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send(user)
        .expect("Content-type",/json/)
        .expect(HTTP.CREATED)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          supertest(sails.hooks.http.app)
            .get('/user/' + res.body.data.data.id)
            .set('Authorization', 'Bearer ' + res.body.data.token)
            .expect(HTTP.OK).end((err, res1) => {
            if (err) {
              throw err;
            }

            res1.status.should.equal(HTTP.OK);
            res1.body.should.have.property('data');
            res1.body.data.should.have.property("name").eql(res.body.data.data.name);
            res1.body.data.should.have.property("id").eql(res.body.data.data.id);
            res1.body.data.should.have.property("email").eql(res.body.data.data.email);
            done();
          });
        });
    });

  });

  describe('#find - without a token', () => {

    it('should find a user by id', (done) => {

      let user = {
        "name":"Test2",
        "email":"test442@gmail.com",
        "password":"112223344",
        "phone": "(23) 99811-2280"
      };

      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send(user)
        .expect("Content-type",/json/)
        .expect(HTTP.CREATED)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          supertest(sails.hooks.http.app)
            .get('/user/' + res.body.data.data.id)
            .expect(HTTP.UNAUTHORIZED, done);
        });
    });

  });

  describe('#find - find one user by id not registered', () => {
    it('should find a user by id', (done) => {

      let user = {
        "name":"Test2",
        "email":"test442@gmail.com",
        "password":"112223344",
        "phone": "(23) 99811-2280"
      };

      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send(user)
        .expect("Content-type",/json/)
        .expect(HTTP.CREATED)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          supertest(sails.hooks.http.app)
            .get('/user/' + 99898789)
            .set('Authorization', 'Bearer ' + res.body.data.token)
            .expect(HTTP.NOT_FOUND, done);
        });
    });
  })

  describe('#remove - remove one user by id not registered',  () => {
    it('should show status 404 when trying remove a user not registered', (done) => {
      let user = {
        "name":"Test2",
        "email":"test442@gmail.com",
        "password":"112223344",
        "phone": "(23) 99811-2280"
      };

      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send(user)
        .expect("Content-type",/json/)
        .expect(HTTP.CREATED)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          supertest(sails.hooks.http.app)
            .delete('/user/' + 99898789)
            .set('Authorization', 'Bearer ' + res.body.data.token)
            .expect(HTTP.NOT_FOUND, done);
        });
    })
  });

  describe('#remove - without a token',  () => {
    it('should show status 401 when trying remove a user when not pass a token', (done) => {

      let user = {
        "name":"Test2",
        "email":"test442@gmail.com",
        "password":"112223344",
        "phone": "(23) 99811-2280"
      };

      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send(user)
        .expect("Content-type",/json/)
        .expect(HTTP.CREATED)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          supertest(sails.hooks.http.app)
            .delete('/user/' + 99898789)
            .expect(HTTP.UNAUTHORIZED, done);
        });
    })
  });

  describe('#remove - remove one user by id',  () => {
    it('should show status 201 when trying remove a user', (done) => {
      let user = {
        "name":"Test2",
        "email":"test442@gmail.com",
        "password":"112223344",
        "phone": "(23) 99811-2280"
      };

      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send(user)
        .expect("Content-type",/json/)
        .expect(HTTP.CREATED)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          supertest(sails.hooks.http.app)
            .delete('/user/' + res.body.data.data.id)
            .set('Authorization', 'Bearer ' + res.body.data.token)
            .expect(HTTP.OK, done);
        });


    })
  });

  describe('#find - find all users - success', () => {

    it('should show status 200 and return an array with 1 user', (done) => {

      let user = {
        "name":"Test2",
        "email":"test442@gmail.com",
        "password":"112223344",
        "phone": "(23) 99811-2280"
      };

      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send(user)
        .expect("Content-type",/json/)
        .expect(HTTP.CREATED)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          supertest(sails.hooks.http.app)
            .get('/user')
            .set('Authorization', 'Bearer ' + res.body.data.token)
            .expect(HTTP.OK)
            .end((err, res1) => {
              if (err) {
                throw err;
              }

              res1.status.should.equal(HTTP.OK);
              res1.body.should.have.property('data');
              res1.body.should.have.property('data').length(1);
              done();
            });
        });
    });

  });

  describe('#find - find all users without a token', () => {

    it('should show status 401', (done) => {

      let user = {
        "name":"Test2",
        "email":"test442@gmail.com",
        "password":"112223344",
        "phone": "(23) 99811-2280"
      };

      supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send(user)
        .expect("Content-type",/json/)
        .expect(HTTP.CREATED)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          supertest(sails.hooks.http.app)
            .get('/user')
            .expect(HTTP.UNAUTHORIZED, done);
        });
    });

  });


});
