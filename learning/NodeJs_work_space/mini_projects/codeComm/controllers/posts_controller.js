const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
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
        post = await Post.findById(post._id).populate('user');
        if(req.xhr){
            //wer return json with a status\
            req.flash('success','post created');
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        return res.redirect('back');

    }catch(error){
        console.log('error in creating post',error);
        return ;
    }
    
}
module.exports.destroy = async function(req,res){
    
    try{
        let post = await Post.findById(req.params.id);
        console.log('post',post);
        if( post.user==req.user.id)
        {           
            await Like.deleteMany({likeable:post , onModel: 'Post'});
            await Like.deleteMany({_id : {$in: post.comments}});
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                console.log('post deleted');
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'post deleted'
                });
            }
            req.flash('success','post deleted');
        }        
        return res.redirect('back');
    }catch(error){
        console.log('error in destroying post ',error);
        return;
    }

}