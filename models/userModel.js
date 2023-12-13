// Contains the schema for users, defining the structure of user-related data in the database.

const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema
({
  username: 
  {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
