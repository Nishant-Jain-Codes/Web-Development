const mongoose = require('mongoose');
const tagSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps: true
});
const Tag = mongoose.model('tag',tagSchema);
module.exports = Tag;