/** 
 * import express
 * const app = express();
 * app.listen(port, () => {
    console.log('Server stated at '+ base_url);
});
 */
'use strict';

const express = require("express");
const jwt = require("jsonwebtoken");
const cookieSession = require("cookie-session");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

// import ServerlessHttp from "serverless-http";
require('dotenv').config();
const Project = require('./Model/Project');
const User = require('./Model/User');
const project_image_path = './public/image/projects/';

// import ProjectController from "./Controller/ProjectController.js";


const app = express();
const router = express.Router();
app.use(express.static("./public"));

app.use(cors({
    origin: 'http://localhost:3000',
    exposedHeaders: 'Authorization',
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Accept', 'application/json, text/plain, */*');
    res.header('Accept-Encoding', 'gzip, deflate, br');
    res.header('Accept-Language', 'en-US,en;q=0.9');
    res.header('Connection', 'keep-alive');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "bezkoder-session",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true
    })
);


const { Schema, Model } = mongoose;

const { DB_NAME, ENV, DB_USER, DB_PASS } = process.env;

// request logger
const requestLogger = (req, res, next) => {
    let current_datetime = new Date();
    let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    let log = `[${formatted_date}] ${method}:${url} ${status}`;
    console.log(log);
    next();
};
app.use(requestLogger);

const config = {
    secret: "bezkoder-secret-key"
};
const verifyToken = (req, res, next) => {
    let token = req.header('X-Csrf-Token');
    console.log(token);
    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        console.log(decoded);
        next();
    });
};

async function main() {

    if (ENV == 'local') {
        await mongoose.connect("mongodb://127.0.0.1:27017/" + DB_NAME);
    }
    else {
        await mongoose.connect("mongodb+srv://" + DB_USER + ":" + DB_PASS + "@cluster0.nynah.mongodb.net/" + DB_NAME + "?retryWrites=true&w=majority");
    }
    // mongoose.connect('mongodb://username:password@host:port/database?options...');
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

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

    /* const projects = [
        {
            "title": "Project 1",
            "price": "10$"
        },
        {
            "title": "Project 2",
            "price": "100$"
        },
        {
            "title": "Project 3",
            "price": "14$"
        },
        {
            "title": "Project 4",
            "price": "145$"
        }
    ] */

    // let result = 'OKAY';

    // console.log(result);
    res.json(result);
});

// developoer
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
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });

            res.header('Access-Control-Expose-Headers', 'Access-Token, Uid, x-csrf-token');
            return res.header("x-csrf-token", token).status(200).send({
                id: user.id,
                email: user.email,
            });
        }
    }

    return res.json({ "status": false });
});

router.post('/logout', async (req, res) => {
    try {
        req.session = null;
        return res.status(200).json({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
});

router.get('/users', verifyToken, async (req, res) => {
    const users = await User.find();
    return res.json(users);
});

router.get('/project/images/:image', (req, res) => {
    return res.sendFile(project_image_path + req.params.image, { root: __dirname });
});

app.use(router);

console.log(ENV);
app.listen(process.env.PORT || port, () => {
    main().then(console.log('Mongoose Connected')).catch(err => console.log(err));
    console.log('Server stated at ' + base_url);
});
