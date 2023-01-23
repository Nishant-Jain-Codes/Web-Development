const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    detail: {
        type: String,
        required: true
    },
    due: {
        type: Date,
        required: true
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag'
    },
    complete: {
        type: Boolean,
        default: false
    },
    date_issued:{
        type: Date,
        default: Date.now,
    },
    date_finished: {
        type: Date
    }

},{
    timestamps: true
});