import React from 'react';
import { 
  Search, 
  X, 
  LayoutGrid, 
  Kanban, 
  Table, 
  ArrowUpDown, 
  SlidersHorizontal 
} from 'lucide-react';

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
  sortOrder,
  onToggleSortOrder,
  viewMode,
  onViewModeChange,
  onResetFilters,
  hasActiveFilters,
  resultCount
}) => {
  return (
    <div className="controls-card">
      {/* Top Row: Search Input & View Switcher */}
      <div className="controls-row-top">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            id="task-search-input"
            type="text"
            className="search-input"
            placeholder="Search tasks by title or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={onClearSearch}
              title="Clear search"
              aria-label="Clear search input"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* View Mode Switcher */}
        <div className="view-switcher-group" role="group" aria-label="View switch">
          <button
            type="button"
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Grid View"
            id="view-grid-btn"
          >
            <LayoutGrid size={16} />
            <span>Cards</span>
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'board' ? 'active' : ''}`}
            onClick={() => onViewModeChange('board')}
            title="Kanban Board View"
            id="view-board-btn"
          >
            <Kanban size={16} />
            <span>Board</span>
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => onViewModeChange('table')}
            title="Table View"
            id="view-table-btn"
          >
            <Table size={16} />
            <span>Table</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Status Filter, Priority Filter, Sort By & Reset */}
      <div className="controls-filters-row">
        <div className="filter-group">
          <span className="filter-label">Status:</span>
          {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              type="button"
              id={`filter-status-${status.toLowerCase().replace(' ', '-')}`}
              className={`filter-pill ${statusFilter === status ? 'active' : ''}`}
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
              id={`filter-priority-${priority.toLowerCase()}`}
              className={`filter-pill ${priorityFilter === priority ? 'active' : ''}`}
              onClick={() => onPriorityChange(priority)}
            >
              {priority}
            </button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="filter-group" style={{ marginLeft: 'auto' }}>
          <span className="filter-label">Sort:</span>
          <select
            id="task-sort-select"
            className="select-control"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="title">Title (A-Z)</option>
            <option value="createdAt">Date Created</option>
          </select>

          <button
            type="button"
            className="btn-icon btn-sm"
            onClick={onToggleSortOrder}
            title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
            aria-label="Toggle sort order"
          >
            <ArrowUpDown size={15} />
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              className="reset-filters-btn"
              onClick={onResetFilters}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
