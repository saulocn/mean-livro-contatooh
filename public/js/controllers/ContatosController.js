angular.module('contatooh').controller('ContatosController', 
	function($scope, $routeParams){

		console.log($routeParams.contatoId);
		$scope.filtro ='';

		$scope.contatos = [
			{_id:1,nome:'Contato 1', email:'cont1@empresa.com.br'},
			{_id:2,nome:'Contato 2', email:'cont2@empresa.com.br'},
			{_id:3,nome:'Contato 3', email:'cont3@empresa.com.br'},
		];


		$scope.total = 0;

		$scope.incrementa = function(){
			$scope.total++;
		};
	})