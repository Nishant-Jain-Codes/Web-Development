const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true // allows req callback function to exist
    },
    function(req,email,password,done){
        //find a user and establis the identity
        User.findOne({email:email},function(error,user){
            if(error){
                req.flash('error','user not found')
                return done(error);
            }
            //user not found or password doesn't match
            if(!user || user.password!=password){
                req.flash('error','Invalid Username/Password')
                return done(null,false);
                //done(error,authenticationSuccessfull)
            }
            //user found and password is correct
            return done(null,user);
        })
    }
));

// serializing(providing) the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    //setting user.id in the cookie
    done(null,user.id);
});

// deserializing(accessing) the user from he key in the cookie 
passport.deserializeUser(function(id,done){
    User.findById(id,function(error,user){
        if(error){
            console.log('Error in finding user --> Passport');
            return done(error);
        }
        return done(false,user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if user is signed in i.e authenticated pass the request to the next function(i.e controllers)
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in');
}
// providing the user data for the views of a authenticated user
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current sign-in user from the session cookie and we are sending the cookie to the response for the views 
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;