import React from 'react';

export const EmptyState = ({
  searchQuery,
  onResetFilters,
  onOpenAddModal
}) => {
  return (
    <div className="empty-box">
      <h4>No tasks found</h4>
      <p>
        {searchQuery
          ? `No tasks match "${searchQuery}" with the current filters.`
          : 'No tasks available in this view.'}
      </p>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        {onResetFilters && (
          <button type="button" className="btn btn-secondary" onClick={onResetFilters}>
            Clear Filters
          </button>
        )}
        {onOpenAddModal && (
          <button type="button" className="btn btn-primary" onClick={onOpenAddModal}>
            Add Task
          </button>
        )}
      </div>
    </div>
  );
};
