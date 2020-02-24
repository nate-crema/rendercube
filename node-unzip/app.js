//Module Import

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const cors = require("cors");
const axios = require("axios");
const AdmZip = require('adm-zip');
const iconv = require('iconv-lite');
const http = require('http');

const path = require('path');
const fs = require('fs');
const getIP = require('ipware')().get_ip;

// create server

const server =  http.createServer(app);
const io = require('socket.io')(server);

server.listen(225, function() {
    console.log("Rendercube UNZIP server started: 225");
})


// time definition

let month = (new Date().getMonth()+1);
let date = new Date().getDate();

if (month < 10) {
    month = '' + 0 + (new Date().getMonth()+1);
}

if (date < 10) {
    date = '' + 0 + new Date().getDate;
}

let time = ''+new Date().getFullYear()+month+date+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds();

// middleware definition

// app.set('views', __dirname + "/design_html");
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + "/design_html"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors permit

app.use(cors());

// multer use

// app.use(multer({dest:'./uploads/'}).single('form'));
app.use('/uploadZip', express.static('upload'));
    
app.use(session({
    key: 'key_muring',
    secret: 'secret_key_sedghfyghnygt239459$%$Hsuefhhsefiicvbbesfkkdfsf',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 24000
    }
}));

const router = require('./router')(io, app, fs, path, multer, time, getIP, axios, AdmZip, iconv);