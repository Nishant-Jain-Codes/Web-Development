//a controller is a set of different actions
// module.exports.actionName = function(req,res){}
module.exports.home = function(req,res){
    return res.end('<h1>express is running home</h1>');
}