const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
var getIP = require('ipware')().get_ip;
var multer = require('multer');
var path = require('path');

app.set('views', path.join(__dirname, '/view'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var port = 80;
var ip = "127.0.0.1";
var ip_outward = "222.117.33.139";

console.log(process.env.IP);
var ip = process.env.IP || ip_outward;

const server = app.listen(port, ip, function() {
    console.log(`
        --------Rendercube Test Server: Starts at ` + port + `-----------
        ----------| Server IP: ` + ip + ` |---------
    `);
});

let time = ''+new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds();

app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    console.log(`connection: ` + ipInfo.clientIp + '   |||||  time: ' + time);
    next();
});

app.use(express.static('design_source'));
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


//Import mongo db model
var User_model = require('./models/user');
var syslog_upload_model = require('./models/syslog_upload');
var syslog_payment_model = require('./models/syslog_payment');
var login_record_model = require('./models/login_record');


//mongodb connect
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

// mongoose.connect('mongodb://rendercube_service_server:English4576*@180.71.29.136:754/admin', {
//     dbName: 'Rendercube'
// });

mongoose.connect('mongodb://localhost', { dbName: 'Rendercube'});

// mongoose.connect('mongodb://rendercube.kr:944');


//Router
var router = require('./router')(app, fs, getIP, User_model, multer, path, syslog_upload_model, syslog_payment_model, login_record_model);