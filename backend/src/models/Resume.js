const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        default: 'My Resume'
    },
    data: {
        type: Object, // Stores the entire JSON structure of the resume
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
