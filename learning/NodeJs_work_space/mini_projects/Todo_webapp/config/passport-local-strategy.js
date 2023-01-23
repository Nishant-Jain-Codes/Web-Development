const passport = require('passport');
const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication
passport.user(new PassportLocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    async function(req,email,password,done){
        try{
            let user = await User.findOne({email:email});
            if(!user || password != user.password){
                req.flash('error','Invalid Mail-Id/Password');
                return done(null,false)
            }
            else{
                return done(null,user);
            }
        }catch(error){
            console.log('error in authenticating user',error);
            return done(error);
        }
    }
));
passport.serializeUser(function(user,done){
    done(null,user.id)
});
passport.deserializeUser(async function(id,done){
    try{
        let user = await User.findById(id);
        return done(false,user);
    }catch(error){
        console.log('Error in finding user --> Passport');
        return done(error);
    }
});
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        return res.redirect('/user/sign-in');
    }
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;