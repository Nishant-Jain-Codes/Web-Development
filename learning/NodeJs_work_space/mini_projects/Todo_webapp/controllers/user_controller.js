const User = require("../models/user");

//redirects to user data page
module.exports.user = function(req,res){
    return res.render('user',{
        title: "ToDo | user"
    })
}
//redirecting to sign in and sign up pages
module.exports.sign_in = function(req,res){
    return res.render('user_sign_in',{
        title: 'To.Do | SIGN IN'
    })
}
module.exports.sign_up = function(req,res){
    return res.render('user_sign_up',{
        title: 'To.Do | SIGN UP'
    })
}
//creating and deleting sessions
module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error',"passwords doesn't match");
        return res.redirect('back');
    }
    try{
        let user = await User.findOne({email: req.body.email});
        if(user)
        {
            req.flash('error',"user already exists");
            return res.redirect('back');
        }
        else{
            req.flash('success',`user: ${req.body.name} created`);
            await User.create(req.body);
            return res.redirect('/user/sign-in');
        }

    }catch(error){
        console.log("Error in creating user",error);
        return;
    }
}
module.exports.createSession = function(req,res){
    req.flash('success',`user ${req.body.name} signed in`);
    return res.redirect('/')
}
module.exports.destroySession = function(req,res){
    req.logout(function(error){
        if(!error){
            req.flash('success','Logged out Successfully');
            return res.redirect('/');
        }
    });
}