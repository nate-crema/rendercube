const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique: false
  },
  sex: {
      type: String,
      required: false,
      unique: false,
      default: undefined
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
      default: "Free_License",
      remain: 5
  },
  email: {
      type: String,
      required: true
  },
  register_date: {
      type: String,
      default: Date.now
  },
  render_log: {
      type: String
  }
});

var user_db = mongoose.model('User', userSchema);

module.exports = user_db;