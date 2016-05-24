var express = require('express');
var bodyparser = require('body-parser');
var pg = require('pg').native;
var cors = require('cors');

var app = express();
var port = process.env.PORT || 8080;

var client = new pg.Client("postgres://cfrdcdkekkltda:t5I8lgC9oRPRLMOCozVughDWR7@ec2-54-243-55-26.compute-1.amazonaws.com:5432/d8gouv7ilgaoe9");
client.connect();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(cors());

app.get('/get', function(req,res,next){
	console.log(req);
	console.log(req.pass);
});

app.post('/post/', function(req,res,next){
	console.log(req.body.name);
	console.log(req.body.pass);

	res.sendStatus(200);
});

app.post('/register', function(req,res,next){
	console.log("jadfaef");
	console.log(req.body.register_data);
	res.sendStatus(200);
});

app.listen(port, function () {
	console.log('Example app listening on port ' + port);
});

