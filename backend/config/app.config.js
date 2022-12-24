const express = require("express");
const cors = require("cors");

const app = express();
const requestLogger = require('../middleware/requestLogger');

app.use(requestLogger);

// static file directory
app.use(express.static("./public"));


// default headers
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000, https://student-project-helper.netlify.app');
    // res.header('Access-Control-Allow-Credentials', 'true');
    // res.header('Accept', 'application/json, text/plain, */*');
    // res.header('Accept-Encoding', 'gzip, deflate, br');
    // res.header('Accept-Language', 'en-US,en;q=0.9');
    // res.header('Connection', 'keep-alive');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// cors
let whitelist = ['https://student-project-helper.netlify.app', 'http://localhost:3000'];
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS' + origin));
        }
    }
};

app.use(cors(corsOptions));

// app.use(cors({
//     origin: 'http://localhost:3000',
//     exposedHeaders: 'x-csrf-token',
// }));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


module.exports = app;
