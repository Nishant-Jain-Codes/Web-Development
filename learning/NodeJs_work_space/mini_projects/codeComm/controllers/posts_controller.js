const Post = require('../models/post');
module.exports.posts = function(req,res){
    return res.render('home',{
        title:'posts'
    });
}
module.exports.analytics = function(req,res){
    return res.end('<h1>posts - analytics page</h1>');
}
module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(error,post){
        if(error){console.log('error in creating post',error);return ;}
        return res.redirect('back');
    });
}