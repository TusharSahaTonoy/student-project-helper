const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const auth_config = require('../config/auth.config');
const { User } = require('../Model');


const login = async (req, res) => {
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
};

module.exports = {login};