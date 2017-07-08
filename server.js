var express = require('express');
var PORT = process.env.port || 3000;

var app = express();

app.use(express.static('public'));

app.get("/",function(req,res){
	res.status(200).send('/public/index.html');
});

app.listen(PORT,function(){
	console.log("Server running on port 3000");
})