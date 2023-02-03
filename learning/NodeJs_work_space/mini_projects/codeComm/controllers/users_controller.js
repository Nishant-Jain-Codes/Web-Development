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
module.exports.update = async function(req,res){
    
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(error){
                if(error){
                    console.log('multer error ',error);
                }
                user.name = req.body.name;
                user.email= req.body.email;
                if(req.file){
                    //saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }catch(error){
            console.log(error);
            return res.redirect('back');
        }
        
    }else{
        req.flash('error','Unauthorized access')
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
        title: "codeComm | Sign In"
    })
}
//get the sign up data
module.exports.create = async function(req,res){
   if(req.body.password != req.body.confirm_password)
   {
        req.flash('error',"passwords doesn't match");
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
module.exports.destroySession = async function(req,res){
        await req.logout(function(error){
            console.log(error);
            //return res.redirect('/');

        });
            req.flash('success','Logged out Successfully');
        return res.redirect('/');
};
    
