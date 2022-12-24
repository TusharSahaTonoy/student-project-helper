
const { User } = require('../Model');

const getUsers = async (req, res) => {
    const users = await User.find();
    return res.json(users);
};

module.exports = { getUsers };