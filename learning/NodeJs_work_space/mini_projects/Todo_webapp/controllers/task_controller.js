const Tag = require('../models/tag');
const Task = require('../models/task');

module.exports.create = async function(req,res){
    try{
        let task = await Task.create({
            detail: req.body.detail,
            due: req.body.due,
            user: req.user,
            tag:req.body.tag, 
        });
        req.user.tasks.push(task);
        req.user.save();
        req.flash('success','task added');
        return res.redirect('back');
    }catch(error){
        req.flash('error','error - task create');
        console.log('error in creating task', error)
        return;
    }
}
module.exports.destroy = async function(req,res){

}
module.exports.update = async function(req,res){

}