const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId
    },
    // this defines the object id of the liked object
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath : "onModel"
    },
    // this field is a dynamic reference which defines the type of the liked object
    onModel: {
        type: String,
        required: true,
        // enum teller all the only possible values for likeable field
        enum: ['Post','Comment']
    }
},{
    timestamps: true
});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;