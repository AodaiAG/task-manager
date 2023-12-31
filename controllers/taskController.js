const Task = require('../models/taskModel');
const jwt = require('jsonwebtoken');

// Manages operations related to tasks, such as creating, updating, deleting, or fetching tasks.
// Get all tasks
//localhost:300/tasks : GET
async function getAllTasks(req, res) 
{
  try
   {
    // Get the username from the JWT token
    const issuedBy = getIssuedByFromRequest(req);
    // Fetch tasks associated with the current user's username
    const tasks = await Task.find({ issuedBy }); // Filter tasks by the 'issuedBy' field
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}


// Create a new task
//localhost:300/tasks/create_task : POST
async function createTask(req, res) 
{
  try {

    const { title, description, priority } = req.body; // Assuming title, description, priority are sent in the request body
    const issuedBy = getIssuedByFromRequest(req);

    // Create a new task associated with the username
    const newTask = new Task({ title, description, priority, issuedBy });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}


// Update a task by ID :: //localhost:300/tasks/<taskId> : PUT
async function updateTask(req, res) 
{
  try 
  {
    const isOwner = await verifyOwnership(req, taskId);
    if (!isOwner) {
      return res.status(403).json({ message: 'You do not have permission to update this task' });
    }

    const taskId = req.params.taskId; // Get the task ID from the request parameters
    const { title, description, priority} = req.body; // Assuming title, description, priority are sent in the request body

    // Find the task by ID and update its properties
    const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, priority }, { new: true });

    if (!updatedTask)
     {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(updatedTask);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}


// Delete a task by ID : localhost:300/tasks/<taskId> : DELETE
async function deleteTask(req, res) 
{
  try 
  {
    const isOwner = await verifyOwnership(req, taskId);
    if (!isOwner) {
      return res.status(403).json({ message: 'You do not have permission to update this task' });
    }
    const taskId = req.params.taskId; // Get the task ID from the request parameters
    // Find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) 
    {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(deletedTask);

  }
   catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
 
  
}

function getIssuedByFromRequest(req) 
{
  try {
    const token = req.cookies.authorization; // Get the token from cookies
    const decoded = jwt.verify(token, 'connectX'); 
    return decoded.username; // Return the 'issuedBy' value
  } catch (error) {
    console.error(error);
    return null; // Return null if there's an error or token is invalid
  }
}

async function verifyOwnership(req, taskId)
 {
  try {
    // Get the task by ID from the database
    const task = await Task.findById(taskId);
    const issuedBy = task.issuedBy; // Get the username who issued the task
    const username = getIssuedByFromRequest(req); // Get the username from the request

    if (issuedBy !== username) 
    {
      throw new Error('You do not have permission to update this task');
    }

    return true; // User is the owner, grant permission
  } catch (error) {
    console.error(error);
    return false; // Permission denied or error occurred
  }
}


module.exports = { getAllTasks, createTask, updateTask, deleteTask };
