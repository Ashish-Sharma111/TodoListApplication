import React from 'react';
import PropTypes from 'prop-types';

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{task.assignedTo}</td>
      <td>{task.status}</td>
      <td>{new Date(task.dueDate).toLocaleDateString()}</td>
      <td>{task.priority}</td>
      <td>{task.description}</td>
      <td>
        <button
          className="btn btn-warning"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskItem;
