const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = async function(req,res){

    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content[0],
                post: post,
                user: req.user._id
            });
            comment = await Comment.findById(comment._id).populate('post').populate('user');
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: 'Comment Created'
                });
            }
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
            req.flash('success','comment deleted');
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}});
            if(req.xhr){
                console.log('comment deleted');
                return res.status(200).json({
                    data: {
                        post_id: postId,
                        comment_id: req.params.id
                    },
                    message: 'comment deleted'
                });
                
            }
        }
        return res.redirect('back');
        
    }catch(error){
        return ;
    }
    
}