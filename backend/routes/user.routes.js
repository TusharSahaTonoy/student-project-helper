const express = require("express");
const router = express.Router();

const verifyToken = require('../middleware/verifytoken');

const UserController = require('../Controller/user.controller');

router.get('/users', verifyToken, UserController.getUsers);

module.exports = router;