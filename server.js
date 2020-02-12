const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
var getIP = require('ipware')().get_ip;
var path = require('path');
var crypto = require("crypto");

app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var port = 80;
var ip = "localhost";

const server = app.listen(port, ip, function() {
    console.log(`
        --------| Rendercube Test Server - BETA: Starts at ` + port + ` |-----------
                    ----------| Server IP: ` + ip + ` |---------
    `);
});

let time = ''+new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds();

app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    console.log(`connection: ` + ipInfo.clientIp + '   |||||  time: ' + time);
    next();
});

app.use(express.static(__dirname + "/source"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(session({
    key: 'key_rendercubeServer',
    secret: '159357825465rendercube_sercrt_key!%(#%&*@%$^%',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 24000
    }
}));

//mongodb

var reg_model = require('./models/reg_model');

var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log("Mongodb: connected");
})

mongoose.connect('mongodb://175.116.44.231:754', { dbName: 'rendercube_beta'});

//Router
var router = require('./router')(app, fs, path, crypto, reg_model);