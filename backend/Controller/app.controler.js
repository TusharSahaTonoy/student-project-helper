
const { Role } = require('../Model');

const databaseInit = async (req, res) => {

    const roles = [
        {
            name: 'admin',
            title: 'Admin'
        },
        {
            name: 'student',
            title: 'Student'
        },
        {
            name: 'dev',
            title: 'Developer'
        }
    ];
    
    Role.insertMany(roles, function (err) {
        if (err) return err.message;
    });
    return res.json('done');
};

module.exports = { databaseInit };