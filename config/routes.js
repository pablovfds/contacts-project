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

  'post /login': {
    controller: 'AuthController',
    action: 'login'
  },
  'get /logout': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'AuthController',
    action: 'logout'
  },

  /***************************************************************************
  *                                                                          *
  *                                 User                                     *
  *                                                                          *
  ***************************************************************************/

  'post /sign-up': {
    controller: 'UserController',
    action: 'create'
  },
  'put /user/:id': {
    controller: 'UserController',
    action: 'update'
  },
  'delete /user/:id': {
    controller: 'UserController',
    action: 'destroy'
  },
  'get /user': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'UserController',
    action: 'findAll'
  },
  'get /user/:id': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'UserController',
    action: 'find'
  }
};
