import React from 'react';
import { Layers, Clock, Loader2, CheckCircle2 } from 'lucide-react';

export const StatsOverview = ({ tasks = [] }) => {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="stats-grid">
      <div className="stat-box total">
        <div>
          <div className="title">Total Tasks</div>
          <div className="number">{total}</div>
        </div>
        <div className="stat-icon">
          <Layers size={20} />
        </div>
      </div>

      <div className="stat-box pending">
        <div>
          <div className="title">Pending</div>
          <div className="number">{pending}</div>
        </div>
        <div className="stat-icon">
          <Clock size={20} />
        </div>
      </div>

      <div className="stat-box in-progress">
        <div>
          <div className="title">In Progress</div>
          <div className="number">{inProgress}</div>
        </div>
        <div className="stat-icon">
          <Loader2 size={20} />
        </div>
      </div>

      <div className="stat-box completed">
        <div>
          <div className="title">Completed</div>
          <div className="number">{completed}</div>
        </div>
        <div className="stat-icon">
          <CheckCircle2 size={20} />
        </div>
      </div>
    </div>
  );
};
