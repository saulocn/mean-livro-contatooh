var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


module.exports = function(){

	var app = express();
	//	Passport
	app.use(cookieParser());
	app.use(session({
		secret: 'homem-avestruz-mesmo',
		resave: true,
		saveUninitialized:true
	}));
	app.use(passport.initialize());
	app.use(passport.session());

	//	Fim do Passport


	app.set('port',3000);

	app.use(express.static('./public'));
	app.set('view engine', 'ejs');
	app.set('views', './app/views')
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());

	
	load('models', {cwd:'app'})
	.then('controllers')
	.then('routes')
	.into(app);
	return app;
}
