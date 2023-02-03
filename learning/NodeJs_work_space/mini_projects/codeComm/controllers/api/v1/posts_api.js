//index is the name use when you want to list down something 
module.exports.index = function(req,res){
    return res.status(200).json({
        post: [],
        message: "list of posts"
    });
}