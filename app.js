// We execute the "config" method of "dotenv".
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// We create the server.
const app = express();

// Temporary storage for shared links
let links = [];
app.use(cors());
app.use(bodyParser.json());

// We import the routes. Remember that it is not necessary to indicate the "index.js" file.
const routes = require('./src/routes');

// Middleware that shows the console information about the incoming request.
app.use(morgan('dev'));

// Middleware that tells express where the routes are.
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
