//a controller is a set of different actions
// module.exports.actionName = function(req,res){}
module.exports.home = function(req,res){
    //res.render('fileName',the ejs variable object);
    return res.render('home',{
        title : 'Home'
    });
}