const mongoose = require('mongoose');
let date =  ''+new Date().getFullYear() + '.' +(new Date().getMonth()+1) + '.' + new Date().getDate() + '.' + new Date().getHours() + '.' + new Date().getMinutes() + '.' + new Date().getSeconds();
const payment_log_Schema = new mongoose.Schema({
    payment_req_date: {
        type: String,
        default: date
    },
    req_ip: {
        type: String,
        required: true
    },
    payment_req_user_name: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    payment_success: {
        type: String,
        required: true
    }
});

var syslog_payment_db = mongoose.model('Payment_log', payment_log_Schema);

module.exports = syslog_payment_db;