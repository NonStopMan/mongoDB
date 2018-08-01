const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/borderguru_orders", {
    "auth": { "authSource": "admin" },
    "user": "admin",
    "pass": "admin123",
    useNewUrlParser: true
})
    .then(() => {
        console.log('Mongoooose connected')
    })
    .catch((err) => {
        console.log(err);
    })

let app = express();
app.use(express.json());

routes(app);



const portNumber = 3000;
let server = app.listen(portNumber, () => {
    console.log("the app is listen to the port 3000");
})

