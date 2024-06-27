// index.js

const express = require('express');
const app = express();
const userRoutes = require('./src/routes/UserRoutes');
const authRoutes = require('./src/routes/authRoutes');
const connectDatabase = require('./src/models/database')
const cors = require('cors'); // Import cors

connectDatabase();
app.use(express.json()); // For parsing application/json

// Use CORS middleware
app.use(cors());

// Mount auth routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
