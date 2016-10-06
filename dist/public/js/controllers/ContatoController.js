angular.module('contatooh').controller('ContatoController', 	["$scope", "$routeParams", "Contato", function($scope, $routeParams, Contato){
	console.log($routeParams.contatoId);
	$scope.mensagem = {texto:''};


	if($routeParams.contatoId){
		getContato($routeParams.contatoId);
	} else {
		//$scope.contato = {};
		$scope.contato = new Contato();
	}

	Contato.query(function(contatos){
		$scope.contatos = contatos;
	});

	function getContato(idContato){
		Contato.get(
			{id:idContato},
			function(contato){
				$scope.contato = contato;
			},
			function(erro){
				console.log("Não foi possível obter o contato!");
				console.log(erro);
			}
			);
	}

	$scope.salva = function(){
		console.log("Salvando o contato!"+ $scope.contato.nome);
		$scope.contato.$save()
			.then(function(){
				$scope.mensagem = {texto:'Contato salvo com sucesso!'};
				// limpando o formulário
				$scope.contato = new Contato();
			})
			.catch(function(){
				$scope.mensagem = {texto:'Não foi possível salvar o contato!'};

			});
	};

}])