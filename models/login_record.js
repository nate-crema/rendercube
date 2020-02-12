const mongoose = require('mongoose');
let date =  ''+new Date().getFullYear() + '.' +(new Date().getMonth()+1) + '.' + new Date().getDate() + '.' + new Date().getHours() + '.' + new Date().getMinutes() + '.' + new Date().getSeconds();
const login_info_Schema = new mongoose.Schema({
  date: {
      type: Date,
      required: true,
      default: date
  },
  login_email: {
      type: String,
      required: true
  },
  login_ip: {
      type: String,
      required: true
  },
  success: {
      type: String,
      required: true
  }
});

var login_record_db = mongoose.model('login_info', login_info_Schema);

module.exports = login_record_db;