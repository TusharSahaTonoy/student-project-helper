const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    _type: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;

/* role: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true 
    } */