var app = require("express")();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.post('/',function(req,res){
		var msg=req.body.msg;
		console.log("python: " + msg);
});

 http.listen(3000, function(){
	console.log('listening...');
  });
