import React, { useState, useEffect, useMemo } from 'react';
import { initialTasks } from './data/initialTasks';
import { loadTasks, saveTasks, loadTheme, saveTheme } from './utils/storage';
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
  const [theme, setTheme] = useState(loadTheme);
  const [tasks, setTasks] = useState(() => loadTasks(initialTasks));

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [viewMode, setViewMode] = useState('grid');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Apply theme class
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  // Persist tasks to localStorage
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t))
      );
      showToast('Task updated successfully', 'success');
    } else {
      setTasks((prev) => [taskData, ...prev]);
      showToast('Task created successfully', 'success');
    }
    setEditingTask(null);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleDeleteTask = () => {
    if (deletingTaskId) {
      setTasks((prev) => prev.filter((t) => t.id !== deletingTaskId));
      showToast('Task deleted', 'danger');
      setDeletingTaskId(null);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all tasks to initial mock data?')) {
      setTasks(initialTasks);
      setSearch('');
      setStatusFilter('All');
      setPriorityFilter('All');
      showToast('Reset to default tasks', 'info');
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const query = search.toLowerCase().trim();
        const matchesSearch =
          !query ||
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query);

        const matchesStatus =
          statusFilter === 'All' || task.status === statusFilter;

        const matchesPriority =
          priorityFilter === 'All' || task.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        if (sortBy === 'dueDate') {
          return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
        }
        if (sortBy === 'priority') {
          const rank = { High: 3, Medium: 2, Low: 1 };
          return (rank[b.priority] || 0) - (rank[a.priority] || 0);
        }
        if (sortBy === 'status') {
          return a.status.localeCompare(b.status);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [tasks, search, statusFilter, priorityFilter, sortBy]);

  const hasActiveFilters = search.trim() !== '' || statusFilter !== 'All' || priorityFilter !== 'All';
  const taskToDelete = tasks.find((t) => t.id === deletingTaskId);

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAddModal={() => {
          setEditingTask(null);
          setIsModalOpen(true);
        }}
        onResetData={handleResetData}
      />

      <main className="main-content">
        <StatsOverview tasks={tasks} />

        <FilterBar
          searchQuery={search}
          onSearchChange={setSearch}
          onClearSearch={() => setSearch('')}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onResetFilters={() => {
            setSearch('');
            setStatusFilter('All');
            setPriorityFilter('All');
          }}
          hasActiveFilters={hasActiveFilters}
        />

        {filteredTasks.length === 0 ? (
          <EmptyState
            searchQuery={search}
            onResetFilters={() => {
              setSearch('');
              setStatusFilter('All');
              setPriorityFilter('All');
            }}
            onOpenAddModal={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
          />
        ) : viewMode === 'board' ? (
          <TaskBoard
            tasks={filteredTasks}
            onEdit={(task) => {
              setEditingTask(task);
              setIsModalOpen(true);
            }}
            onDelete={setDeletingTaskId}
            onStatusChange={handleStatusChange}
          />
        ) : viewMode === 'table' ? (
          <TaskTable
            tasks={filteredTasks}
            onEdit={(task) => {
              setEditingTask(task);
              setIsModalOpen(true);
            }}
            onDelete={setDeletingTaskId}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <TaskGrid
            tasks={filteredTasks}
            onEdit={(task) => {
              setEditingTask(task);
              setIsModalOpen(true);
            }}
            onDelete={setDeletingTaskId}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

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
        onConfirm={handleDeleteTask}
        taskTitle={taskToDelete?.title}
      />

      <ToastNotification
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

      <footer className="footer">
        <p>ReactJS Technical Round 1 Practical Assignment</p>
      </footer>
    </div>
  );
}

export default App;
