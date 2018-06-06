// dependencies 
const express = require('express');
const mongo = require('mongodb').MongoClient;
const parser = require('body-parser');
const db = require('./config/db');
// initialize app

const app = express();
const port = 1337;

app.use(parser.urlencoded({
    extended: true
}));


mongo.connect(db.url, (err, database) => {
    if (err) return console.log(err);
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log('We are live on port:' + port);
    });
    
})