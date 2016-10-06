var sanitize = require('mongo-sanitize');

module.exports = function(app){

	var controller = {};
	var Contato = app.models.contato;

	controller.listaContatos = function(req, res){
		Contato
		.find({})
		.populate('emergencia')
		//.select("nome email")
		//.where("email").equals(/cont/)	
		.exec()
		.then(function(contatos){
			res.json(contatos);
		},
		function(error){
			res.status(500).json(error);
		});

};

controller.obtemContato = function(req,res){
	var _id = req.params.id;
	Contato.findById(_id)
	.exec()
	.then(
		function(contato){
			if(!contato) throw new Error("Contato não encontrado!");
			res.json(contato);
		},
		function(erro){
			console.error(erro);
			res.status(404).json(erro);
		});
};

controller.removeContato = function(req,res){
	var _id = sanitize(req.params.id);
	Contato.remove({"_id":_id})
	.exec()
	.then(
		function(contato){
			res.status(204).end();
		},
		function(erro){
			console.error(erro);
			res.status(404).json(erro);
		});

};

controller.salvaContato = function(req,res){
	var _id = req.body._id;

	/*
		Independente da quantidade de parâmetros,
		apenas selecionamos o nome, e-mail e emergência:
	*/
	var dados = {
		"nome":req.body.nome,
		"email":req.body.email,
		"emergencia":req.body.emergencia||null
	}
	
	if(_id){
		Contato.findByIdAndUpdate(_id, dados).exec()
		.then(
			function(contato){
				res.json(contato);
			},
			function(erro){
				console.error(erro);
				res.status(500).json();
			}

			);
	}else{
		Contato.create(dados)
		.then(
			function(contato){
				res.status(201).json(contato);
			},
			function(erro){
				console.error(erro);
				res.status(500).json(erro);
			}
			);
	}
};


return controller;
}