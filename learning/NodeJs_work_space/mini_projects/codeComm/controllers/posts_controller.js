module.exports.posts = function(req,res){
    return res.end('<h1>posts page</h1>');
}
module.exports.analytics = function(req,res){
    return res.end('<h1>posts - analytics page</h1>');
}