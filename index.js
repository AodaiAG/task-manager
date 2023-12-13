const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');


const app = express();


app.use(bodyParser.json());
const dbURI='mongodb+srv://xva:123456789As@cluster.pqrizug.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB using mongoose
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


// Middleware setup
app.use(authMiddleware.verifyToken); // This line is critical to apply the middleware globally



// Serve Swagger UI
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); // or 'js-yaml'
const swaggerDocument = YAML.load('swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Routes
app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
