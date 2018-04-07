var supertest = require('supertest');

describe('AuthController.login', function() {

  describe('#login() - failed', function() {
    it('must respond with status 401 to an unauthorized user', function (done) {
      supertest(sails.hooks.http.app)
      .post('/login')
      .send({
      	"email":"test44@gmail.com",
      	"password":"11223344",
      })
      .expect(401, done);
    });
  });

  // describe('#create() - without an email', function() {
  //   it('should show status 400 when trying to create a new user without an email', function (done) {
  //     supertest(sails.hooks.http.app)
  //     .post('/sign-up')
  //     .send({
  //     	"name":"Test",
  //     	"password":"11223344",
  //     	"phone": "(23) 99811-2280"
  //     })
  //     .expect(400, done);
  //   });
  // });
  //
  // describe('#create() - without a password', function() {
  //   it('should show status 400 when trying to create a new user without a password', function (done) {
  //     supertest(sails.hooks.http.app)
  //     .post('/sign-up')
  //     .send({
  //     	"email":"test2@gmail.com",
  //     	"name":"Test",
  //     	"phone": "(23) 99811-2280"
  //     })
  //     .expect(400, done);
  //   });
  // });
});
