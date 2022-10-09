/** 
 * import express
 * const app = express();
 * app.listen(port, () => {
    console.log('Server stated at '+ base_url);
});
 */

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

import 'dotenv/config';

import Project from "./Model/Project.js";
import User from "./Model/User.js";


import ProjectController from "./Controller/ProjectController.js";


const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"))

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
    destination: "./public/",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single("file");

const port = 6500;
const base_url = 'http://localhost:' + port;


app.listen(port, () => {
    main().then(console.log('Mongoose Connected')).catch(err => console.log(err));
    console.log('Server stated at ' + base_url);
});

/* Projects */

// mongoose



// developer schema


// get routes
app.get('/projects', async (req, res) => {

    const result = await Project.find();
    return res.json(result);
});

// post
app.post('/project/add', upload, async (req, res) => {
    // console.log(req.body);
    // console.log(req);

    if (!req.file) {
        console.log("No file upload");
    } else {

        console.log(req.file.filename)
    }

    const newProject = new Project({
        title: req.body.name,
        price: req.body.price,
        image: req.file.filename || null
    });
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
    return res.json(result);
});

// developoer
// register
app.post('/register', async (req, res) => {
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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return res.json({ status: true });
        }
    }

    return res.json({ "status": false });
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    return res.json(users);
});

