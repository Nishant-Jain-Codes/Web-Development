const Comment = require('../models/comment');
const Post = require('../models/post');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const commentsMailer = require('../mailers/comments_mailer');
const Like = require('../models/like');
module.exports.create = async function(req,res){

    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user', 'name email').execPopulate();
            let job = queue.create('emails',comment).save(function(err){
                if(err)
                {
                    console.log('error in creating queue' , err);
                    return ;
                }
                console.log(job.id);
            })
            if(req.xhr){
                console.log('xhr comment req')
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: 'Comment Created'
                });
            }          
            req.flash('success', 'Comment published!');
            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
      
        
    }catch(error){
        return;
    }
    
}
module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            await Like.deleteMany({likeable: comment._id ,onModel: 'Comment'});
            
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}});
            if(req.xhr){
                console.log('comment deleted');
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: 'comment deleted'
                });
                
            }
            req.flash('success','comment deleted');
            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
        
        
    }catch(error){
        console.log({error});
        return ;
    }
    
}