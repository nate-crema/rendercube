//Module Import

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");

// create server

const ip = process.env.IP || "127.0.0.1";
const port = process.env.PORT || 558;


const server = app.listen(port, ip, function() {
    console.log("Rendercube Backbone server started: http://" + ip + (port == 80 ? "" :  ":" + port));
});


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

// app.use(express.static(__dirname + "/design_html"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors permit

app.use(cors());

// multer use

// app.use(multer({dest:'./uploads/'}).single('form'));
app.use('/uploadZip', express.static('upload'));
    
app.use(session({
    secret: 'secret_rendercube-backbone',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 24000
    }
}));

app.use("/", (req, res, next) => {
    console.log("access: " + req.ip);
    next();
})

app.use("/", require("./router").backbone);