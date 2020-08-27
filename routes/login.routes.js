module.exports = (app) => {
  const dashboard = require('../controller/dashboard/login.controller');
  const passport = require('passport');

  //Login page
  app.get('/login', dashboard.view_login);

  app.post(
    '/login',
    passport.authenticate('local-signin', {
      successRedirect: '/',
      failureRedirect: '/login',
    })
  );
};
