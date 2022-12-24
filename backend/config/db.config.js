const mongoose = require("mongoose");

const { DB_NAME, ENV, DB_USER, DB_PASS } = process.env;

const init = async function() {

    if (ENV == 'local') {
        await mongoose.connect("mongodb://127.0.0.1:27017/" + DB_NAME);
    }
    else {
        await mongoose.connect("mongodb+srv://" + DB_USER + ":" + DB_PASS + "@cluster0.nynah.mongodb.net/" + DB_NAME + "?retryWrites=true&w=majority");
    }
    // mongoose.connect('mongodb://username:password@host:port/database?options...');
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}


module.exports = {
    'database_name': DB_NAME,
    'user': DB_USER,
    'password': DB_PASS,
    'init': init
}