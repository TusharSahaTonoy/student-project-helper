const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const UserSchema = new Schema({
    title: { type: String, required: true },
    name: { type: String, required: true }
}, { timestamps: true });

const Role = mongoose.model('Role', UserSchema);

module.exports = Role;