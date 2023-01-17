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
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
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
            post.remove();
            await Comment.deleteMany({post: req.params.id});
        }
        return res.redirect('back');
    }catch(error){
        console.log('error in destroying post ',error);
        return;
    }

}