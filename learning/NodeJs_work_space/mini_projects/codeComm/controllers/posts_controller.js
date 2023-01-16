const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.posts = function(req,res){
    return res.render('home',{
        title:'posts'
    });
}
module.exports.analytics = function(req,res){
    return res.end('<h1>posts - analytics page</h1>');
}
module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');

    }catch(error){
        console.log('error in creating post',error);
        return ;
    }
    
}
module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(error,post){
        if(error){console.log('error in finding post to delete',error);return;}
        if(post.user == req.user.id)//.id means converting the object id to string
        {
            post.remove();
            Comment.deleteMany({post: req.params.id},function(error){
                if(error){console.log('error in deleting comments of the post',error);return;}
                return res.redirect('back');
            });
        }
        else {
            res.redirect('back');
        }
    });
}