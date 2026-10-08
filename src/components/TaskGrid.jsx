import React from 'react';
import { TaskCard } from './TaskCard';

export const TaskGrid = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  return (
    <div className="tasks-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};
