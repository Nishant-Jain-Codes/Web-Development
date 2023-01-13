const Post = require('../models/post');
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
        return res.render('home',{
            title : 'codeComm | Home',
            posts: posts
        });
    });
}