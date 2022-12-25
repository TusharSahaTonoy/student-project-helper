const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const RoleSchema = new Schema({
    title: { type: String, required: true },
    name: { type: String, unique: true, required: true }
}, { timestamps: true });

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;