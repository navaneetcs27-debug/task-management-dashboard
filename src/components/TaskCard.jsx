import React from 'react';
import { 
  Calendar, 
  Clock, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { formatDate, isOverdue, getDaysRemaining } from '../utils/dateUtils';

export const TaskCard = ({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange,
  onQuickCycleStatus 
}) => {
  const overdue = isOverdue(task.dueDate, task.status);
  const remainingText = getDaysRemaining(task.dueDate);

  const getNextStatus = (currentStatus) => {
    if (currentStatus === 'Pending') return 'In Progress';
    if (currentStatus === 'In Progress') return 'Completed';
    return 'Pending';
  };

  const nextStatus = getNextStatus(task.status);

  return (
    <article className="task-card" data-task-id={task.id}>
      <div className={`task-card-accent-bar ${task.priority.toLowerCase()}`} />
      
      <div>
        <div className="task-header-row">
          <h3 className={`task-title ${task.status === 'Completed' ? 'completed' : ''}`}>
            {task.title}
          </h3>
        </div>

        <div className="task-badges-row">
          {/* Status Badge */}
          <span className={`badge badge-status-${task.status.toLowerCase().replace(' ', '-')}`}>
            <span className="badge-dot" />
            {task.status}
          </span>

          {/* Priority Badge */}
          <span className={`badge badge-priority-${task.priority.toLowerCase()}`}>
            <span className="badge-dot" />
            {task.priority} Priority
          </span>

          {/* Overdue Badge */}
          {overdue && (
            <span className="badge badge-overdue" title="Task is past its due date">
              <AlertCircle size={12} /> Overdue
            </span>
          )}
        </div>

        <p className="task-description" style={{ marginTop: '12px' }}>
          {task.description}
        </p>
      </div>

      <div>
        {/* Due Date & Meta */}
        <div className="task-meta-row">
          <div className={`task-due-date ${overdue ? 'is-overdue' : ''}`}>
            <Calendar size={14} />
            <span>{formatDate(task.dueDate)}</span>
          </div>

          {remainingText && task.status !== 'Completed' && (
            <span style={{ fontSize: '0.75rem', color: overdue ? 'var(--priority-high)' : 'var(--text-tertiary)', fontWeight: 600 }}>
              {remainingText}
            </span>
          )}
        </div>

        {/* Task Actions */}
        <div className="task-actions-row">
          {/* Change Status Dropdown / Cycle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <label htmlFor={`status-select-${task.id}`} className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
              Change Status
            </label>
            <select
              id={`status-select-${task.id}`}
              className="status-changer-select"
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              title="Update status"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              type="button"
              className="action-btn"
              onClick={() => onQuickCycleStatus(task.id, nextStatus)}
              title={`Advance to "${nextStatus}"`}
              style={{ padding: '5px 8px' }}
            >
              <ArrowRight size={12} />
              <span>{nextStatus}</span>
            </button>
          </div>

          <div className="action-buttons-group">
            <button
              type="button"
              className="action-btn edit"
              onClick={() => onEdit(task)}
              title="Edit Task"
              id={`edit-task-btn-${task.id}`}
            >
              <Edit3 size={13} />
              <span>Edit</span>
            </button>

            <button
              type="button"
              className="action-btn delete"
              onClick={() => onDelete(task.id)}
              title="Delete Task"
              id={`delete-task-btn-${task.id}`}
            >
              <Trash2 size={13} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
