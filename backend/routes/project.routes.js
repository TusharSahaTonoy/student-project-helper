const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { Project } = require('../Model');
const project_image_path = './public/image/projects/';

//! Use of Multer
const storage = multer.diskStorage({
    // destination: "./public/image/projects",
    destination: project_image_path,
    filename: function (req, file, cb) {
        cb(null, "p-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single("file");



// get routes
router.get('/projects', async (req, res) => {

    const result = await Project.find();
    return res.json(result);
});

// post
router.post('/project/add', upload, async (req, res) => {
    // console.log(req.body);
    // console.log(req);

    let newProjec = {
        title: req.body.name,
        price: req.body.price,
    };

    if (!req.file) {
        console.log("No file upload");
    } else {
        newProjec.image = req.file.filename || null;
    }

    const newProject = new Project(newProjec);
    let result = await newProject.save();

    res.json(result);
});


router.get('/project/images/:image', (req, res) => {
    return res.sendFile(project_image_path + req.params.image, { root: __dirname });
});