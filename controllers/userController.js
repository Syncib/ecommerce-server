const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Secret for JWT
const secret = "mingyapapale";

// Helper function to create a token
const createToken = (_id) => {
  return jwt.sign({ _id }, secret, { expiresIn: "1d" });
};

// Signup Controller
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists, please login" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate a token
    const token = createToken(newUser._id);

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token,
    });
  } catch (error) {
    // Handle server errors
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Email does not exist, please register" });
    }

    // Validate the password
    const isValidPass = await bcrypt.compare(password, existingUser.password);
    if (!isValidPass) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate a token
    const token = createToken(existingUser._id);

    // Send response
    return res.status(200).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      token,
    });
  } catch (error) {
    // Handle server errors
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Export controllers
module.exports = { signup, login };
