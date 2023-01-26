const User = require("../models/user");
const Task = require("../models/task");
const Tag = require("../models/tag");

//to redirect to the user tasklist
module.exports.tasklist = async function(req,res){
    
    try{
        let all_tasks = await Task.find({user:req.user._id})
        .populate('user')
        .populate('tag');
        let all_tags = await Tag.find({ user:req.user._id})
        .populate('user');
        return res.render('tasklist',{
            title: 'To.Do | tasklist',
            all_tags: all_tags,
            all_tasks : all_tasks
        }); 
    }catch(error){
        console.log('error in showing tasklist',error)
        return;
    }
}
