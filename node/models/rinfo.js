var mongoose = require('mongoose');
let date = ''+new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate();
let time = ''+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds();

var RinfoSchema = new mongoose.Schema({
    reg_date: {
        type: Number,
        default: date
    },
    reg_time: {
        type: Number,
        default: time
    },
    rendering_id: {
        type: String,
        unique: true,
        required: true
    },
    req_id: {
        type: String,
        unique: false,
        required: true
    },
    filename: {
        type: String,
        unique: false
    },
    status: {
        type: String,
        unique: false,
        default: "uploaded"
    },
    paid: {
        type: Boolean,
        default: false
    },
    paid_type: {
        type: String 
    },
    rendering_info: {
        type: JSON,
        default: {},
        required: false
    }
});


var Rinfo_db = mongoose.model('Rinfo', RinfoSchema);

module.exports = Rinfo_db;