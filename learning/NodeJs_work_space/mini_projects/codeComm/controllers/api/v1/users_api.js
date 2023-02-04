const User = require('../../../models/user');
const jwt = require('jsonwebtoken');//generates the Json Web Token

module.exports.createSession = async function(req,res){
    try {
        console.log('createSession api called');
        let user = await User.findOne({email:req.body.email});    
        if(!user||user.password!=req.body.password){
            return res.json(422,{
                message: 'invalid username or password'
            });
        }
        else{
            return res.json(200,{
                message: 'sign in successfully : here is your token',
                data: {
                    //(payload,key,expiretime)
                    token : jwt.sign((user.toJSON()),'codeComm',{expiresIn: 1000*60*15})
                }
            });
        }
    } catch (error) {
        console.log('error in creating session - user_api ',error);
        return res.json(200,{
            message: "internal server error"
        });
    }
}