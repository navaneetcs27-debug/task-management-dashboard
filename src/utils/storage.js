const TASKS_KEY = 'tasks_data';
const THEME_KEY = 'theme_preference';

export const loadTasks = (defaultTasks) => {
  try {
    const saved = localStorage.getItem(TASKS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not load tasks from localStorage', err);
  }
  return defaultTasks;
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.warn('Could not save tasks to localStorage', err);
  }
};

export const loadTheme = () => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {}
  return 'light';
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
};
