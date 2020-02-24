var mongoose = require('mongoose');
let date = ''+new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate();
let time = ''+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds();

var userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    pw: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    reg_date: {
        type: Number,
        default: date
    },
    reg_time: {
        type: Number,
        default: time
    },
    license: {
        type: String,
        required: true
    },
    cl_id: {
        type: Number,
        unique: true
    },
    rendering: {
        type: Array,
        default: []
    }
});


var user_db = mongoose.model('User', userSchema);

module.exports = user_db;