import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Layers, 
  Loader2 
} from 'lucide-react';

export const StatsOverview = ({ tasks = [] }) => {
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'Pending').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="stats-section" aria-label="Dashboard Statistics">
      <div className="stats-container">
        {/* Total Tasks */}
        <div className="stat-card total">
          <div className="stat-info">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-value" id="stat-total-tasks">{total}</span>
          </div>
          <div className="stat-icon-wrapper">
            <Layers size={24} />
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="stat-card pending">
          <div className="stat-info">
            <span className="stat-label">Pending</span>
            <span className="stat-value" id="stat-pending-tasks">{pending}</span>
          </div>
          <div className="stat-icon-wrapper">
            <Clock size={24} />
          </div>
        </div>

        {/* In Progress Tasks */}
        <div className="stat-card in-progress">
          <div className="stat-info">
            <span className="stat-label">In Progress</span>
            <span className="stat-value" id="stat-inprogress-tasks">{inProgress}</span>
          </div>
          <div className="stat-icon-wrapper">
            <Loader2 size={24} />
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="stat-card completed">
          <div className="stat-info">
            <span className="stat-label">Completed</span>
            <span className="stat-value" id="stat-completed-tasks">{completed}</span>
          </div>
          <div className="stat-icon-wrapper">
            <CheckCircle2 size={24} />
          </div>
        </div>
      </div>

      {/* Completion Rate Progress Banner */}
      <div className="completion-banner" style={{ marginTop: '14px' }}>
        <div className="completion-header">
          <span>Overall Project Progress</span>
          <span style={{ color: 'var(--status-completed)' }}>{completionPercentage}% Done</span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={completionPercentage} aria-valuemin="0" aria-valuemax="100">
          <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
        </div>
      </div>
    </section>
  );
};
