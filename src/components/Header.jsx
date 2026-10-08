import React from 'react';
import { CheckSquare, Plus, Sun, Moon, RotateCcw } from 'lucide-react';

export const Header = ({
  theme,
  onToggleTheme,
  onOpenAddModal,
  onResetData
}) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <div className="brand-icon">
            <CheckSquare size={18} />
          </div>
          <div>
            <h1 className="brand-title">Task Dashboard</h1>
            <p className="brand-subtitle">ReactJS Technical Assessment</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="btn-icon"
            onClick={onResetData}
            title="Reset to default mock data"
          >
            <RotateCcw size={16} />
          </button>

          <button
            type="button"
            className="btn-icon"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenAddModal}
            id="add-task-btn"
          >
            <Plus size={16} />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};
