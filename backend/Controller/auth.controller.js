const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const auth_config = require('../config/auth.config');
const { User, Role } = require('../Model');


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

            let role = await Role.findById(user.role_id).exec();
            // res.header('Access-Control-Expose-Headers', 'Access-Token, Uid, x-csrf-token');
            return res.header("x-csrf-token", token).status(200).send({
                id: user.id,
                email: user.email,
                role_name: role.name
            });
        }
    }

    return res.json({ "status": false });
};

const register = async (req, res) => {
    const { name, email, password, type } = req.body;
    // console.log(req.body);
    // return res.json(req.body);

    let user = await User.findOne({ email: email }).exec();
    if (user) {
        return res.json({ status: false, code: 'user_exist', data: { user: user } });
    }
    else {
        const salt_rounds = 10;
        const hash_pass = bcrypt.hashSync(password, salt_rounds);

        let role = await Role.findOne({name: type}).exec();
        if (! role) {
            return res.json({ status: false, code: 'invalid_role', data: { } });
        }

        let newUser = new User({ name: name, email: email, password: hash_pass, role_id: role._id});
        const result = await newUser.save();
        return res.json({ status: true, code: 'insert_success', data: {result: result} });
    }
};

module.exports = { login, register };