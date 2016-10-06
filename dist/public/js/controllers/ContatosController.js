angular.module('contatooh').controller('ContatosController', ["$scope", "$routeParams", "Contato", function($scope, $routeParams, Contato){
	console.log($routeParams.contatoId);
	$scope.filtro ='';
	$scope.mensagem = {texto:''};

	$scope.contatos = [];

	$scope.total = 0;

	$scope.incrementa = function(){
		$scope.total++;
	};




	function buscaContato(){
		Contato.query(

			function(contatos){
				$scope.contatos = contatos;
			},
			function(erro){
				console.log("Não foi possível obter a lista de contatos!");
				console.log(erro);
			}
			);
	}


	$scope.remove = function(contato){
		console.log(contato);
		var promise = Contato.delete({id:contato._id}).$promise;
		promise
		.then(buscaContato)
		.catch(function(erro){
			console.log("Não foi possível remover o contato "+contato);
			console.log(erro);
		});
	}

	buscaContato();


}])