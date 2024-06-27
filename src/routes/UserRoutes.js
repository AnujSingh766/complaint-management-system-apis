// routes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all users
router.get('', authMiddleware, userController.getAllUsers);

// Get user by ID
router.get('/:id', authMiddleware, userController.getUserById);

// Create a new user
router.post('', userController.createUser);

// Update a user
router.put('/:id', authMiddleware, userController.updateUser);

// Delete a user
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
