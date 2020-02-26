const express = require('express');
const convertRoute = require('./routes/convert');

const app = express();

app.use('/api/convert', convertRoute);
app.all('*', (req, res) => {
    res.status(404).send('Route not found.')
});

module.exports = app;