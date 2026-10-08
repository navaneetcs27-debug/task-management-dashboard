# ReactJS Task Management Dashboard

Practical assignment implementation for ReactJS Technical Round 1.

## Project Description
A responsive Task Management Dashboard created with ReactJS. It allows users to manage tasks through creation, editing, deletion, search, multi-filter sorting, and status transitions, with persistent local storage and light/dark theme support.

## Technologies Used
- ReactJS (v19)
- JavaScript (ES6+)
- HTML5 / CSS3 (CSS Variables, Flexbox, Grid)
- Vite
- Lucide React (Icons)

## Features
- **Dashboard & Statistics**: Overview metric cards for Total Tasks, Pending, In Progress, and Completed tasks that update dynamically.
- **Add Task**: Modal form to add a task with validation for required fields (Title, Description, Priority, Due Date).
- **Edit Task**: Ability to edit existing task details via pre-filled form modal.
- **Delete Task**: Task deletion with confirmation prompt.
- **Status Updates**: Direct status changer (`Pending` -> `In Progress` -> `Completed`).
- **Search**: Live real-time search across task title and description.
- **Filtering**: Independent and combined filtering by Status (`All`, `Pending`, `In Progress`, `Completed`) and Priority (`All`, `Low`, `Medium`, `High`).
- **Sorting**: Sort by Due Date, Priority, Status, and Title.
- **Multiple Views**: Switch between Cards Grid view, Kanban Board view, and Table view.
- **Theme Toggle**: Light and Dark mode support.
- **Local Storage**: Data persistence across page refreshes.

## Installation & Running Locally

1. Clone the repository:
```bash
git clone https://github.com/navaneetcs27-debug/task-management-dashboard.git
cd task-management-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Live Demo
Live application: https://navaneetcs27-debug.github.io/task-management-dashboard/

## Technical Approach & Architecture

- **State Management**: Application state is held in `App.jsx` as the single source of truth for the task list, active filters, search query, and modal states. Derived state (`filteredTasks`) is memoized with `useMemo` for optimal performance.
- **Component Breakdown**:
  - `Header`: Navigation, theme toggle, add task trigger, and reset action.
  - `StatsOverview`: Task count calculation and summary cards.
  - `FilterBar`: Search input, status & priority filter pills, sorting options, and view toggle.
  - `TaskCard`, `TaskBoard`, `TaskTable`: View renderers for different presentation modes.
  - `TaskModal`: Reusable modal for both creating and editing tasks with input validation.
  - `DeleteModal`: Confirmation dialog before task deletion.
- **Form Validation**: Form inputs are validated on submission with field-specific error messages.
- **Scalability**: For large datasets, server-side pagination, debounced search (`useDeferredValue`), and virtualized lists (e.g. `react-window`) can be integrated.

## Candidate Details
- **GitHub**: https://github.com/navaneetcs27-debug/task-management-dashboard
- **Live Deployment**: https://navaneetcs27-debug.github.io/task-management-dashboard/
