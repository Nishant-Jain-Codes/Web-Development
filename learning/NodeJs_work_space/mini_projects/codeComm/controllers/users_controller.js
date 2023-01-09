module.exports.user = function(req,res){

    return res.render('users',{
        title : 'users'
    });
}

module.exports.profile = function(req,res){

    return res.end('<h1>User Profile</h1>');
}