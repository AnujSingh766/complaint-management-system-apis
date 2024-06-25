// index.js

const express = require('express');
const app = express();
const userRoutes = require('./src/routes/UserRoutes');
const authRoutes = require('./src/routes/authRoutes');
const connectDatabase = require('./src/models/database')
const authMiddleware = require('./src/middleware/authMiddleware');

connectDatabase();
app.use(express.json()); // For parsing application/json

// Mount auth routes
app.use('/api/auth', authRoutes);
app.use('/api/user', authMiddleware, userRoutes);

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
