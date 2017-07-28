var express = require('express');
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');

var app = express();

app.use(express.static('public'));

//mongoose.connect("mongodb://localhost:27017/carpool");
app.get("/",function(req,res){
	console.log(__dirname);
	res.status(200).send('/public/index.html');
});


app.get("/dashboard",function(req,res){
    console.log(__dirname);
    res.status(200).sendFile(__dirname + '/public/dashboard.html');
});


app.get("/postadd",function(req,res){
    console.log(__dirname);
    res.status(200).sendFile(__dirname + '/public/postadd.html');
});

app.get("/designtest",function(req,res){
    console.log(__dirname);
    res.status(200).sendFile(__dirname + '/public/designtest.html');
});

app.listen(PORT,function(){
	console.log("Server running on port 3000");
})