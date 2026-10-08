import React from 'react';
import { 
  CheckSquare, 
  Plus, 
  Sun, 
  Moon, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const Header = ({ 
  theme, 
  onToggleTheme, 
  onOpenAddModal, 
  onResetData 
}) => {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand-section">
          <div className="brand-logo-badge" title="TaskFlow Dashboard">
            <CheckSquare size={22} strokeWidth={2.5} />
          </div>
          <div className="brand-info">
            <h1>TaskFlow <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', background: 'var(--brand-primary-light)', color: 'var(--brand-primary)' }}>Pro</span></h1>
            <p>Practical Task Management Dashboard</p>
          </div>
        </div>

        <div className="header-actions">
          <button 
            type="button"
            className="btn-icon" 
            onClick={onResetData}
            title="Reset to sample data"
            aria-label="Reset to default data"
          >
            <RotateCcw size={18} />
          </button>

          <button 
            type="button"
            className="btn-icon" 
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle light or dark theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            type="button"
            className="btn btn-primary"
            onClick={onOpenAddModal}
            id="add-task-btn"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};
