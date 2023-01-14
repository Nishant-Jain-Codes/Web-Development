const User = require('../models/user');

module.exports.user = function(req,res){

    return res.render('users',{
        title : 'users'
    });
}

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(error,user){
        if(error){console.log('error in finding user',error);return;}
        return res.render('user_profile',{
            title : 'codeComm | User-Profile',
            profile_user: user
        });
    });
}
//set up sign up action
module.exports.signUp = function(req,res){
    if(req.isAuthenticated())
    {
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "codeComm | Sign Up"
    })
}
// set up sign in action
module.exports.signIn = function(req,res){
    if(req.isAuthenticated())
    {
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "codeComm | Sign Ip"
    })
}
module.exports.destroySession = function(req,res){
    req.logout(function(error){
        if(error){
            console.log('error in logging out ',error);
            return ;
        }
        return res.redirect('/');
    });
    
}
//get the sign up data
module.exports.create = function(req,res){
   if(req.body.password != req.body.confirm_password)
   {
        return res.redirect('back');
   }
   //find if the user exists through its email
   User.findOne({email: req.body.email},function(error,user){
    if(error){console.log('error in finding user while signing up');return;}
    //if user doesn't exist create it
    if(!user){
        User.create(req.body,function(error,user){
            if(error){console.log('error in creating user while signing up');return;}
            return res.redirect('/users/sign-in');
        });
    }
    else{
        return res.redirect('back');
    }
   });
}
//action for create session / logging in
module.exports.createSession = function(req,res){
    return res.redirect('/');
}