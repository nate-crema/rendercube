const mongoose = require('mongoose');
let date = ''+new Date().getFullYear()+(new Date().getMonth()+1)+ new Date().getDate()+ new Date().getHours()+ new Date().getMinutes()+ new Date().getSeconds();
const preRegis = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      unique: true
  },
  pw: {
      type: String,
      required: true,
      unique: false
  },
  date: {
      type: String,
      default: date
  }
});

var reg_model = mongoose.model('pre_regs', preRegis);

module.exports = reg_model;