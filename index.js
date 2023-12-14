const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('swagger.yaml');
const cookieParser = require('cookie-parser');
mongoose.set('strictQuery', true);
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

// Connect to MongoDB using mongoose
const dbURI='mongodb+srv://xva:123456789As@cluster.pqrizug.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware setup
app.use(authMiddleware.verifyToken); 

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Routes
app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);

// Start server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
