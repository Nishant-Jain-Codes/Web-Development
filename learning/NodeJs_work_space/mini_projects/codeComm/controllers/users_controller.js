module.exports.user = function(req,res){

    return res.render('users',{
        title : 'users'
    });
}

module.exports.profile = function(req,res){

    return res.end('<h1>User Profile</h1>');
}
//set up sign up action
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "codeComm | Sign Up"
    })
}
// set up sign in action
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "codeComm | Sign Ip"
    })
}
//get the sign up data
module.exports.create = function(req,res){
    //TODO: later
}
//action for create session / logging in
module.exports.createSession = function(req,res){
    //TODO: later
}