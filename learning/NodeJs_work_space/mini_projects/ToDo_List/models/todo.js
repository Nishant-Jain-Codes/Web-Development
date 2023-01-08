const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    details : {
        type : String,
        required: true
    },
    category :{
        type : String,
        required: true
    },
    due_date :{
        type : Date,
        required : true
    },
    task_done :{
        type : Boolean,
        default : false
    }

});
const todo = mongoose.model('todo',todoSchema);
module.exports = todo;