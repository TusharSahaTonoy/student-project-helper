import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: false },
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);

export default Project;