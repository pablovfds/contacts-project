var supertest = require('supertest');

describe('UserController.create', function() {

  describe('#create() - success', function() {
    it('should create a new user', function (done) {
      supertest(sails.hooks.http.app)
      .post('/sign-up')
      .send({
      	"name":"Test",
      	"email":"test44@gmail.com",
      	"password":"11223344",
      	"phone": "(23) 99811-2280"
      })
      .expect(201, done);
    });
  });

  describe('#create() - with email already registered', function() {
    it('should show status 400 when trying to create a new user with an email already registered', function (done) {
      supertest(sails.hooks.http.app)
      .post('/sign-up')
      .send({
      	"name":"Test",
      	"email":"test44@gmail.com",
      	"password":"11223344",
      	"phone": "(23) 99811-2280"
      })
      .expect(400, done);
    });
  });

  describe('#create() - without an email', function() {
    it('should show status 400 when trying to create a new user without an email', function (done) {
      supertest(sails.hooks.http.app)
      .post('/sign-up')
      .send({
      	"name":"Test",
      	"password":"11223344",
      	"phone": "(23) 99811-2280"
      })
      .expect(400, done);
    });
  });

  describe('#create() - without a name', function() {
    it('should show status 400 when trying to create a new user without a name', function (done) {
      supertest(sails.hooks.http.app)
      .post('/sign-up')
      .send({
      	"email":"test5@gmail.com",
      	"password":"11223344",
      	"phone": "(23) 99811-2280"
      })
      .expect(400, done);
    });
  });

  describe('#create() - without a password', function() {
    it('should show status 400 when trying to create a new user without a password', function (done) {
      supertest(sails.hooks.http.app)
      .post('/sign-up')
      .send({
      	"email":"test2@gmail.com",
      	"name":"Test",
      	"phone": "(23) 99811-2280"
      })
      .expect(400, done);
    });
  });

  describe('#create() - without a password', function() {
      it('should show status 400 when trying to create a new user with a password of less than 5 characters', function (done) {
        supertest(sails.hooks.http.app)
        .post('/sign-up')
        .send({
        	"email":"test1@gmail.com",
        	"name":"Test",
          "password":"1122",
        	"phone": "(23) 99811-2280"
        })
        .expect(400, done);
      });
  });
});
