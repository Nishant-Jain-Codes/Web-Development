const User = require("../models/user");
const task = require("../models/task");

//to redirect to the user tasklist
module.exports.tasklist = async function(req,res){
    let user = req.user;
    console.log('user', user);
    return res.render('tasklist',{
        title: 'To.Do | tasklist',
        all_tags: user.tags,
        all_tasks : user.tasks
    });    
}
