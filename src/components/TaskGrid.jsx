import React from 'react';
import { TaskCard } from './TaskCard';

export const TaskGrid = ({ 
  tasks, 
  onEdit, 
  onDelete, 
  onStatusChange,
  onQuickCycleStatus 
}) => {
  return (
    <div className="task-grid" id="task-grid-container">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onQuickCycleStatus={onQuickCycleStatus}
        />
      ))}
    </div>
  );
};
