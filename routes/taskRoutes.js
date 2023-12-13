const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
// Contains route definitions that map HTTP methods and endpoints to specific controller functions.
//taskRoutes.js: Defines routes related to tasks, such as creating, updating, deleting, or fetching tasks.

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
