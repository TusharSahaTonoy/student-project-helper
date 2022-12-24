/** 
 * import express
 * const app = express();
 * app.listen(port, () => {
    console.log('Server stated at '+ base_url);
});
 */
'use strict';

// -------------------- package inport ----------------------- //
const express = require("express");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
// -------------------- end package inport ----------------------- //


// import ServerlessHttp from "serverless-http";

// ----------------- configure section
require('dotenv').config();
const project_image_path = './public/image/projects/';

const router = express.Router();
// ----------------- end configure section

const app = require('./config/app.config');

const db = require('./config/db.config');

const auth_config = require('./config/auth.config');

const Project = require('./Model/Project');
const User = require('./Model/User');


const verifyToken = require('./middleware/verifytoken');

// import ProjectController from "./Controller/ProjectController.js";

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

const port = 6500;
const base_url = 'http://localhost:' + port;

// developer schema
// get routes

router.get('/', function (req, res) {
    return res.json(process.env);
});

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


// register
router.post('/register', async (req, res) => {
    const { name, email, password, type } = req.body;
    // console.log(req.body);
    // return res.json(req.body);

    let user = await User.findOne({ email: email });
    if (user) {
        return res.json(user);
    }
    else {
        const salt_rounds = 10;
        const hash_pass = bcrypt.hashSync(password, salt_rounds);

        let newUser = new User({ name: name, email: email, password: hash_pass, _type: type });
        const result = await newUser.save();
        return res.json(result);
    }

});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            // initiate token
            const token = jwt.sign({ id: user.id }, auth_config.secret, {
                expiresIn: 86400, // 24 hours
            });

            // res.header('Access-Control-Expose-Headers', 'Access-Token, Uid, x-csrf-token');
            return res.header("x-csrf-token", token).status(200).send({
                id: user.id,
                email: user.email,
            });
        }
    }

    return res.json({ "status": false });
});

router.get('/users', verifyToken, async (req, res) => {
    const users = await User.find();
    return res.json(users);
});

router.get('/project/images/:image', (req, res) => {
    return res.sendFile(project_image_path + req.params.image, { root: __dirname });
});

app.use(router);

const { ENV } = process.env;

async function main() {

    if (ENV == 'local') {
        await mongoose.connect("mongodb://127.0.0.1:27017/" + db.database_name);
    }
    else {
        await mongoose.connect("mongodb+srv://" + db.user + ":" + db.password + "@cluster0.nynah.mongodb.net/" + db.database_name + "?retryWrites=true&w=majority");
    }
    // mongoose.connect('mongodb://username:password@host:port/database?options...');
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

app.listen(process.env.PORT || port, () => {
    main().then(console.log('Mongoose Connected')).catch(err => console.log(err));
    console.log('Server stated at ' + base_url);
});
