//Module Import

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const cors = require("cors");
const axios = require("axios");

const path = require('path');
const fs = require('fs');
const getIP = require('ipware')().get_ip;

// create server

const server = app.listen(80, function() {
    console.log("Test server started: 80");
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

app.set('views', __dirname + "/design_html");
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

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

const User_model = require('./models/user');
const Rinfo_model = require('./models/rinfo');

// mongo db connect

const mongoose = require('mongoose');

var mongo_db = mongoose.connection;
mongo_db.on('error', console.error);
mongo_db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server: rendercube");
});

mongoose.connect('mongodb://localhost/rendercube', { useNewUrlParser: true });

const router = require('./router')(app, fs, path, multer, time, mongoose, User_model, Rinfo_model, getIP, axios);