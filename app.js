const express = require('express');
const convertRoute = require('./routes/convert');

const app = express();

app.use('/api/convert', convertRoute);

module.exports = app;