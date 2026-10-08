import React from 'react';
import { Calendar, Edit2, Trash2 } from 'lucide-react';
import { formatDate, isOverdue } from '../utils/dateUtils';

export const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className="task-card">
      <div>
        <div className="task-badges">
          <span className={`badge ${task.status.toLowerCase().replace(' ', '-')}`}>
            <span className="badge-dot" />
            {task.status}
          </span>
          <span className={`badge priority-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          {overdue && (
            <span className="badge overdue">Overdue</span>
          )}
        </div>

        <h3 className={`task-title ${task.status === 'Completed' ? 'completed' : ''}`} style={{ marginTop: '10px' }}>
          {task.title}
        </h3>

        <p className="task-desc">
          {task.description}
        </p>
      </div>

      <div className="task-footer">
        <div className="task-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={13} />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        </div>

        <div className="task-actions">
          <select
            className="status-select"
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            title="Change status"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="action-btns">
            <button
              type="button"
              className="action-btn-small"
              onClick={() => onEdit(task)}
              title="Edit"
            >
              <Edit2 size={12} />
              <span>Edit</span>
            </button>
            <button
              type="button"
              className="action-btn-small delete"
              onClick={() => onDelete(task.id)}
              title="Delete"
            >
              <Trash2 size={12} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
