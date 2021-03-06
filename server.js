var express = require('express');
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');
var Post = require('./models/post');
var Message = require('./models/message');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

mongoose.connect("mongodb://vikashhrs:12345@ds127983.mlab.com:27983/myblog");
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
    console.log(req.headers.postid);
    Post.findOne({_id : req.headers.postid},function (err,post) {
        if(err)
            throw err;
        res.send(post);
    })

});

app.post('/save-user-message',function(req,res){
    console.log(req.body.data);
    var message = new Message(req.body.data);
    message.save(function(err){
        if(err){
            console.log(err);
            res.send({message : "Facing some techical difficulties try after some time"});
        }else{
            res.send({message : "Thanks!I received your message successfully will get back to you soon."})
        }
    })
    
})

app.get('/get-me-my-resume',function(req,res){
    res.sendFile(__dirname + '/public/VikashKSResume.pdf');
});

app.listen(PORT,function(){
	console.log("Server running on port 3000");

});