/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * `UserController.signup()`
   */
  create: function (req, res) {

    let user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      photo: User.gravatar(req.body.email)
    };

    User.create(user).exec(function (err, user) {
      if (err) {
        return res.json(err.status, {err: err});
      }

      if (user) {
        res.ok({user: user, token: jwToken.issue({id: user.id})});
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
        return res.ok({msg:MessageService.USER.DELETED}, MessageService.HTTP.OK);
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

        if (!_user) return res.notFound({ err: MessageService.USER.ERROR_NOT_FOUND});

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
          return res.notFound({err: MessageService.USER.ERROR_NOT_FOUND});
        }
        return res.ok(_users, MessageService.HTTP.OK);

      })
      .catch(err => res.serverError(err));
  }

};
