
module.exports.home = function(req,res){
    return res.end('<h1>home</h1>');
}
module.exports.add_todo = function(req,res){
    return res.end('<h1>add_todo</h1>');
}
module.exports.toggle_todo = function(req,res){
    return res.end('<h1>toggle_todo</h1>');
}
module.exports.delete_todo = function(req,res){
    return res.end('<h1>delete_todo</h1>');
}