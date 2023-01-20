const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = async function(req,res){

    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();//save after updating the database
            req.flash('success','comment posted');
        }
        return res.redirect('back');
        
    }catch(error){
        return;
    }
    
}
module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}});
            req.flash('success','comment deleted');
        }
        return res.redirect('back');
        
    }catch(error){
        return ;
    }
    
}