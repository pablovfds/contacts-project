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
	 return res.json({
		 todo: 'findOne() is not implemented yet!'
	 });
 },


 /**
	* `UserController.find()`
	*/
 findAll: function (req, res) {
	 return res.json({
		 todo: 'find() is not implemented yet!'
	 });
 }

};
