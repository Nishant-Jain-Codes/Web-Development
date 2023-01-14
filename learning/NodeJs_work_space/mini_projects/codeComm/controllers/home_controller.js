const Post = require('../models/post');
const User= require('../models/user');
module.exports.home = function(req,res){
    //populating multiple fields of the post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(error,posts){
        if(error){console.log('error in finding post to print',error);return;}
        User.find({},function(error,users){
            if(error){console.log('error in finding users to print',error);return;}
            return res.render('home',{
                title : 'codeComm | Home',
                all_posts: posts,
                all_users: users
            });
        });
        // return res.redirect('back');
    });
}