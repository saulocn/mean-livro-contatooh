var mongoose = require('mongoose');
module.exports=function(uri){
	mongoose.connect(uri, {server : {poolsize:15}});

	mongoose.connection.on('connected',function(){
		console.log('Mongoose! Conectado em '+uri);
	});

	mongoose.connection.on('disconnected',function(){
		console.log('Mongoose! Desconectado!');
	});

	mongoose.connection.on('error',function(erro){
		console.log('Mongoose! Erro de conexão:'+erro);
	});

	mongoose.set('debug', true);


	process.on('SIGINT', function(){
		mongoose.connection.close(function(){
			console.log('Mongoose! Desconectado pelo término da aplicação!');
			process.exit(0);
		});
	});
}