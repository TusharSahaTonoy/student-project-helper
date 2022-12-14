const express = require("express");
const router = express.Router();

const UserRoutes = require('./user.routes');
const AuthRoutes = require('./auth.routes');
const AppController = require("../Controller/app.controler");

const { ENV } = process.env;

router.get('/', function (req, res) {
    return res.json(ENV);
});

router.get('/project/database-init', AppController.databaseInit);

router.use(AuthRoutes, UserRoutes);
module.exports = router;
