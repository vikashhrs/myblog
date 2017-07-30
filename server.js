var express = require('express');
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');
var Post = require('./models/post');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/myblog");
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

app.post('/postadd/add-a-new-post',function (req,res) {
    console.log(req.body);
    var newPost = new Post(req.body.data);
    newPost.save(function (err) {
        if(err)
            throw err;

        res.status(200).send({message : "Post Saved"});
    });

});

app.get('/get/all/posts',function (req,res) {
    Post.find(function (err,posts) {
        if(err)
            throw err;
        else
            res.send({results : posts});
    });
});

app.get('/get-me-my-post',function (req,res) {
    console.log(req.body.id);
    res.send(200);
});

app.listen(PORT,function(){
	console.log("Server running on port 3000");

});