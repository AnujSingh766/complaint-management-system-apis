// index.js

const express = require('express');
const app = express();
const cors = require('cors'); // Import cors

const connectDatabase = require('./src/models/database')
const adminAuthMiddleware = require('./src/middleware/adminAuthMiddleware');

const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const roomRoutes = require('./src/routes/roomRoutes');

connectDatabase();
app.use(express.json()); // For parsing application/json

// Use CORS middleware
app.use(cors());

// Mount auth routes
app.use('/api/auth', authRoutes);
app.use('/api/user', adminAuthMiddleware, userRoutes);
app.use('/api/room', adminAuthMiddleware, roomRoutes)

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
