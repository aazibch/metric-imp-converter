process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION');
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    }); 
});