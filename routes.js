Router.route('/', function () {
	this.render('hello');
})

Router.route('/point/:number', function() {
	Session.set("buttonNumber", this.params.number)
	this.render('nodePress');
})