const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required : true
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'task'
        }
    ],
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tag'
        }
    ]
},{
    timestamps: true
});

const User = mongoose.model('user',userSchema);
module.exports = User;