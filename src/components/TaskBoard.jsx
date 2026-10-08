import React from 'react';
import { TaskCard } from './TaskCard';

export const TaskBoard = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const columns = [
    { title: 'Pending', items: tasks.filter((t) => t.status === 'Pending') },
    { title: 'In Progress', items: tasks.filter((t) => t.status === 'In Progress') },
    { title: 'Completed', items: tasks.filter((t) => t.status === 'Completed') }
  ];

  return (
    <div className="kanban-grid">
      {columns.map((col) => (
        <div key={col.title} className="kanban-col">
          <div className="kanban-header">
            <span>{col.title}</span>
            <span className="kanban-count">{col.items.length}</span>
          </div>

          <div className="kanban-tasks">
            {col.items.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-light)', padding: '24px 0', fontSize: '0.8125rem' }}>
                No {col.title.toLowerCase()} tasks
              </div>
            ) : (
              col.items.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
