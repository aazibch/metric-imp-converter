require('dotenv').config();

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});