const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/index');
// const { Op } = require('sequelize');

module.exports = function (passport, req) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
    User.findByPk(id)
      .then((users) => {
        done(null, users);
      })
      .catch((err) => {
        done(null, err);
      });
  });

  passport.use(
    'local-signin',
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    new LocalStrategy(function (req, email, password, done) {
      User.findOne({
        where: {
          email: email,
        },
      })
        .then((data) => {
          console.log(data);
          return done(null, data);
        })
        .catch((err) => {
          return done(err);
        });
    })
  );
};
