/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const MessageService = require('../services/MessageService');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

module.exports = {
  /**
   * `UserController.signup()`
   */
  create: function (req, res) {

    let user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      photo: User.gravatar(req.body.email),
      phone: req.body.phone
    };

    User.create(user).exec(function (err, user) {
      if (err) {
        return res.json(err.status, { err: err });
      }

      if (user) {
        res.ok({ data: user, token: jwToken.issue({ id: user.id }) }, MessageService.HTTP.CREATED, MessageService.USER.CREATED);
      }
    });
  },

  /**
   * `UserController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `UserController.destroy()`
   */
  destroy: function (req, res) {

    let userId = req.param('id');

    if (!userId) return res.badRequest({ err: 'missing user_id field' });

    User.destroy({ id: userId })
      .then(_user => {
        if (!_user || _user.length === 0) return res.notFound({ err: MessageService.USER.ERROR_DELETING_USER });
        return res.ok({ msg: MessageService.USER.DELETED }, MessageService.HTTP.OK);
      })
      .catch(err => res.serverError(err));
  },


  /**
   * `UserController.findOne()`
   */
  find: function (req, res) {

    let userId = req.param('id');

    if (!userId) return res.badRequest({ err: 'missing user_id field' });

    User.findOne({ id: userId })
      .then(_user => {

        if (!_user) return res.notFound({ err: MessageService.USER.ERROR_NOT_FOUND });

        return res.ok(_user, MessageService.HTTP.OK);
      })
      .catch(err => res.serverError(err));
  },


  /**
   * `UserController.find()`
   */
  findAll: function (req, res) {

    User.find()
      .then(_users => {

        if (!_users || _users.length === 0) {
          return res.notFound({ err: MessageService.USER.ERROR_NOT_FOUND });
        }
        return res.ok(_users, MessageService.HTTP.OK);

      })
      .catch(err => res.serverError(err));
  },

  forgotPassword: (req, res, next) => {
    async.waterfall([
      (done) => {
        crypto.randomBytes(20, (err, buf) => {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      (token, done) => {
        User.findOne({ email: req.body.email }, (err, user) => {
          if (!user) {
            res.notFound({ 'err': 'No account with that email address exists.' });
          } else {
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save((err) => {
              done(err, token, user);
            });
          }
        });
      },
      (token, user, done) => {
        var smtpTransport = nodemailer.createTransport(
          "smtps://pablovitor20@gmail.com:" + 
          encodeURIComponent('21dadaw22') + 
          "@smtp.gmail.com:465");

        var mailOptions = {
          to: user.email,
          from: 'passwordreset@demo.com',
          subject: 'Contacts Project - Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://localhost:4200/#/form/reset-password/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, (err) => {
          res.ok({}, MessageService.HTTP.OK, 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        });
      }
    ]);
  },

  resetPassword: (req, res) => {
    console.log(req.param('token'))

    if (!req.body.password) return res.badRequest({ err: 'Missing password field' })

    async.waterfall([
      function (done) {
        User.findOne({ resetPasswordToken: req.param('token') }, function (err, user) {
          if (!user) {
            return res.notFound({ 'err': 'Password reset token is invalid or has expired.' });
          }

          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save((err) => {
              done(err, user);
          });
        });
      },
      (user, done) => {
        var smtpTransport = nodemailer.createTransport(
          "smtps://pablovitor20@gmail.com:" + 
          encodeURIComponent('sad21232') + 
          "@smtp.gmail.com:465");

        var mailOptions = {
          to: user.email,
          from: 'passwordreset@demo.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          res.ok({}, MessageService.HTTP.OK, 'Success! Your password has been changed.');  
        });
      }
    ]);

  }

};
