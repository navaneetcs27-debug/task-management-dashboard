import React from 'react';
import { formatDate, isOverdue } from '../utils/dateUtils';
import { Edit3, Trash2, Calendar, AlertCircle } from 'lucide-react';

export const TaskTable = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  return (
    <div className="table-wrapper" id="task-table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th style={{ width: '28%' }}>Task Title & Description</th>
            <th style={{ width: '15%' }}>Status</th>
            <th style={{ width: '15%' }}>Priority</th>
            <th style={{ width: '20%' }}>Due Date</th>
            <th style={{ width: '22%', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const overdue = isOverdue(task.dueDate, task.status);

            return (
              <tr key={task.id}>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }} className={task.status === 'Completed' ? 'completed' : ''}>
                    {task.title}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {task.description}
                  </div>
                </td>

                <td>
                  <select
                    className="status-changer-select"
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                    title="Change status"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>

                <td>
                  <span className={`badge badge-priority-${task.priority.toLowerCase()}`}>
                    <span className="badge-dot" />
                    {task.priority}
                  </span>
                </td>

                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem' }} className={overdue ? 'is-overdue' : ''}>
                    <Calendar size={13} />
                    <span>{formatDate(task.dueDate)}</span>
                    {overdue && (
                      <span className="badge badge-overdue" style={{ marginLeft: '4px' }}>
                        Overdue
                      </span>
                    )}
                  </div>
                </td>

                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    <button
                      type="button"
                      className="action-btn edit"
                      onClick={() => onEdit(task)}
                      title="Edit"
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className="action-btn delete"
                      onClick={() => onDelete(task.id)}
                      title="Delete"
                    >
                      <Trash2 size={13} />
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
