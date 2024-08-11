const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

// Route to get all tasks
router.get('api/tasks', getTasks);

// Route to create a new task
router.post('/api/tasks', createTask);

// Route to update a task by ID
router.put('api/tasks/:id', updateTask);

// Route to delete a task by ID
router.delete('api/tasks/:id', deleteTask);

module.exports = router;
