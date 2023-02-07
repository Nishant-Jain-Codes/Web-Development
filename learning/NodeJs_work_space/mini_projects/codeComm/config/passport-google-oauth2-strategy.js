const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
passport.use(new googleStrategy({
    clientID :"1071476209247-b2ift9jeihsulgnq1f0i983f294ur96j.apps.googleusercontent.com",
    clientSecret :"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",
    callbackURL: "https://localhost:8000/users/auth/google/callback"
},function(accessToken,refreshToken,profile,done){
    User.findOne({email: profile.emails[0].value}).exec(function(error,user){
        if(error){
            console.log('error in google strategy passport',error);
            return;
        }
        
        console.log('google auth profile',profile)
        console.log('google auth access token',accessToken);
        console.log('google auth refresh token',refreshToken);
        if(user){
            //if user found set this user as req.user
            return done(null,user);
        }else{
            //if not found create the user and set it as req.user i.e sign in the user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes[20].toString('hex')
            },function(error,user){
                if(error){
                    console.log('error in creating user using google strategy',error);
                    return;
                }
                return done(null,user);
            });
        }
    });
}));
module.exports = passport;