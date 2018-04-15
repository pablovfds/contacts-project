/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const passport = require('passport');

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  login: function (req, res) {

    passport.authenticate('local', function (err, user, info) {
      if ((err) || (!user)) {
        return res.json(401,
          {
            message: info.message,
            user:user
          });
      }
      req.logIn(user, function (err) {
        if (err) res.send(err);
        return res.send({
          msg: info.message,
          user: user,
          token: jwToken.issue({id: user.id}),
          expire_at: jwToken.getExpireTime()
        });
      });

    })(req, res);
  },

  logout: function (req, res) {
    req.logout();

    res.json(201,{
      message: "You have successfully logged out!"
    });
  }
};
