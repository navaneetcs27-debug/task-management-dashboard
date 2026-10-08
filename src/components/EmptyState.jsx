import React from 'react';
import { SearchX, Plus, RefreshCw, AlertCircle } from 'lucide-react';

export const EmptyState = ({
  type = 'no-results', // 'no-results' | 'no-tasks' | 'error' | 'loading'
  searchQuery = '',
  onResetFilters,
  onOpenAddModal,
  onRetry
}) => {
  if (type === 'loading') {
    return (
      <div className="empty-state">
        <div className="empty-icon-circle" style={{ animation: 'spin 1.5s linear infinite' }}>
          <RefreshCw size={28} />
        </div>
        <h3 className="empty-title">Loading Tasks...</h3>
        <p className="empty-desc">Fetching and syncing your dashboard tasks.</p>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="empty-state" style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}>
        <div className="empty-icon-circle" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
          <AlertCircle size={28} />
        </div>
        <h3 className="empty-title">Something went wrong</h3>
        <p className="empty-desc">An error occurred while loading or updating tasks.</p>
        {onRetry && (
          <button type="button" className="btn btn-secondary" onClick={onRetry}>
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  if (type === 'no-results') {
    return (
      <div className="empty-state">
        <div className="empty-icon-circle">
          <SearchX size={28} />
        </div>
        <h3 className="empty-title">No tasks found</h3>
        <p className="empty-desc">
          {searchQuery 
            ? `No tasks match your search query "${searchQuery}" with the selected filters.`
            : 'No tasks match the active filters.'}
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          {onResetFilters && (
            <button type="button" className="btn btn-secondary" onClick={onResetFilters}>
              Reset Filters
            </button>
          )}
          {onOpenAddModal && (
            <button type="button" className="btn btn-primary" onClick={onOpenAddModal}>
              <Plus size={16} />
              <span>Create New Task</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // 'no-tasks'
  return (
    <div className="empty-state">
      <div className="empty-icon-circle">
        <Plus size={28} />
      </div>
      <h3 className="empty-title">Your Task List is Empty</h3>
      <p className="empty-desc">Get started by creating your first task to track work effortlessly.</p>
      {onOpenAddModal && (
        <button type="button" className="btn btn-primary" onClick={onOpenAddModal}>
          <Plus size={16} />
          <span>Add Your First Task</span>
        </button>
      )}
    </div>
  );
};
