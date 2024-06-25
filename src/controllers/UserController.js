const User = require('../models/schema/user');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      code: 200,
      message: 'Users fetched successfully',
      data:users
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
      message: 'Server error',
      data: null
    });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({
      code: 404,
      message: 'User not found',
      data: null
    });
    res.status(200).json({
      code: 200,
      message: 'User fetched successfully',
      data: user
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Server error',
      data: null
    });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email,password, phone_number, room_number } = req.body;
    const newUser = new User({
      name,
      email,
      password,
      phone_number,
      room_number
    });
    const user = await newUser.save();
    res.status(201).json({
      code: 201,
      message: 'User created successfully',
      data: user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
      message: 'Server error',
      data: null
    });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone_number, room_number } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({
      code: 404,
      message: 'User not found',
      data: null
    });
    user.name = name;
    user.email = email;
    user.phone_number = phone_number;
    user.room_number = room_number;
    await user.save();
    res.status(200).json({
      code: 200,
      message: 'User updated successfully',
      data: user
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Server error',
      data: null
    });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({
      code: 404,
      message: 'User not found',
      data: null
    });
    await user.remove();
    res.status(204).json({
      code: 204,
      message: 'User deleted successfully',
      data: null
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Server error',
      data: null
    });
  }
};
