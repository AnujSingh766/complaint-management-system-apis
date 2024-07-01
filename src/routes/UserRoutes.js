// routes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { createUserValidate } = require('../validators/userValidator');

// Get all users
router.get('', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Create a new user
router.post('', createUserValidate, userController.createUser);

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);


module.exports = router;
