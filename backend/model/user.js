const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastActivityDate: {
        type: Date
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});
module.exports = mongoose.model('User', userSchema);