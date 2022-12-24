
'use strict';

require('dotenv').config();


const app = require('./config/app.config');

const {init} = require('./config/db.config');

const routes = require('./routes');
app.use(routes);

const port = 6500;
const base_url = 'http://localhost:' + port;
app.listen(process.env.PORT || port, () => {
    init().then(console.log('Mongoose Connected')).catch(err => console.log(err));
    console.log('Server stated at ' + base_url);
});
