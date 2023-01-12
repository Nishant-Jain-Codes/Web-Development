const Post = require('../models/post');
module.exports.home = function(req,res){
    Post.find({},function(error,posts){
        if(error){console.log('error in finding post to print',error);return;}
        return res.render('home',{
            title : 'Home',
            posts: posts
        });
    })
}