//  Defines the schema for tasks, specifying the structure of task-related data stored in the database.

const mongoose = require('mongoose');

// Define the Task Schema
const taskSchema = new mongoose.Schema
({
  title:
   {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  createdAt: 
  {
    type: Date,
    default: Date.now,
  },
});

// Create the Task model using the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
