// QnD server

var express = require('express');

var app = express();

// hogan-express was the only mustache compatible renderer I could get working on node.js.
app.engine('mst', require('hogan-express'));

// Is this needed?
app.set('view engine', 'mst');

// Render static files
app.use(express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));

// Annoying - why can't I have dynamic partials?
var partials = {
	helloWorld: 'helloWorld',
	rando: 'rando',
	anotherRando: 'anotherRando'
};

app.get('/', function(req, res){
	res.render('index.mst', {
		world: 'Earth',
		partials: partials
	});
});

app.get('/hello', function(req, res) {
	res.render('helloWorld.mst', {
		world: 'Earth',
		partials: partials
	});
});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});