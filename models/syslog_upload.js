const mongoose = require('mongoose');
let date = ''+new Date().getFullYear()+(new Date().getMonth()+1)+ new Date().getDate()+ new Date().getHours()+ new Date().getMinutes()+ new Date().getSeconds();
const upload_log_Schema = new mongoose.Schema({
    upload_date: {
        type: String,
        default: date
    },
    upload_ip: {
        type: String,
        required: true
    },
    file_name: {
        type: String,
        required: true
    },
    file_size: {
        type: Number,
        required: true
    },
    User_name: {
        type: String,
        required: true
    },
    upload_success: {
        type: String,
        required: true,
        default: "Can't_Know"
    }
});

var syslog_upload_db = mongoose.model('Upload_File_log', upload_log_Schema);

module.exports = syslog_upload_db;