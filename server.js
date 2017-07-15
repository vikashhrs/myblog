var express = require('express');
var PORT = process.env.port || 3000;

var app = express();

app.use(express.static('public'));

app.get("/",function(req,res){
	console.log(__dirname);
	res.status(200).send('/public/index.html');
});


app.get("/dashboard",function(req,res){
    console.log(__dirname);
    res.status(200).sendFile(__dirname + '/public/dashboard.html');
});

app.get("/designtest",function(req,res){
    console.log(__dirname);
    res.status(200).sendFile(__dirname + '/public/designtest.html');
});

app.listen(PORT,function(){
	console.log("Server running on port 3000");
})