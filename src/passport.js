const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;

const User = require('../models/user.js');

module.exports = function setPassportConfig(passport) {
  passport.use(new LocalStrategy(
    {
      usernameField: 'e-mail',
      passwordField: 'password'
    },
    function verify(email, password, callback) {
      User.findOne({ email: email, password })
      .then(user => {
        if (!user) {
          return callback(null, false, {message: 'Incorrect username or password.'});
        } else {
          return callback(null, user);
        }
      })
      .catch(err => {
        return callback(err);
      });
    })
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret'
      },
      function verify(jwtPayload, callback) {
        User.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error)
        });
      }
    )
  );
};
