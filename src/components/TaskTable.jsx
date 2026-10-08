import React from 'react';
import { formatDate, isOverdue } from '../utils/dateUtils';
import { Edit2, Trash2 } from 'lucide-react';

export const TaskTable = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: '35%' }}>Task</th>
            <th style={{ width: '15%' }}>Status</th>
            <th style={{ width: '15%' }}>Priority</th>
            <th style={{ width: '15%' }}>Due Date</th>
            <th style={{ width: '20%', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const overdue = isOverdue(task.dueDate, task.status);

            return (
              <tr key={task.id}>
                <td>
                  <div style={{ fontWeight: 600 }} className={task.status === 'Completed' ? 'task-title completed' : ''}>
                    {task.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {task.description}
                  </div>
                </td>
                <td>
                  <select
                    className="status-select"
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>
                  <span className={`badge priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </td>
                <td>
                  <span style={{ color: overdue ? '#dc2626' : 'inherit' }}>
                    {formatDate(task.dueDate)}
                  </span>
                  {overdue && (
                    <span className="badge overdue" style={{ marginLeft: '4px' }}>Overdue</span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="action-btn-small"
                      onClick={() => onEdit(task)}
                    >
                      <Edit2 size={12} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className="action-btn-small delete"
                      onClick={() => onDelete(task.id)}
                    >
                      <Trash2 size={12} />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
