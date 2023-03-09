const Comment = require('../models/comment');
const Post = require('../models/post');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const commentsMailer = require('../mailers/comments_mailer');
module.exports.create = async function(req,res){

    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: post,
                user: req.user._id
            });
            comment = await Comment.findById(comment._id).populate('post').populate('user');
            commentsMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err){
                if(err)
                {
                    console.log('error in creating queue' , err);
                    return ;
                }
                console.log(job.id);
            })
            
            post.comments.push(comment);
            post.save();//save after updating the database
            if(req.xhr){
                console.log('xhr comment req')
                req.flash('success','comment posted');
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: 'Comment Created'
                });
            }          
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