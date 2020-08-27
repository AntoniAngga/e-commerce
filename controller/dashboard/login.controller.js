exports.view_login = (req, res) => {
  res.render('login.ejs');
};

exports.action_login = (req, res) => {
  res.send('error');
};
