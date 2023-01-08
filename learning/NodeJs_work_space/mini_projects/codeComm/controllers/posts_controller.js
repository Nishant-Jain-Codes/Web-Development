module.exports.posts = function(req,res){
    return res.render('home',{
        title:'posts'
    });
}
module.exports.analytics = function(req,res){
    return res.end('<h1>posts - analytics page</h1>');
}