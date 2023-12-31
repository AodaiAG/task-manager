const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Handles user-related operations like user registration, login, etc.

// Register a new user : //localhost:300/user/register POST
async function register(req, res) 
{
  try
   {
    const { username, password } = req.body; // Assuming username and password are sent in the request body

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) 
    {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    
    // Return token and user data
    
    res.status(201).json('Registration completed successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Login user and generate token : localhost:300/user/login POST
async function login(req, res) 
{
  try 
  {
    const { username, password } = req.body; // Assuming username and password are sent in the request body

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user)
    {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isPasswordValid = user.password === password; // Implement proper password hashing for security

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, 'connectX');

    // Return token and user data
    res.cookie('authorization', token);
    res.status(200).json('Welcome '+ username);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = { register, login };
