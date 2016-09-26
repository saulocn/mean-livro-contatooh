var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function(){
	var Usuario = mongoose.model('Usuario');
	passport.use(new GitHubStrategy({
		clientID:'',
		clientSecret:'',
		callbackURL:''
	},
	function(accessToken, refreshToken, profile, done){
		Usuario.findOrCreate(
			{"login":profile.username},
			{"nome":profile.username},
			function(erro,usuario){
				if(erro){
					console.log(erro);
					return done(erro);
				}
				return done(null, usuario);
			}

			);
	}));


	/* 

		Chamado apenas UMA vez e recebe o usuário de nosso banco disponibilizado pelo CallBack da estratégia de autenticação.
		Realizará a serialização apenas do ObjectId do usuário na sessão.

	*/
	passport.serializeUser(function(usuario, done){
		done(null, usuario._id);
	});

	/*
		Recebe o ObjectId do usuário armazenado na sessão.
		Chamado a CADA requisição.
	*/

	passport.deserializeUser(function(id,done){
		Usuario.findById(id).exec()
			.then(function(usuario){
				done(null, usuario);
			});
	});
}