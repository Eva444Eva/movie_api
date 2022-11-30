const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');

const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../../models/user.js');

module.exports = function setPassportConfig(passport) {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function verify(email, password, callback) {
      User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return callback(null, false, {message: 'Incorrect username!'});
        }
        else if (!user.validatePassword(password)) {
          return callback(null, false, {message: 'Incorrect password!'});
        }
        else {
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
