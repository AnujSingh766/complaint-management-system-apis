// controllers/authController.js
const authService = require('../services/authService');

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await authService.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: 'User not found',
        data: null
      });
    }

    // Verify password
    const isMatch = await authService.verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid credentials',
        data: null
      });
    }

    // Generate JWT token
    const token = authService.generateToken(user);

    res.status(200).json({
      code: 200,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          is_admin: user.is_admin,
          
          // Add other fields as needed
        }
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      code: 500,
      message: 'Server error',
      data: null
    });
  }
};
