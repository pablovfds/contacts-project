const bcrypt = require('bcrypt');

const crypto = require('crypto');

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true,
      lowercase:true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    phone: {
      type: 'string',
      required: false
    },
    photo: {
      type: 'string'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },


  /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  signup: function (inputs, cb) {
    // Create a user
    User.create({
      name: inputs.name,
      email: inputs.email,
      // TODO: But encrypt the password first
      password: inputs.password,
      phone: inputs.phone
    })
      .exec(cb);
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  },
  gravatar: function(email) {
    if (!email) {
      return 'https://gravatar.com/avatar/?s=200&d=retro';
    } else {
      var md5 = crypto.createHash('md5').update(email).digest('hex');

      return 'https://gravatar.com/avatar/'+ md5 + '?s=200&d=retro';
    }
  }
};
