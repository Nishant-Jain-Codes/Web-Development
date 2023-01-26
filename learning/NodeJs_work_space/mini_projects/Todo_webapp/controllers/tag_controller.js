const Tag = require('../models/tag');

module.exports.create = async function(req,res){
    try{
        let tag = await Tag.create({
            name : req.body.name,
            user : req.user._id
        });
        req.user.tags.push(tag);
        req.user.save();
        req.flash('success','tag created');
        return res.redirect('back');
    }catch(error){
        req.flash('error','error - tag create');
        console.log('error in creating tag',error);
        return;
    }
}
// TODO add delete functionality
// module.exports.destroy = async function(req,res){

// }
// TODO add update functionality
// module.exports.update = async function(req,res){

// }