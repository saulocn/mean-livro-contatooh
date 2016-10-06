angular.module('contatooh').factory('Contato', function($resource){
	return $resource('/contatos/:id', {},
		{
			'query':
			{
				method:'GET',
				isArray:true
			}
		}
	);
});