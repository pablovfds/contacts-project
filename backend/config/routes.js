module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'homepage' },

  /***************************************************************************
  *                                                                          *
  *                                 AUTH                                     *
  *                                                                          *
  ***************************************************************************/

  'post /login': 'AuthController.login',
  '/logout': 'AuthController.logout',

  /***************************************************************************
  *                                                                          *
  *                                 User                                     *
  *                                                                          *
  ***************************************************************************/

  'post /signup': {
    controller	: 'UserController',
    action		: 'create'
  },
  'put /user/:id': {
    controller	: 'UserController',
    action		: 'update'
  },
  'delete /user/:id': {
    controller	: 'UserController',
    action		: 'destroy'
  },

  'get /user': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller	: 'UserController',
    action		: 'findAll'
  },
  'get /user/:id': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller	: 'UserController',
    action		: 'find'
  }
};
