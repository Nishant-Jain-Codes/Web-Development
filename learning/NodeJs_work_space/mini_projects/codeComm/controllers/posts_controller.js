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
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        req.flash('success','post created');
        return res.redirect('back');

    }catch(error){
        console.log('error in creating post',error);
        return ;
    }
    
}
module.exports.destroy = async function(req,res){
    
    try{
        let post = await Post.findById(req.params.id);
        if(post.user==req.user.id)
        {           
            req.flash('success','post deleted');
            post.remove();
            await Comment.deleteMany({post: req.params.id});
        }
        return res.redirect('back');
    }catch(error){
        console.log('error in destroying post ',error);
        return;
    }

}