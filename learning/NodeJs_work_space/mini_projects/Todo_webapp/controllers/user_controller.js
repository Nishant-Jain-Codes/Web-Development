const { model } = require("mongoose");
const User = require("../../codeComm/models/user");

//redirects to user data page
module.exports.user = function(req,res){
    return res.render('user',{
        title: "ToDo | user"
    })
}
//sign up a new user ==> create
module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        //TODO: show a flash message
        // req.flash('error',"passwords doesn't match");
        return res.redirect('back');
    }
    try{
        let user = await User.findOne({email: req.body.email});
        if(user)
        {
            //TODO: show a flash message
            // req.flash('error',"user already exists");
            return res.redirect('back');
        }
        else{
            //TODO: show a flash message
            // req.flash('success',`user: ${req.body.name} created`);
            await User.create(req.body);
            return res.redirect('/user/sign-in');
        }

    }catch(error){
        console.log("Error in creating user",error);
        return;
    }
}
module.exports.createSession = async function(req,res){
    //TODO handel create session by passport js and setting up passport authentication
}