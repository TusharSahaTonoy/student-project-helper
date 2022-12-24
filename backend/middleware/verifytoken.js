const jwt = require("jsonwebtoken");

const config = require('../config/auth.config');

const verifyToken = (req, res, next) => {
    let token = req.header('X-Csrf-Token');
    // console.log(token);
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
        // console.log(decoded);
        next();
    });
};

module.exports = verifyToken;