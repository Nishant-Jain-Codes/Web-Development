const Post = require('../models/post');
const User= require('../models/user');
module.exports.home = async function(req,res){
    try{
        let posts = await Post.find({})
        .sort('--createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            sort: '--createdAt',
            populate: {
                path: 'user'
            },
            populate: {
                path : 'likes'
            }
        }).populate('likes');
        let users = await User.find({});
        
        return res.render('home',{
            title : 'codeComm | Home',
            all_posts: posts,
            all_users: users
        });     
    }catch(error){
        console.log('error: ',error);
        return;
    }
    
}