module.exports = function(){
	var controller = {};
	controller.logout = function(req, res){
		req.logOut(); // exposto pelo passport
		res.redirect('/');
	}
	return controller;
}