module.exports.index = function(req,res){
    return res.status(200).json({
        post: [],
        message: "list of posts"
    });
}