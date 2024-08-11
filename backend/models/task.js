const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
  assignedTo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Normal', 'High'],
    default: 'Normal',
  },
  comments: {
    type: String,
    default: '',
  },
}, {
  timestamps: true, // Automatically create `createdAt` and `updatedAt` fields
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
