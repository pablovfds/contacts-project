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
    // Attempt to signup a user using the provided parameters
    User.create(req.body).exec(function (err, user) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      // If user created successfuly we return user and token as response
      if (user) {
        // NOTE: payload is { id: user.id}
        res.json(200, {user: user, token: jwToken.issue({id: user.id})});
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
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  },


  /**
   * `UserController.findOne()`
   */
  find: function (req, res) {

    var responseObject = {};

    User
      .findOne(req.param('id'))
      .exec(function (err, user) {
        if (err) {
          responseObject = {
            status: MessageService.HTTP.SERVER_ERROR,
            message: MessageService.USER.ERROR_SEARCHING_USER,
            error: err
          };
          return res.serverError(responseObject);
        }
        if (user) {
          // NOTE: payload is { id: user.id}

          responseObject = {
            status: MessageService.HTTP.OK,
            user: user
          };

          res.json(responseObject)
        } else {
          responseObject = {
            status: MessageService.HTTP.NOT_FOUND,
            message: MessageService.USER.ERROR_NOT_FOUND
          };

          return res.notFound(responseObject);
        }
      });
  },


  /**
   * `UserController.find()`
   */
  findAll: function (req, res) {
    var responseObject = {};

    User
      .findOne({})
      .exec(function (err, users) {
        if (err) {
          responseObject = {
            status: MessageService.HTTP.SERVER_ERROR,
            message: MessageService.USER.ERROR_SEARCHING_USER,
            error: err
          };
          return res.serverError(responseObject);
        }
        responseObject = {
          status: MessageService.HTTP.OK,
          users: users
        };

        res.json(responseObject);
      });
  }

};
