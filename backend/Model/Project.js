const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: false },
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;