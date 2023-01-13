const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = function(req,res){
    Post.findById(req.body.post,function(error,post){
        if(error){console.log('error in finding post',error);return;}
        //post found
        Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        },function(error,comment){
            if(error){console.log('error in creating comment',error);return;}
            post.comments.push(comment);
            post.save();//save after updating the database
            res.redirect('back');
        });
        
    });
}