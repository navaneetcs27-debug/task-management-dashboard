import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_TASKS } from './data/initialTasks';
import { 
  loadTasksFromStorage, 
  saveTasksToStorage, 
  getSavedTheme, 
  saveTheme 
} from './utils/storage';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { FilterBar } from './components/FilterBar';
import { TaskGrid } from './components/TaskGrid';
import { TaskBoard } from './components/TaskBoard';
import { TaskTable } from './components/TaskTable';
import { TaskModal } from './components/TaskModal';
import { DeleteModal } from './components/DeleteModal';
import { EmptyState } from './components/EmptyState';
import { ToastNotification } from './components/ToastNotification';

export function App() {
  // 1. Theme State
  const [theme, setTheme] = useState(getSavedTheme);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 2. Tasks State & LocalStorage
  const [tasks, setTasks] = useState(() => loadTasksFromStorage(INITIAL_TASKS));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // 3. Filter, Search, Sort & View State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'board' | 'table'

  // 4. Modals State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  // 5. Toast Notifications
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Trigger celebration confetti when a task is completed
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10b981', '#6366f1', '#f59e0b']
      });
    } catch {
      // ignore in environments without canvas support
    }
  };

  // ==========================================
  // TASK CRUD OPERATIONS
  // ==========================================

  // Create or Update
  const handleSaveTask = (taskData) => {
    try {
      if (editingTask) {
        // Update existing task
        setTasks((prev) =>
          prev.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t))
        );
        showToast(`Task "${taskData.title}" updated successfully!`, 'success');
      } else {
        // Add new task
        setTasks((prev) => [taskData, ...prev]);
        showToast(`Task "${taskData.title}" created successfully!`, 'success');
      }
      setEditingTask(null);
    } catch (err) {
      setError('Failed to save task.');
      showToast('Error saving task', 'danger');
    }
  };

  // Status Change (Requirement #3E)
  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          if (newStatus === 'Completed' && task.status !== 'Completed') {
            triggerConfetti();
          }
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
    showToast(`Status updated to "${newStatus}"`, 'info');
  };

  // Delete Task Flow (Requirement #3D)
  const handleConfirmDelete = () => {
    if (deletingTaskId) {
      const taskToDelete = tasks.find((t) => t.id === deletingTaskId);
      setTasks((prev) => prev.filter((t) => t.id !== deletingTaskId));
      showToast(`Task "${taskToDelete?.title || ''}" deleted.`, 'danger');
      setDeletingTaskId(null);
    }
  };

  // Reset to default mock data
  const handleResetData = () => {
    if (window.confirm('Reset all tasks to sample initial dataset?')) {
      setTasks(INITIAL_TASKS);
      setSearchQuery('');
      setStatusFilter('All');
      setPriorityFilter('All');
      showToast('Dashboard reset to sample tasks!', 'info');
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Reset all active filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  const hasActiveFilters = searchQuery.trim() !== '' || statusFilter !== 'All' || priorityFilter !== 'All';

  // ==========================================
  // FILTERING & SEARCHING & SORTING LOGIC
  // ==========================================
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search across title and description
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query);

        // Filter by Status
        const matchesStatus =
          statusFilter === 'All' || task.status === statusFilter;

        // Filter by Priority
        const matchesPriority =
          priorityFilter === 'All' || task.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        let comparison = 0;

        if (sortBy === 'dueDate') {
          const dateA = new Date(a.dueDate || 0).getTime();
          const dateB = new Date(b.dueDate || 0).getTime();
          comparison = dateA - dateB;
        } else if (sortBy === 'priority') {
          const weight = { High: 3, Medium: 2, Low: 1 };
          comparison = (weight[b.priority] || 0) - (weight[a.priority] || 0);
        } else if (sortBy === 'status') {
          const weight = { Pending: 1, 'In Progress': 2, Completed: 3 };
          comparison = (weight[a.status] || 0) - (weight[b.status] || 0);
        } else if (sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === 'createdAt') {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          comparison = dateA - dateB;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortBy, sortOrder]);

  const taskPendingDelete = tasks.find((t) => t.id === deletingTaskId);

  return (
    <div className="app-container">
      {/* 1. Header with branding, dark mode, add task button */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAddModal={handleOpenCreate}
        onResetData={handleResetData}
      />

      <main className="main-content">
        {/* 2. Dashboard Statistics (Requirement #6) */}
        <StatsOverview tasks={tasks} />

        {/* 3. Search & Multi-Filter Controls (Requirements #4, #5, #10) */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery('')}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortOrder={sortOrder}
          onToggleSortOrder={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          resultCount={filteredTasks.length}
        />

        {/* 4. Task Display Area */}
        {isLoading ? (
          <EmptyState type="loading" />
        ) : error ? (
          <EmptyState type="error" onRetry={() => setError(null)} />
        ) : filteredTasks.length === 0 ? (
          <EmptyState
            type={tasks.length === 0 ? 'no-tasks' : 'no-results'}
            searchQuery={searchQuery}
            onResetFilters={handleResetFilters}
            onOpenAddModal={handleOpenCreate}
          />
        ) : viewMode === 'board' ? (
          <TaskBoard
            tasks={filteredTasks}
            onEdit={handleOpenEdit}
            onDelete={setDeletingTaskId}
            onStatusChange={handleStatusChange}
            onQuickCycleStatus={handleStatusChange}
          />
        ) : viewMode === 'table' ? (
          <TaskTable
            tasks={filteredTasks}
            onEdit={handleOpenEdit}
            onDelete={setDeletingTaskId}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <TaskGrid
            tasks={filteredTasks}
            onEdit={handleOpenEdit}
            onDelete={setDeletingTaskId}
            onStatusChange={handleStatusChange}
            onQuickCycleStatus={handleStatusChange}
          />
        )}
      </main>

      {/* 5. Modals */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        initialData={editingTask}
      />

      <DeleteModal
        isOpen={Boolean(deletingTaskId)}
        onClose={() => setDeletingTaskId(null)}
        onConfirm={handleConfirmDelete}
        taskTitle={taskPendingDelete?.title}
      />

      {/* 6. Notifications */}
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />

      {/* 7. Footer */}
      <footer className="app-footer">
        <p>ReactJS Technical Round 1 — Task Management Dashboard • Built with React 19 & Vite</p>
      </footer>
    </div>
  );
}

export default App;
