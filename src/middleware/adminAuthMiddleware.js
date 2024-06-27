const jwt = require('jsonwebtoken');
const User = require('../models/schema/user');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: 'Authorization token is required',
      data: null
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: 'User not found',
        data: null
      });
    }else{
      if(!user.is_admin)
      return res.status(403).json({
        code: 403,
        message: 'User have not permission.',
        data: null
      });
    }

    req.user = user; // Attach user object to request
    next();

  } catch (err) {
    console.error('JWT verification error:', err);
    return res.status(401).json({
      code: 401,
      message: 'Invalid token',
      data: null
    });
  }
};

module.exports = authMiddleware;
