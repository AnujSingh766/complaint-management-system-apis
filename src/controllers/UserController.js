
const userService = require('../services/userService');
const { UserListResponse } = require('../utils/userlistResponse');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const response = UserListResponse(users); // Transform the users data

    res.status(200).json({ code: 200, message: 'Users fetched successfully', data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, message: 'Server error', data: null });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
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
    const reqData = { name, email, password, phone_number, room_number, is_admin } = req.body;
    const user = await userService.createUser(reqData);
    
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
    const updateData = { name, email, phone_number, room_number } = req.body;
    const user = await userService.updateUser(req.params.id, updateData);
    if (!user) return res.status(404).json({
      code: 404,
      message: 'User not found',
      data: null
    });
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
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: 'User not found',
        data: null
      });
    }
    res.status(204).json({
      code: 204,
      message: 'User deleted successfully',
      data: null
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
