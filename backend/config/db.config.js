
const { DB_NAME, ENV, DB_USER, DB_PASS } = process.env;


module.exports = {
    'database_name': DB_NAME,
    'user': DB_USER,
    'password': DB_PASS
}