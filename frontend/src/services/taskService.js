import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;
 // Base URL for the API
 console.log('API URL:', process.env.REACT_APP_API_URL);
const taskService = {
  // Fetch all tasks from the server
  getTasks: async () => {
    try {
      const response = await axios.get(API_URL);
      console.log('API URL:', process.env.REACT_APP_API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update an existing task by ID
  updateTask: async (taskId, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete a task by ID
  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(`${API_URL}/${taskId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },
};

export default taskService;
