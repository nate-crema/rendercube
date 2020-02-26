// module.exports = function(app, fs, path, multer, time, mongoose, User_model, Rinfo_model, getIP, axios) {

const express = require("express");
const app = express.Router();

const fs = require("fs");
const multer = require("multer");

app.get("/", (req, res) => {
    console.log("hi");
    res.end();
})

module.exports = app;