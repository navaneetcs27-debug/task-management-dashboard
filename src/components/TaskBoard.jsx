import React from 'react';
import { TaskCard } from './TaskCard';
import { Clock, Loader2, CheckCircle2 } from 'lucide-react';

export const TaskBoard = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  onQuickCycleStatus
}) => {
  const columns = [
    {
      id: 'Pending',
      title: 'Pending',
      icon: <Clock size={16} color="var(--status-pending)" />,
      items: tasks.filter((t) => t.status === 'Pending')
    },
    {
      id: 'In Progress',
      title: 'In Progress',
      icon: <Loader2 size={16} color="var(--status-inprogress)" />,
      items: tasks.filter((t) => t.status === 'In Progress')
    },
    {
      id: 'Completed',
      title: 'Completed',
      icon: <CheckCircle2 size={16} color="var(--status-completed)" />,
      items: tasks.filter((t) => t.status === 'Completed')
    }
  ];

  return (
    <div className="kanban-board" id="kanban-board-container">
      {columns.map((col) => (
        <div key={col.id} className="kanban-column" id={`kanban-col-${col.id.toLowerCase().replace(' ', '-')}`}>
          <div className="kanban-column-header">
            <div className="kanban-title-wrap">
              {col.icon}
              <span>{col.title}</span>
            </div>
            <span className="kanban-count">{col.items.length}</span>
          </div>

          <div className="kanban-task-list">
            {col.items.length === 0 ? (
              <div style={{ padding: '30px 10px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8125rem' }}>
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
                  onQuickCycleStatus={onQuickCycleStatus}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
