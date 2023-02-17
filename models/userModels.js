const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
  },
  password: {
    type: String,
    required: true, 
  },
  roles: {
    type: [String],
    required: ['user', 'admin', 'super_admin'],
    default: ['user'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports =  User;
