import React from 'react';
import { Search, X, LayoutGrid, Kanban, Table } from 'lucide-react';

export const FilterBar = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onResetFilters,
  hasActiveFilters
}) => {
  return (
    <div className="controls-container">
      <div className="search-row">
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear"
              onClick={onClearSearch}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="view-toggle">
          <button
            type="button"
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => onViewModeChange('grid')}
            title="Grid view"
          >
            <LayoutGrid size={14} />
            <span>Cards</span>
          </button>
          <button
            type="button"
            className={viewMode === 'board' ? 'active' : ''}
            onClick={() => onViewModeChange('board')}
            title="Kanban board view"
          >
            <Kanban size={14} />
            <span>Board</span>
          </button>
          <button
            type="button"
            className={viewMode === 'table' ? 'active' : ''}
            onClick={() => onViewModeChange('table')}
            title="Table list view"
          >
            <Table size={14} />
            <span>Table</span>
          </button>
        </div>
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <span className="filter-label">Status:</span>
          {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              type="button"
              className={`pill-btn ${statusFilter === status ? 'active' : ''}`}
              onClick={() => onStatusChange(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-label">Priority:</span>
          {['All', 'Low', 'Medium', 'High'].map((priority) => (
            <button
              key={priority}
              type="button"
              className={`pill-btn ${priorityFilter === priority ? 'active' : ''}`}
              onClick={() => onPriorityChange(priority)}
            >
              {priority}
            </button>
          ))}
        </div>

        <div className="filter-group" style={{ marginLeft: 'auto' }}>
          <span className="filter-label">Sort by:</span>
          <select
            className="select-input"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="title">Title</option>
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              className="reset-btn"
              onClick={onResetFilters}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
