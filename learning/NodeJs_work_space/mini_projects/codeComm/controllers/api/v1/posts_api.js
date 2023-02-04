const Post = require('../../../models/post')
const Comment = require('../../../models/comment')
//index is the name use when you want to list down something 
module.exports.index = async function(req,res){
    let posts = await Post.find({})
        .sort('--createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            sort: '--createdAt',
            populate: {
                path: 'user'
            }
        });
    //remove the users password from the api
    for(let post of posts){
        post.user.password = null;
        if(post.comments){
            for(let comment of post.comments){
                comment.user.password = null
            }
        }
    }
    return res.status(200).json({
        posts: posts,
        message: "list of posts"
    });
}
module.exports.destroy = async function(req,res){
    
    try{
        let post = await Post.findById(req.params.id);
        if(!post||post.user != req.user.id){
            return res.json(401,{
                message: "you can not delete this post"
            });
        }
        else{
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            return res.json(200,{
                message: "post and associated comments deleted successfully"
            });
        }     
        
    }catch(error){
        console.log('error in destroying post ',error);
        return res.json(200,{
            message: "internal server error"
        });
    }

}