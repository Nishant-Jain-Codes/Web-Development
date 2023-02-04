const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
// module to extract jwt from header
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
    //header is a list of keys 
    //heder has a key called authorization 
    // tha key have a key called bearer which have the jwt token
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'codeComm',//some secret code acc to which the encryption and decryption of token occurs
}
//telling passport to use jwt strategy

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    //user exists int the JSON web token we are fetching the user if from the JWT payload and checking if the user exists in the db
    User.findById(jwtPayLoad._id,function(error,user){
        if(error){
            console.log('error in finding user using JWT',error);
            return done(error);
        }
        if(user){
            return done(null,user);//the null parameter contains error
        }
        else{
            return done(null,false);//false means no user found
        }
    });
}));
module.exports = passport;