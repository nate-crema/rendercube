const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
var getIP = require('ipware')().get_ip;
var alert = require('alert-node');
var multer = require('multer');
var path = require('path');
// var jsdom = require('jsdom');  
// const {JSDOM} = jsdom;  
// const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;  
// global.document = document;  
// global.window = document.defaultView;
// var $ = require('jQuery').window;


app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var port = 432

var server = app.listen(port, function() {
    console.log("=====server_open_process_rendercube-service=====");
    console.log("RenderCube server is running on localhost on port " + port);
    console.log("=====server_open_process_rendercube-service=====");
})

app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    console.log("==========user_connection_info==========");
    console.log(ipInfo.clientIp);
    console.log("==========user_connection_info_end==========");
    // clientIP: ___.___.___.___
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
}))

//Import mongo db model
var User_model = require('./models/user');
var syslog_upload_model = require('./models/syslog_upload');
var syslog_payment_model = require('./models/syslog_payment');


//mongodb connect
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://180.71.29.136:754/rendercube');

//Router
var router = require('./router/router')(app, fs, getIP, User_model, alert, multer, path, syslog_upload_model, syslog_payment_model);