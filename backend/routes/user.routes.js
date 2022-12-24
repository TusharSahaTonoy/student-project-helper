const express = require("express");
const router = express.Router();

const verifyToken = require('../middleware/verifytoken');
const {User} = require('../Model');

router.get('/users', verifyToken, async (req, res) => {
    const users = await User.find();
    return res.json(users);
});

module.exports = router;