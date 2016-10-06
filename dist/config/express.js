var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');


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


	// Segurança com Helmet

	app.use(helmet());

	// Escondendo o Powered by no Header
	app.disable('x-powered-by');

	// Utilizando um PoweredBy diferente no Header para confundir hackings
	app.use(helmet.hidePoweredBy({setTo:'PHP 5.5.14'}));

	// Não permitir que a aplicação seja acessível através de um iframe
	app.use(helmet.xframe());

	// Não permitir XSS
	app.use(helmet.xssFilter());

	// Não permitir que o browser infira o MIME type
	app.use(helmet.nosniff());

	// Fim dos middlewares de segurança do Helmet



	app.set('port',3000);

	app.use(express.static('./public'));
	app.set('view engine', 'ejs');
	app.set('views', './app/views')
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());

	
	load('models', {cwd:'app'})
	.then('controllers')
	.then('routes/auth.js')
	.then('routes')
	.into(app);

	app.get('*', function(req,res){
		res.status(404).render('404');
	});
	return app;
}
