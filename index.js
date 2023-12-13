const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB using mongoose
mongoose.connect('mongodb://localhost:27017/taskDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware setup
app.use(authMiddleware.verifyToken); // This line is critical to apply the middleware globally

// Routes
app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
