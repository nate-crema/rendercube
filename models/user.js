const mongoose = require('mongoose');
let date = ''+new Date().getFullYear()+(new Date().getMonth()+1)+ new Date().getDate()+ new Date().getHours()+ new Date().getMinutes()+ new Date().getSeconds();
const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique: false
  },
  id: {
      type: String,
      required: true,
      unique: true
  },
  pw: {
      type: String,
      required: true,
      unique: false
  },
  license: {
      type: String,
      required: true,
      unique: false,
      default: undefined
  },
  render_complete: {
    type: Number,
    required: true,
    unique: false,
    default: 0
  },
  render_err: {
    type: Number,
    required: true,
    unique: false,
    default: 0
  },
  render_remain: {
    type: Number,
    required: true,
    unique: false,
    default: 0
  },
  email: {
      type: String,
      required: true
  },
  register_date: {
      type: String,
      default: date
  },
  render_log: {
      type: String
  },
  render_time_license: {
      type: Number,
      required: true,
      default: 5
  }
});

var user_db = mongoose.model('User', userSchema);

module.exports = user_db;