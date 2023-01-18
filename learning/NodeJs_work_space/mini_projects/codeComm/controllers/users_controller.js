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
module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(error,user){
            if(error){console.log('error in finding user to update',error);return;}
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized')
    }
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
//get the sign up data
module.exports.create = async function(req,res){
   if(req.body.password != req.body.confirm_password)
   {
        return res.redirect('back');
   }
   //find if the user exists through its email
   try{
        let user = await User.findOne({email: req.body.email});
        if(!user){
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        }
        else{
            return res.redirect('back');
        }
    }catch(error){
        console.log('error in creating user' , error);
        return ;
    }

}
//action for create session / logging in
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');//setting up flash object in request object object.flash('type','message')
    return res.redirect('/');
}
module.exports.destroySession = function(req,res){
        req.logout();
            req.flash('success','Logged out Successfully');
        return res.redirect('/');
};
    
