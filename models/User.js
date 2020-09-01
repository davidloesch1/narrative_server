const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    default: null
  },
  facebookId: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: null
  },
  password: {
    type: String,
    default: null
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});


module.exports = mongoose.model('User', UserSchema, 'User')