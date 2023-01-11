const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email'
    },
    function(email,password,done){
        //find a user and establis the identity
        User.findOne({email:email},function(error,user){
            if(error){
                console.log('Error in finding user --> Passport');
                return done(error);
            }
            //user not found or password doesn't match
            if(!user || user.password!=password){
                console.log('Invalid Username/Password');
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
module.exports = passport;