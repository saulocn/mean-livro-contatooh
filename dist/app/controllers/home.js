module.exports = function(){
	var controller = {};
	controller.index = function(req, res){
		var login = '';
		if(req.user){
			login = req.user.login;
		}
		res.render('index', {"usuarioLogado":login});
	}
	return controller;
}