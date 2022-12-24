const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const auth_config = require('../config/auth.config');
const {User} = require('../Model');
const AuthController = require('../Controller/auth.controller');

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

router.post('/login', AuthController.login);

module.exports = router;