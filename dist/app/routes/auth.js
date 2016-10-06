var passport = require('passport');
module.exports = function(app){
	var controller = app.controllers.auth;
	app.get('/auth/github', passport.authenticate('github'));
	app.get('/auth/github/callback', passport.authenticate('github',{
		successRedirect:'/'
	}));
	app.get('/logout', controller.logout);
}